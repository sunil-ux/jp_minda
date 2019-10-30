import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ExpenseDetailComponent } from '../expense-detail/expense-detail.component';

const routes : Routes=[
  { path: "", component: ExpenseListComponent, canActivate:[AuthguardGuard] },
  { path: "expense-detail/:id", component: ExpenseDetailComponent, canActivate:[AuthguardGuard] },
]

@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpenseDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule

  ]
})
export class ExpenseModuleModule { }
