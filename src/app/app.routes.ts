import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/layout/pages/not-found/not-found.component';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/dashboard/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'groups/new',
        title: 'Create Group',
        component: CreateGroupComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
