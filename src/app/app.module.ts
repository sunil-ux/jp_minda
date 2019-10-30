import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxEditorModule } from 'ngx-editor';
import { MasterTabComponent } from './master-tab/master-tab/master-tab.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { CategoryaddComponent } from './category/categoryadd/categoryadd.component';
import * as FusionCharts from "fusioncharts";
import { FusionChartsModule } from "angular-fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { routing } from './app-routing.module';
import { AddAssignProductComponent } from './lead/add-assign-product/add-assign-product.component';
import { ViewReceiveOrderComponent } from './purchase/view-receive-order/view-receive-order.component';
// import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
// import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
// import { SharedModuleModule } from './shared-module/shared-module.module';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

// import { Routes, RouterModule } from '@angular/router';

// import { routerTransition } from './router-animation/router-animation.component';``
// // import { AppRoutingModule } from './app-routing.module';

// import { AddProductComponent } from './product/add-product/add-product.component';
// import { MasterTabListComponent } from './master-tab-list/master-tab-list/master-tab-list.component';
// import { ProductListComponent } from './product/product-list/product-list.component';
// import { UserAddComponent } from './user/user-add/user-add.component';
// import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
// import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
// import { SystemUserListComponent } from './user/system-user-list/system-user-list.component';
// import { SystemUserDetailComponent } from './user/system-user-detail/system-user-detail.component';
// import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
// import { DiscountListComponent } from './discount/discount-list/discount-list.component';
// import { TerritoryAddComponent } from './territory/territory-add/territory-add.component';
// import { AuthguardGuard } from './authguard.guard';
// import { AuthguardlogGuard } from './authguardlog.guard';
// import { AddCategoryComponent } from './category/add-category/add-category.component';
// import { CategoryListComponent } from './category/category-list/category-list.component';
// import { AddGiftComponent } from './pop_and_gift/add-gift/add-gift.component';
// import { GiftListComponent } from './pop_and_gift/gift-list/gift-list.component';
// import { AddHolidayComponent } from './leave-and-holiday/add-holiday/add-holiday.component';
// import { HolidayListComponent } from './leave-and-holiday/holiday-list/holiday-list.component';
// import { AddLeaveRulesComponent } from './leave-and-holiday/add-leave-rules/add-leave-rules.component';
// import { LeaveRuleListComponent } from './leave-and-holiday/leave-rule-list/leave-rule-list.component';
// import { ProductDetailComponent } from './product/product-detail/product-detail.component';
// import { TerritoryListComponent } from './territory/territory-list/territory-list.component';
// import { TerritoryDetailComponent } from './territory/territory-detail/territory-detail.component';
// import { AddDistributionComponent } from './distribution/add-distribution/add-distribution.component';
// import { DistributionDetailComponent } from './distribution/distribution-detail/distribution-detail.component';
// import { DistributionListComponent } from './distribution/distribution-list/distribution-list.component';
// import { DistributionOrderListComponent } from './distribution/distribution-order-list/distribution-order-list.component';
// import { AddLeadComponent } from './lead/add-lead/add-lead.component';
// import { LeadDetailComponent } from './lead/lead-detail/lead-detail.component';
// import { LeadListComponent } from './lead/lead-list/lead-list.component';
// import { AddOrderComponent } from './order/add-order/add-order.component';
// import { OrderDetailComponent } from './order/order-detail/order-detail.component';
// import { OrderListComponent } from './order/order-list/order-list.component';
// import { PaymentListComponent } from './payment/payment-list/payment-list.component';
// import { FollowupListComponent } from './Followup/followup-list/followup-list.component';

// import { AddRoleComponent } from './role/add-role/add-role.component';
// import { RoleListComponent } from './role/role-list/role-list.component';
// import { CheckInComponent } from './check-in/check-in.component';
// import { AttendanceComponent } from './attendance/attendance.component';
// import { AddPaymentComponent } from './payment/add-payment/add-payment.component';
// import { AddFollowupComponent } from './Followup/add-followup/add-followup.component';

// import { ExpenseListComponent } from './expense-list/expense-list.component';
// import { LeaveListComponent } from './leave-list/leave-list.component';
// import { EnquiryComponent } from './enquiry/enquiry.component';
// import {MyFilterPipe} from './pipes/my-filter.pipe';



// Import FusionCharts library and chart modules


// Pass the fusioncharts library and chart modules


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

// const routes: Routes = [
//   { path: "", component: LoginComponent, canActivate:[AuthguardlogGuard] },
//   { path: "add-product/:id", component: AddProductComponent, canActivate:[AuthguardGuard] },
//   { path: "add-product", component: AddProductComponent, canActivate:[AuthguardGuard] },
//   { path: "product-list", component: ProductListComponent, canActivate:[AuthguardGuard] },
//   { path: "user-add", component: UserAddComponent, canActivate:[AuthguardGuard] },
//   { path: "sale-user-list", component: SaleUserListComponent, canActivate:[AuthguardGuard] },
//   { path: "sale-user-detail/:id", component: SaleUserDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "system-user-list", component: SystemUserListComponent, canActivate:[AuthguardGuard] },
//   { path: "system-user-detail/:id", component: SystemUserDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "add-discount", component: AddDiscountComponent, canActivate:[AuthguardGuard] },
//   { path: "discount-list", component: DiscountListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-category", component: AddCategoryComponent, canActivate:[AuthguardGuard] },
//   { path: "category-list", component: CategoryListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-gift/:id", component: AddGiftComponent, canActivate:[AuthguardGuard] },
//   { path: "add-gift", component: AddGiftComponent, canActivate:[AuthguardGuard] },
//   { path: "gift-list", component: GiftListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-holiday", component: AddHolidayComponent, canActivate:[AuthguardGuard] },
//   { path: "holiday-list", component: HolidayListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-leave-rules", component: AddLeaveRulesComponent, canActivate:[AuthguardGuard] },
//   { path: "leave-rule-list", component: LeaveRuleListComponent, canActivate:[AuthguardGuard] },
//   { path: "product-detail/:id", component: ProductDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "territory-add", component: TerritoryAddComponent, canActivate:[AuthguardGuard] },
//   { path: "territory-list", component: TerritoryListComponent, canActivate:[AuthguardGuard] },
//   { path: "territory-detail/:id", component: TerritoryDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "add-distribution", component: AddDistributionComponent, canActivate:[AuthguardGuard] },
//   { path: "distribution-detail/:id/:type", component: DistributionDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "distribution-list/:type", component: DistributionListComponent, canActivate:[AuthguardGuard] },
//   { path: "distribution-list", component: DistributionListComponent, canActivate:[AuthguardGuard] },
//   { path: "distribution-order-list/:id", component: DistributionOrderListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-lead", component: AddLeadComponent, canActivate:[AuthguardGuard] },
//   { path: "lead-detail/:id", component: LeadDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "lead-list", component: LeadListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-order", component: AddOrderComponent, canActivate:[AuthguardGuard] },
//   { path: "order-detail/:id", component: OrderDetailComponent, canActivate:[AuthguardGuard] },
//   { path: "order-list/:order_type", component: OrderListComponent, canActivate:[AuthguardGuard] },
//   { path: "payment-list/:type", component: PaymentListComponent, canActivate:[AuthguardGuard] },
  

//   { path: "add-role", component: AddRoleComponent, canActivate:[AuthguardGuard] },
//   { path: "role-list", component: RoleListComponent, canActivate:[AuthguardGuard] },
//   { path: "check-in-list", component: CheckInComponent, canActivate:[AuthguardGuard] },
//   { path: "attendance", component: AttendanceComponent, canActivate:[AuthguardGuard] },
//   { path: "add-payment", component: AddPaymentComponent, canActivate:[AuthguardGuard] },
//   { path: "followup-list/:type", component: FollowupListComponent, canActivate:[AuthguardGuard] },
//   { path: "add-followup", component: AddFollowupComponent, canActivate:[AuthguardGuard] },
  
  
//   { path: "expenses", component: ExpenseListComponent, canActivate:[AuthguardGuard] },
//   { path: "leaves", component: LeaveListComponent, canActivate:[AuthguardGuard] },
//   { path: "dashboard", component: DashboardComponent, canActivate:[AuthguardGuard] },
//   { path: "enquiry", component:EnquiryComponent, canActivate:[AuthguardGuard]},
  
  
  
// ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    MasterTabComponent,
    // AddProductComponent,
    // MasterTabListComponent,
    // ProductListComponent,
    // UserAddComponent,
    // SaleUserListComponent,
    // SaleUserDetailComponent,
    // SystemUserListComponent,
    // SystemUserDetailComponent,
    // AddDiscountComponent,
    // DiscountListComponent,
    // TerritoryAddComponent,
    // AddCategoryComponent,
    // CategoryListComponent,
    // AddGiftComponent,
    // GiftListComponent,
    // AddHolidayComponent,
    // HolidayListComponent,
    // AddLeaveRulesComponent,
    // LeaveRuleListComponent,
    // ProductDetailComponent,
    DialogBodyComponent,
    // TerritoryListComponent,
    // TerritoryDetailComponent,
    // AddDistributionComponent,
    // DistributionDetailComponent,
    // DistributionListComponent,
    // DistributionOrderListComponent,
    // AddLeadComponent,
    // LeadDetailComponent,
    // LeadListComponent,
    // AddOrderComponent,
    // OrderDetailComponent,
    // OrderListComponent,
    DashboardComponent,
    AddAssignProductComponent,
    ViewReceiveOrderComponent,
    // UpdateVendorComponent,
    // ExpenseDetailComponent,
    // PaymentListComponent,
    // FollowupListComponent,
    // AddRoleComponent,
    // RoleListComponent,
    // CheckInComponent,
    // AttendanceComponent,
    // AddFollowupComponent,
    // AddPaymentComponent,
    // ExpenseListComponent,
    // LeaveListComponent,
    // EnquiryComponent,
    // MyFilterPipe,
    // CategoryaddComponent
    
  ],
  imports: [
    BrowserModule,
    routing,
    // SharedModuleModule,
    // AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    NgxEditorModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FusionChartsModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [MatSnackBar,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    DialogBodyComponent,
    AddAssignProductComponent,
    ViewReceiveOrderComponent
    // CategoryaddComponent
  ]
})
export class AppModule { }
