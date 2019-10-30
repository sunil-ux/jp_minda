import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { VendorListComponent } from '../vendor/vendor-list/vendor-list.component';
import { AddVendorComponent } from '../vendor/add-vendor/add-vendor.component';
import { VendorDetailComponent } from '../vendor/vendor-detail/vendor-detail.component';
import { UpdateVendorComponent } from '../vendor/update-vendor/update-vendor.component';

const routes : Routes=[
  { path: "", component: VendorListComponent, canActivate:[AuthguardGuard] },
  { path: "vendor-add", component: AddVendorComponent, canActivate:[AuthguardGuard] },
  { path: "vendor-detail/:id", component: VendorDetailComponent, canActivate:[AuthguardGuard] },
]
@NgModule({
  declarations: [
    VendorListComponent,
    AddVendorComponent,
    VendorDetailComponent,
    UpdateVendorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents:[
    UpdateVendorComponent
  ]
})
export class VendorMasterModule { }
