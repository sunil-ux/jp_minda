import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { CheckInComponent } from '../check-in/check-in.component';
import { AuthguardGuard } from '../authguard.guard';

const routes : Routes=[
    { path: "", component: CheckInComponent, canActivate:[AuthguardGuard] },

]

@NgModule({
  declarations: [CheckInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CheckinModuleModule { }
