import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      name: ['', Validators.required, Validators.minLength(2)],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  submit() {
    this._userService.create(this.form.value).subscribe(
      (res) => {
        console.log('User created successfully');
        console.log(res);
      },
      (err) => console.error(err)
    );
  }
}
