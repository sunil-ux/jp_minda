import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { LeadListComponent } from '../lead/lead-list/lead-list.component';
import { AddLeadComponent } from '../lead/add-lead/add-lead.component';
import { LeadDetailComponent } from '../lead/lead-detail/lead-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes : Routes=[
  { path: "", component: LeadListComponent, canActivate:[AuthguardGuard] },
  { path: "add-lead", component: AddLeadComponent, canActivate:[AuthguardGuard] },
  { path: "lead-detail/:id", component: LeadDetailComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    LeadListComponent,
    AddLeadComponent,
    LeadDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)

  ]
})
export class LeadmastermoduleModule { }
