import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ExpenseService } from '../../../services/expense.service';
import { Group } from '../../../models/group';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-debtor-users',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './add-debtor-users.component.html',
  styleUrl: './add-debtor-users.component.css',
})
export class AddDebtorUsersComponent implements OnInit {
  form: FormGroup;
  expenseId: number = 0;
  group: Group = { id: 0, name: '', category: {}, expenses: [], img: '' };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _expenseService: ExpenseService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      amountPayed: ['', Validators.required],
      isPayed: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.expenseId = params['id'];
    });
    this.getGroup();
  }

  getGroup() {
    this._expenseService.getGroup(this.expenseId).subscribe(
      (res) => {
        this.group = res;
      },
      (error) => console.error(error)
    );
  }

  addDebtorUser() {
    const user = this.form.get('user');
    if (user)
      this.form.controls['user'].setValue({ id: parseInt(user.value, 10) });
    this._expenseService
      .addDebtorUser(this.expenseId, this.form.value)
      .subscribe(
        (res) => {
          this.openSnackBar('Deudor agregado con exito');
        },
        (error) => console.error(error)
      );
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
