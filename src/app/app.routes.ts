import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/layout/pages/not-found/not-found.component';
import { HomeComponent } from './components/dashboard/home/home/home.component';
import { CreateExpenseComponent } from './components/expense/create-expense/create-expense.component';
import { DetailExpenseComponent } from './components/expense/detail-expense/detail-expense.component'
import { AddDebtorUsersComponent } from './components/expense/add-debtor-users/add-debtor-users.component'
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { ListExpensesComponent } from './components/expense/list-expenses/list-expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      { 
        path: ':id/expense',
        title: 'Gasto',
        component: CreateExpenseComponent 
      },
      {
        path: 'expense/:id',
        title: 'Detalle Gasto',
        component: DetailExpenseComponent
      },
      {
        path: 'expense/:id/debtor-user',
        title: 'Añadir deudor',
        component: AddDebtorUsersComponent
      },
      {
        path: 'expense',
        title: 'Lista Gastos',
        component: ListExpensesComponent
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
