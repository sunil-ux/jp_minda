import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AuthguardGuard } from '../authguard.guard';
import { UserAddComponent } from '../user/user-add/user-add.component';
import { SaleUserListComponent } from '../user/sale-user-list/sale-user-list.component';
import { SaleUserDetailComponent } from '../user/sale-user-detail/sale-user-detail.component';
import { SystemUserListComponent } from '../user/system-user-list/system-user-list.component';
import { SystemUserDetailComponent } from '../user/system-user-detail/system-user-detail.component';
import { AddRoleComponent } from '../role/add-role/add-role.component';
import { RoleListComponent } from '../role/role-list/role-list.component';

const routes : Routes=[
  
  { path: "", component: SaleUserListComponent, canActivate:[AuthguardGuard] },
  { path: "user-add", component: UserAddComponent, canActivate:[AuthguardGuard] },
  { path: "add-role", component: AddRoleComponent, canActivate:[AuthguardGuard] },
  { path: "role-list", component: RoleListComponent, canActivate:[AuthguardGuard] },
  { path: "sale-user-detail/:id", component: SaleUserDetailComponent, canActivate:[AuthguardGuard] },
  { path: "system-user-list", component: SystemUserListComponent, canActivate:[AuthguardGuard] },
  { path: "system-user-detail/:id", component: SystemUserDetailComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    SaleUserListComponent,
    UserAddComponent,
    SaleUserDetailComponent,
    SystemUserListComponent,
    SystemUserDetailComponent,
    AddRoleComponent,
    RoleListComponent
    // AttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UserModuleModule { }
