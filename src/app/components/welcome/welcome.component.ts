import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from '../../services/dialog.service';
import { RegisterComponent } from '../register/register/register.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgxTypedJsModule, MatDialogModule, FooterComponent],
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

  public dialogRef: any;

  @Inject(LoginComponent)
  private loginDialog = LoginComponent;

  @Inject(RegisterComponent)
  private registerDialog = RegisterComponent;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.dialogService.closeDialog$.subscribe(() => {
      this.dialogRef.close();
      this.dialogRef = null;
    });
  }

  openLoginDialog() {
    this.dialogRef = this.dialog.open(this.loginDialog, {
      closeOnNavigation: true,
      panelClass: 'custom-modalbox',
    });
    this.dialogRef.afterClosed().subscribe(() => (this.dialogRef = null));
  }

  openRegisterDialog() {
    this.dialogRef = this.dialog.open(this.registerDialog, {
      closeOnNavigation: true,
      panelClass: 'custom-modalbox',
    });
    this.dialogRef.afterClosed().subscribe(() => (this.dialogRef = null));
  }
}
