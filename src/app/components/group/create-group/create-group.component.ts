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
  selector: 'app-create-group',
  standalone: true,
  imports: [SidebarComponent, MatInputModule, MatCardModule, MatNativeDateModule,
    MatDatepickerModule, MatFormFieldModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _groupService: GroupService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  createGroup(){
    const group_name = this.form.get('name')?.value;
    const group_category = this.form.get('category')?.value;
    const id_logged_user = {"id":1};
    this.form.value['creador'] = id_logged_user;
    console.log(this.form.value);

    const groupPayload = {
      name: group_name,
      creator: id_logged_user,
      category: JSON.parse(group_category),
    };

    this._groupService.create(groupPayload).subscribe(
      (res) => {
        this.openSnackBar('Gasto creado con exito');
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error);
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
