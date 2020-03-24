import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../service/subscription.service';
import { Invoice } from 'src/model/invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice: Observable<Invoice>;

  constructor(private route: ActivatedRoute, subscriptionService: SubscriptionService) { 
    this.invoice = subscriptionService.get();
  }

  ngOnInit() {
    
  }

}
