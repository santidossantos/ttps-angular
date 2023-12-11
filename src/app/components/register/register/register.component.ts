import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: [null, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  submit() {
    this._authService.register(this.form.value).subscribe(
      (res) => {
        this._snackBar.open('Registrado correctamente', '', {
          duration: 4000,
        });
        this.dialogService.triggerCloseDialog();
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err.error.message.includes('usuario')) {
          this.form.get('username')?.setErrors({ usernameExists: true });
        }
        if (err.error.message.includes('email')) {
          this.form.get('email')?.setErrors({ emailExists: true });
        }
      }
    );
  }

  displayErrors = (controlName: string, errorName: string) => {
    const control = this.form.get(controlName);
    return control && control.hasError(errorName);
  };

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
}
