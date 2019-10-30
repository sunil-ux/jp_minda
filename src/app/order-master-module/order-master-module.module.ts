import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { OrderListComponent } from '../order/order-list/order-list.component';
import { OrderDetailComponent } from '../order/order-detail/order-detail.component';
import { PaymentListComponent } from '../payment/payment-list/payment-list.component';
import { AddPaymentComponent } from '../payment/add-payment/add-payment.component';

const routes : Routes=[
  { path: "order-list/:order_type", component: OrderListComponent, canActivate:[AuthguardGuard] },
  { path: "order-detail/:id", component: OrderDetailComponent, canActivate:[AuthguardGuard] },
  { path: "payment-list/:type", component: PaymentListComponent, canActivate:[AuthguardGuard] },
  { path: "add-payment", component: AddPaymentComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    PaymentListComponent,
    AddPaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class OrderMasterModuleModule { }
