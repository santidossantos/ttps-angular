import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/layout/pages/not-found/not-found.component';
import { HomeComponent } from './components/dashboard/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { CreateExpenseComponent } from './components/expense/create-expense/create-expense.component';
import { DetailExpenseComponent } from './components/expense/detail-expense/detail-expense.component';
import { AddDebtorUsersComponent } from './components/expense/add-debtor-users/add-debtor-users.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { MyGroupsComponent } from './components/group/my-groups/my-groups.component';
import { DetailGroupComponent } from './components/group/detail-group/detail-group.component';
import { EditGroupComponent } from './components/group/edit-group/edit-group.component';
import { ListExpensesComponent } from './components/expense/list-expenses/list-expenses.component';
import { EditExpenseComponent } from './components/expense/edit-expense/edit-expense.component';
import { ViewInfoFriendsComponent } from './components/user/view-info-friends/view-info-friends.component';
import { ProfileComponent } from './components/profile/profile.component';

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
        path: 'groups/new',
        title: 'Crear grupo',
        component: CreateGroupComponent,
      },
      {
        path: ':id/expense',
        title: 'Gasto',
        component: CreateExpenseComponent,
      },
      {
        path: 'me/groups',
        title: 'Mis Grupos',
        component: MyGroupsComponent,
      },
      {
        path: 'expense/:id',
        title: 'Detalle Gasto',
        component: DetailExpenseComponent,
      },
      {
        path: 'expense/:id/debtor-user',
        title: 'Añadir deudor',
        component: AddDebtorUsersComponent,
      },
      {
        path: 'groups/:group_id',
        title: 'Grupo',
        component: DetailGroupComponent,
      },
      {
        path: 'groups/edit/:group_id',
        title: 'Editar Grupo',
        component: EditGroupComponent,
      },
      {
        path: 'expense',
        title: 'Mis Gastos',
        component: ListExpensesComponent,
      },
      {
        path: 'expense/:id/editar',
        title: 'Editar Gasto',
        component: EditExpenseComponent,
      },
      {
        path: 'me/friends',
        title: 'Amigos',
        component: ViewInfoFriendsComponent
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
