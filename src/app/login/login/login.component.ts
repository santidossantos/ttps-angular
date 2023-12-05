import { Component, OnInit } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgxTypedJsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  words = [
    'Cuentas Claras',
    'Divide gastos fácilmente',
    'Pagos colaborativos',
    'Salda cuentas sin conflictos',
    'Gestión conjunta de gastos',
  ];

  constructor() {}

  ngOnInit() {}
}
