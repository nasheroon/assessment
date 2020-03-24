import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SubscriptionService } from '../../service/subscription.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from '../../model/invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {

  subscriptionForm;
  invoice: Invoice;
  invoiceData: Observable<Invoice>;

  constructor( 
    private router:Router, 
    private subscriptionService: SubscriptionService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter) {
    this.subscriptionForm = this.formBuilder.group({
      amount: '',
      type: 'DAILY',
      day: '',
      fromDate: '',
      toDate: '',
    });

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onSubmit(subscriptionForm) {
    subscriptionForm.fromDate = this.addZero(this.fromDate.day) + '/' + this.addZero(this.fromDate.month) + '/' + this.fromDate.year;
    subscriptionForm.toDate = this.addZero(this.toDate.day) + '/' + this.addZero(this.toDate.month) + '/' + this.toDate.year;
    
    this.invoiceData = this.subscriptionService.save(subscriptionForm);
    this.router.navigate(['/invoice']);
    
  }

  addZero(num: Number) : string {
    if(num < 10) {
      return "0" + num;
    }
    return "" + num;
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
