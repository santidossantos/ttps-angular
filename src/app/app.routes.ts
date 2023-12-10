import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/layout/pages/not-found/not-found.component';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/dashboard/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { CreateExpenseComponent } from './components/expense/create-expense/create-expense.component';
import { DetailExpenseComponent } from './components/expense/detail-expense/detail-expense.component'


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
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
    ],
  },
  { path: '**', component: NotFoundComponent },
];
