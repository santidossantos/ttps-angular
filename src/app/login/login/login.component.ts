import { Component, OnInit } from '@angular/core';
import { Typewriter } from 'ngx-simple-typewriter';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Typewriter],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  words = [
    'Cuentas Claras',
    'Divide gastos fácilmente',
    'Pago colaborativo',
    'Salda cuentas sin conflictos',
    'Gestión conjunta de gastos',
  ];

  constructor() {}

  ngOnInit() {}
}
