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
import { Router, RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service';
import { switchMap } from 'rxjs/operators';
import { Group } from '../../../models/group';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [
    RouterModule,
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
    MatListModule,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css',
})
export class MyGroupsComponent implements OnInit {
  user_id: number = -1;
  myGroups: Group[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private _groupService: GroupService,
    private router: Router,
    private _userService: UserService
  ) {}

  ngOnInit() {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const tokenData = jwtDecode(token);
      const username = tokenData.sub as string;

      this._userService
        .getByUserName(username)
        .pipe(
          switchMap((user) => {
            this.user_id = user.id;
            return this._userService.getGroupsByUserId(this.user_id);
          })
        )
        .subscribe(
          (groups) => {
            this.myGroups = groups;
            console.log(this.myGroups);
          },
          (error) => console.log(error)
        );
    }
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  grupos: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  // Método para editar un grupo
  editarGrupo(grupo: Section) {
    // Implementa la lógica para editar el grupo
    this.openSnackBar(`Editando ${grupo.name}`);
  }

  // Método para eliminar un grupo
  eliminarGrupo(grupo: Section) {
    // Implementa la lógica para eliminar el grupo
    this.openSnackBar(`Eliminando ${grupo.name}`);
  }

  // Método para agregar un nuevo grupo (puedes implementar según tus necesidades)
  agregarGrupo() {
    // Implementa la lógica para agregar un nuevo grupo
    const nuevoGrupo: Section = {
      name: 'Nuevo Grupo',
      updated: new Date(),
    };
    this.grupos.push(nuevoGrupo);
    this.openSnackBar('Nuevo grupo agregado');
  }

  navigateToMyGroups(): void {
    this.router.navigate(['/dashboard/groups/new']);
  }
}
