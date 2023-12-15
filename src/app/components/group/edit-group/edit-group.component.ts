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
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { MatGridListModule } from '@angular/material/grid-list';
import { Group } from '../../../models/group';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../../models/user';

export interface users {
  name: string;
}

@Component({
  selector: 'app-edit-group',
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
    MatGridListModule,
    RouterModule,
    MatTableModule,
  ],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.css',
})
export class EditGroupComponent implements OnInit {
  form: FormGroup;
  user_id: number = -1;
  group: Group | null = null;
  new_member_name: string = '';
  userFriends: User[] = [];

  displayedColumns: string[] = ['name'];
  dataSource: users[] = [] as users[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _groupService: GroupService,
    private _userService: UserService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [''],
      category: [''],
      new_member_name: [''],
      member: [''],
    });
  }

  ngOnInit() {
    this.initGroup();

    const token: string | null = localStorage.getItem('token');
    if (token) {
      const tokenData = jwtDecode(token);
      const username = tokenData.sub as string;

      this._userService.getByUserName(username).subscribe(
        (res) => {
          this.user_id = res.id;
          this._userService.getFriendsByUserId(this.user_id).subscribe(
            (res) => {
              this.userFriends = res;
            },
            (err) => console.log(err)
          );
        },
        (err) => console.log(err)
      );
    }
  }

  initGroup() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const group_id = params.get('group_id');
          if (group_id) {
            const groupIdAsNumber = +group_id;
            return this._groupService.getById(groupIdAsNumber);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (res: Group | null) => {
          if (res) {
            this.group = res;
            this.group.category = this.group.category || {};
            console.log(this.group);
            this.dataSource =
              this.group.users?.map((user) => {
                return { name: user.name };
              }) || [];
          }
        },
        (err) => console.log(err)
      );
  }

  saveGroup() {
    const group_id = this.route.snapshot.paramMap.get('group_id');
    const group_name = this.form.get('name')?.value;
    const group_category = this.form.get('category')?.value;
    const id_logged_user = { id: this.user_id };
    this.form.value['creador'] = id_logged_user;

    const groupPayload = {
      name: group_name,
      category: JSON.parse(group_category),
    };

    this._groupService.edit(groupPayload, group_id).subscribe(
      (res) => {
        this.openSnackBar('Cambios guardados');
        this.form.get('name')?.setValue('');
        this.form.get('category')?.setValue('');
        this.router.navigate(['dashboard/me/groups']);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(
          'Hubo un error al guardar los cambios, revise los campos'
        );
      }
    );
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addMember() {
    const group_id = this.route.snapshot.paramMap.get('group_id');
    const memberId = this.form.get('member')?.value.id;

    this._groupService.addMember(group_id, memberId).subscribe(
      (res) => {
        this.openSnackBar('Integrante agregado');
        this.initGroup();
      },
      (error) => {
        this.openSnackBar(error.error.message);
      }
    );
  }
}
