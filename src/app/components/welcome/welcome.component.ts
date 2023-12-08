import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgxTypedJsModule, MatDialogModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  words = [
    'Cuentas Claras',
    'Divide gastos fácilmente',
    'Pagos colaborativos',
    'Salda cuentas sin conflictos',
    'Gestión conjunta de gastos',
  ];

  @Inject(LoginComponent)
  private dialogContent = LoginComponent;
  public dialogRef: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  openDialog() {
    this.dialogRef = this.dialog.open(this.dialogContent);

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
