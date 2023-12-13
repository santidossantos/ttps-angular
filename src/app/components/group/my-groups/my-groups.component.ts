import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from '../../dashboard/sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../services/group.service';






@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [SidebarComponent, MatInputModule, MatCardModule, MatNativeDateModule,
    MatDatepickerModule, MatFormFieldModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private _groupService: GroupService
  ) {

  }

  ngOnInit(): void {
  }

 

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
