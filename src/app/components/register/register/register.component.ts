import { routes } from './../../../app.routes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this._authService.register(this.form.value).subscribe();
    this.router.navigate(['dashboard']);
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
