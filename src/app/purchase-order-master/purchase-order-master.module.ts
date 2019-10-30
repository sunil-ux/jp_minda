import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AddPurchaseComponent } from '../purchase/add-purchase/add-purchase.component';
import { PurchaseDetailComponent } from '../purchase/purchase-detail/purchase-detail.component';
import { PurchaseEditComponent } from '../purchase/purchase-edit/purchase-edit.component';
import { PurchaseOrderListComponent } from '../purchase/purchase-order-list/purchase-order-list.component';
import { ReceivedPurchaseOrderDetailComponent } from '../purchase/received-purchase-order-detail/received-purchase-order-detail.component';

const routes : Routes=[
  { path: "", component: PurchaseOrderListComponent, canActivate:[AuthguardGuard] },
  { path: "add-purchase-order/:type", component: AddPurchaseComponent, canActivate:[AuthguardGuard] },
  { path: "purchase-detail/:id", component: PurchaseDetailComponent, canActivate:[AuthguardGuard] },
  { path: "recive-purchase/:id", component: ReceivedPurchaseOrderDetailComponent, canActivate:[AuthguardGuard] },
  { path: "purchase-edit", component: PurchaseEditComponent, canActivate:[AuthguardGuard] },

]

@NgModule({
  declarations: [
    AddPurchaseComponent,
    PurchaseDetailComponent,
    PurchaseEditComponent,
    PurchaseOrderListComponent,
    ReceivedPurchaseOrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class PurchaseOrderMasterModule { }
