import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaveListComponent } from '../leave-list/leave-list.component';
import { AuthguardGuard } from '../authguard.guard';
// import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

const routes : Routes=[
    { path: "", component: LeaveListComponent, canActivate:[AuthguardGuard] },

]


@NgModule({
  declarations: [
    LeaveListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class LeaveModuleModule { }
