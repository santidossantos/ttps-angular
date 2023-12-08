import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgxTypedJsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  words = [
    'Cuentas Claras',
    'Divide gastos fácilmente',
    'Pagos colaborativos',
    'Salda cuentas sin conflictos',
    'Gestión conjunta de gastos',
  ];

  @Inject(DialogComponent)
  private dialogContent = DialogComponent;
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
