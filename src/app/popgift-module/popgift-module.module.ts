import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { AttendanceComponent } from '../attendance/attendance.component';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AddGiftComponent } from '../pop_and_gift/add-gift/add-gift.component';
import { GiftListComponent } from '../pop_and_gift/gift-list/gift-list.component';

const routes : Routes=[
  
  { path: "", component: GiftListComponent, canActivate:[AuthguardGuard] },
  { path: "add-gift/:id", component: AddGiftComponent, canActivate:[AuthguardGuard] },
    { path: "add-gift", component: AddGiftComponent, canActivate:[AuthguardGuard] },
  // { path: "", component: AttendanceComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    GiftListComponent,
    AddGiftComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PopgiftModuleModule { }
