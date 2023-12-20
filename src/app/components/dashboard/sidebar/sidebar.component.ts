import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateExpenseComponent } from '../../expense/create-expense/create-expense.component';
import { AvatarComponent } from '../../avatar/avatar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    CreateExpenseComponent,
    AvatarComponent,
    MatDialogModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  toogle: boolean = true;

  constructor(private router: Router, public dialog: MatDialog) {}

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe(() => {});
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
