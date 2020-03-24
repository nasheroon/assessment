import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {path: '', redirectTo:"/subscription", pathMatch:'full'},
  {path: 'invoice', component:InvoiceComponent},
  {path: 'subscription', component: SubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
