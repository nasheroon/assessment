import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from '../model/subscription';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';

@Injectable()
export class SubscriptionService {

  private invoice: Observable<Invoice>;
  private subscriptionUrl: string;

  constructor(private http: HttpClient) {
    this.subscriptionUrl = 'http://localhost:8080/api/subscription/';
  }

  public save(subscription: Subscription){
    this.http.post<Invoice>(this.subscriptionUrl, subscription).subscribe(result => this.invoice);
  }

  public get(){
    return this.invoice;
  }
}
