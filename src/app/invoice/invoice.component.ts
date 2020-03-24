import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../service/subscription.service';
import { Invoice } from 'src/model/invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  show = true;
  invoice: Invoice;
  invoiceData: Observable<Invoice>;

  constructor(private subscriptionService: SubscriptionService) { 
    this.invoiceData = this.subscriptionService.get();
  }

  ngOnInit() {
    this.invoiceData.subscribe(invoice => this.invoice = invoice);
  }

}
