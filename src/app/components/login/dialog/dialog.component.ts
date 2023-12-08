import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  login() {
    const usuario = this.form.value.user;
    const password = this.form.value.password;

    if (usuario === 'juan' && password === '123456') {
      this.fakeLoading();
    } else {
      this.onError();
      this.form.reset();
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
    setTimeout(() => {
      this.router.navigate(['dashboard']);
      this.loading = false;
    }, 1500);
  }
}
