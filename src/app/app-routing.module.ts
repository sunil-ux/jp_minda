// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AddProductComponent } from './product/add-product/add-product.component';
// import { ProductListComponent } from './product/product-list/product-list.component';
// import { UserAddComponent } from './user/user-add/user-add.component';
// import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
// import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
// import { SystemUserListComponent } from './user/system-user-list/system-user-list.component';
// import { SystemUserDetailComponent } from './user/system-user-detail/system-user-detail.component';

// import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
// import { DiscountListComponent } from './discount/discount-list/discount-list.component';
// import { TerritoryAddComponent } from './territory/territory-add/territory-add.component';
import { LoginComponent } from './login/login.component';
import { AuthguardlogGuard } from './authguardlog.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';


const routes: Routes = [
  { path: "", component: LoginComponent,canActivate:[AuthguardlogGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate:[AuthguardGuard] },
  { path: 'lead-master-module', loadChildren: './leadmastermodule/leadmastermodule.module#LeadmastermoduleModule'},
  { path: 'distribution-module', loadChildren: './distribution-module/distribution-module.module#DistributionModuleModule' },
  { path: 'followUp-module', loadChildren: './followup-module/followup-module.module#FollowupModuleModule' },
  { path: 'expense-master-module', loadChildren: './expense-module/expense-module.module#ExpenseModuleModule' },
  { path: 'leave-application', loadChildren: './leave-module/leave-module.module#LeaveModuleModule' },
  { path: 'checkinMaster', loadChildren: './checkin-module/checkin-module.module#CheckinModuleModule' },
  { path: 'attendance-master', loadChildren: './attendance-module/attendance-module.module#AttendanceModuleModule' },
  { path: 'product-master', loadChildren: './product-module/product-module.module#ProductModuleModule' },
  { path: 'user-master', loadChildren: './user-module/user-module.module#UserModuleModule' },
  { path: 'territory-master', loadChildren: './territory-module/territory-module.module#TerritoryModuleModule' },
  { path: 'pop-gift-master', loadChildren: './popgift-module/popgift-module.module#PopgiftModuleModule' },
  { path: 'leave-holiday-master', loadChildren: './leave-holiday-module/leave-holiday-module.module#LeaveHolidayModuleModule' },
  { path: 'order-master-module', loadChildren: './order-master-module/order-master-module.module#OrderMasterModuleModule' },
  { path: 'vendor-master', loadChildren: './vendor-master/vendor-master.module#VendorMasterModule' },
  { path: 'purchase-order-master', loadChildren: './purchase-order-master/purchase-order-master.module#PurchaseOrderMasterModule' },
  // { path: 'role-master', loadChildren: './lead-module/lead-module.module#LeadModuleModule' },
  // { path: 'leadmodule', loadChildren: './lead-module/lead-module.module#LeadModuleModule' },
  // { path: 'leadmodule', loadChildren: './lead-module/lead-module.module#LeadModuleModule' },
  // { path: 'leadmodule', loadChildren: './lead-module/lead-module.module#LeadModuleModule' },

  // { path: "add-product", component: AddProductComponent, },
  // { path: "product-list", component: ProductListComponent, },
  // { path: "user-add", component: UserAddComponent, },
  // { path: "sale-user-list", component: SaleUserListComponent, },
  // { path: "sale-user-detail", component: SaleUserDetailComponent, },
  // { path: "system-user-list", component: SystemUserListComponent, },
  // { path: "system-user-detail", component: SystemUserDetailComponent, },
  // { path: "add-discount", component: AddDiscountComponent, },
  // { path: "discount-list", component: DiscountListComponent, },
  // { path: "territory-add", component: TerritoryAddComponent, },
];

export const routing:ModuleWithProviders=RouterModule.forRoot(routes)

