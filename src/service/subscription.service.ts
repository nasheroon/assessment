import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../model/subscription';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubscriptionService {

  invoiceData: Observable<Invoice>;
  private subscriptionUrl: string;

  constructor(private http: HttpClient) {
    this.subscriptionUrl = 'http://localhost:8080/api/subscription/';
  }

  public save(subscription: Subscription): Observable<Invoice> {
    this.invoiceData = this.http.post<Invoice>(this.subscriptionUrl, subscription);
    return this.invoiceData;
  }

  public get(){
    return this.invoiceData;
  }
}
