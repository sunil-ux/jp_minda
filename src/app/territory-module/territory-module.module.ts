import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { AttendanceComponent } from '../attendance/attendance.component';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { TerritoryAddComponent } from '../territory/territory-add/territory-add.component';
import { TerritoryListComponent } from '../territory/territory-list/territory-list.component';
import { MyFilterPipe } from '../pipes/my-filter.pipe';
import { TerritoryDetailComponent } from '../territory/territory-detail/territory-detail.component';

const routes : Routes=[
  { path: "", component: TerritoryListComponent, canActivate:[AuthguardGuard] },
  { path: "territory-add", component: TerritoryAddComponent, canActivate:[AuthguardGuard] },
  { path: "territory-detail/:id", component: TerritoryDetailComponent, canActivate:[AuthguardGuard] },

]

@NgModule({
  declarations: [
    TerritoryAddComponent,
    TerritoryListComponent,
    TerritoryDetailComponent,
    MyFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class TerritoryModuleModule { }
