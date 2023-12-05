import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './layout/pages/not-found/not-found.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './dashboard/home/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    ],
  },
  { path: '**', component: NotFoundComponent },
];
