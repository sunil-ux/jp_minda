import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddDistributionComponent } from '../distribution/add-distribution/add-distribution.component';
import { AuthguardGuard } from '../authguard.guard';
import { DistributionDetailComponent } from '../distribution/distribution-detail/distribution-detail.component';
import { DistributionListComponent } from '../distribution/distribution-list/distribution-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes : Routes=[
  { path: "distribution-list/:type", component: DistributionListComponent, canActivate:[AuthguardGuard] },
  { path: "add-distribution", component: AddDistributionComponent, canActivate:[AuthguardGuard] },
  { path: "distribution-detail/:id/:type", component: DistributionDetailComponent, canActivate:[AuthguardGuard] },
  // { path: "distribution-list", component: DistributionListComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    AddDistributionComponent,
DistributionDetailComponent,
DistributionListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MaterialModule

  ]
})
export class DistributionModuleModule { }
