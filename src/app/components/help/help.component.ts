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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    RouterModule,
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
    CommonModule,
    CdkAccordionModule,
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent implements OnInit {
  items = [
    {
      pregunta: '¿Cómo comienzo a repartir gastos?',
      respuesta:
        'Para comenzar a repartir gastos, sigue los siguientes pasos: 1. Crea un grupo. Puedes ponerle el nombre que quieras y el icono que mas te guste 2. Agrega a tus amigos (si quieres) 3. Agrega gastos 4.Elige el monto y los demas campos 5. ¡Listo!',
    },
    {
      pregunta: '¿Cómo puedo ver mis gastos?',
      respuesta:
        'Para ver tus gastos, accede a la sección correspondiente y podrás ver todos tus gastos. También puedes filtrarlos por fecha.',
    },
    {
      pregunta: '¿Cómo agrego a un amigo?',
      respuesta:
        'Agregar a un amigo es fácil. Ve a la sección de amigos y haz click en el botón de agregar amigo. Luego, ingresa el correo de tu amigo y haz click en el botón de agregar.',
    },
    {
      pregunta: '¿Puedo ver los gastos de mis amigos?',
      respuesta:
        'Depende si comparten un grupo en comun. Si comparten un grupo, podrás ver los gastos de tus amigos. Si no, no podrás verlos.',
    },
    {
      pregunta: '¿Cómo puedo ver mis amigos?',
      respuesta:
        'Para ver tus amigos, dirígete a la sección de amigos y podrás ver todos tus amigos. También puedes filtrarlos por nombre o correo electrónico.',
    },
  ];
  expandedIndex = 0;

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {}
}
