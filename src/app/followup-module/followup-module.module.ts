import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FollowupListComponent } from '../Followup/followup-list/followup-list.component';
import { AddFollowupComponent } from '../Followup/add-followup/add-followup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

const routes : Routes=[
   { path: "followup-list/:type", component: FollowupListComponent, canActivate:[AuthguardGuard] },
  { path: "add-followup", component: AddFollowupComponent, canActivate:[AuthguardGuard] },
  
]
@NgModule({
  declarations: [
    FollowupListComponent,
AddFollowupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
    // FormsModule,

  ]
})
export class FollowupModuleModule { }
