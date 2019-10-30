import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AuthguardGuard } from '../authguard.guard';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { NgxEditorModule } from 'ngx-editor';

const routes : Routes=[
  
  { path: "", component: ProductListComponent, canActivate:[AuthguardGuard] },
  // { path: "add-product", component: AddProductComponent, canActivate:[AuthguardGuard] },
  { path: "add-product/:id", component: AddProductComponent, canActivate:[AuthguardGuard] },
  { path: "product-detail/:id", component: ProductDetailComponent, canActivate:[AuthguardGuard] },
  
  // { path: "", component: AttendanceComponent, canActivate:[AuthguardGuard] },
]


@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    MaterialModule
  ]
})
export class ProductModuleModule { }
