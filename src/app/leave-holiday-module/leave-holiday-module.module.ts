import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AddHolidayComponent } from '../leave-and-holiday/add-holiday/add-holiday.component';
import { HolidayListComponent } from '../leave-and-holiday/holiday-list/holiday-list.component';
import { AddLeaveRulesComponent } from '../leave-and-holiday/add-leave-rules/add-leave-rules.component';
import { LeaveRuleListComponent } from '../leave-and-holiday/leave-rule-list/leave-rule-list.component';
import { NgxEditorModule } from 'ngx-editor';

const routes : Routes=[
  { path: "", component: HolidayListComponent, canActivate:[AuthguardGuard] },
  { path: "add-holiday", component: AddHolidayComponent, canActivate:[AuthguardGuard] },
  { path: "add-leave-rules", component: AddLeaveRulesComponent, canActivate:[AuthguardGuard] },
  { path: "leave-rule-list", component: LeaveRuleListComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    HolidayListComponent,
    AddHolidayComponent,
    AddLeaveRulesComponent,
    LeaveRuleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxEditorModule
  ]
})
export class LeaveHolidayModuleModule { }
