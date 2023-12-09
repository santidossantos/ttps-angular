import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from './../../services/dialog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  reactiveForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  login() {
    if (this.reactiveForm.valid) {
      const credentials = {
        username: this.reactiveForm.controls.username.value as string,
        password: this.reactiveForm.controls.password.value as string,
      };

      this.authService.login(credentials).subscribe(
        ({ token }) => {
          localStorage.setItem('token', token);
          this.fakeLoading();
        },
        (error) => {
          console.error('Error durante el inicio de sesión:', error);
        }
      );
    }
  }

  onError() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fakeLoading() {
    this.loading = true;
    this.dialogService.triggerCloseDialog();
    setTimeout(() => {
      this.router.navigate(['dashboard']);
      this.loading = false;
    }, 1500);
  }
}
