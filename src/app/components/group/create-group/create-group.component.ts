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
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import IconGroup from '../icons-group';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [
    SidebarComponent,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css',
})
export class CreateGroupComponent implements OnInit {
  form: FormGroup;
  user_id: number = -1;
  icons = IconGroup.icons;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _groupService: GroupService,
    private _userService: UserService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const tokenData = jwtDecode(token);
      const username = tokenData.sub as string;
      this._userService.getByUserName(username).subscribe(
        (res) => {
          this.user_id = res.id;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  createGroup() {
    const group_name = this.form.get('name')?.value;
    const group_category = this.form.get('category')?.value;
    const icon = this.form.get('img')?.value;
    const id_logged_user = { id: this.user_id };
    this.form.value['creador'] = id_logged_user;

    const groupPayload = {
      name: group_name,
      creator: id_logged_user,
      category: JSON.parse(group_category),
      img: icon,
    };

    console.log(groupPayload)

    this._groupService.create(groupPayload).subscribe(
      (res) => {
        this.openSnackBar('Grupo creado con exito');
        this.form.get('name')?.setValue('');
        this.form.get('category')?.setValue('');
        this.router.navigate(['dashboard/me/groups']);
      },
      (error) => {
        console.error(error);
        if (error.error.message) {
          this.openSnackBar(error.error.message);
        } else {
          this.openSnackBar('Error inesperado al crear el grupo');
        }
      }
    );
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
