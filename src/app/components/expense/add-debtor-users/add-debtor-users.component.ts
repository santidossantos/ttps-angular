import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ExpenseService } from '../../../services/expense.service';
import { Group } from '../../../models/group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../../../models/expense';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../../../models/user';
import { MatTableModule } from '@angular/material/table';


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
    MatGridListModule,
    MatTableModule
  ],
  templateUrl: './add-debtor-users.component.html',
  styleUrl: './add-debtor-users.component.css',
})
export class AddDebtorUsersComponent implements OnInit {
  forms: FormArray;
  expenseId: number = 0;
  expense: Expense = {};
  group: Group = { id: 0, name: '', category: {}, expenses: [], img: '' };
  dataSource: User[] = [];
  displayedColumns = ['position', 'username', 'amount', 'isPayed'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _expenseService: ExpenseService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.expenseId = params['id'];
    });
    this.getExpense();
    this.getGroup();
    for(const user of this.group.users || []){
      this.forms = this.fb.array({
        username: [user.username],
        amountPayed: [],
        isPayed: []
      })
      this.forms.push(form);
    }
  }

  getExpense(){
    this._expenseService.getById(this.expenseId).subscribe(
      (res) => {
        this.expense = res;
      },
      (error) => console.error(error)
    )
  }

  getGroup() {
    this._expenseService.getGroup(this.expenseId).subscribe(
      (res) => {
        this.group = res;
        this.dataSource = res.users || [];
      },
      (error) => console.error(error)
    );
  }

  addDebtorsUsersFixed() {
    // const user = this.form.get('user');
    // if (user)
    //   this.form.controls['user'].setValue({ id: parseInt(user.value, 10) });
    // this._expenseService
    //   .addDebtorUser(this.expenseId, this.form.value)
    //   .subscribe(
    //     (res) => {
    //       this.openSnackBar('Deudor agregado con exito');
    //     },
    //     (error) => console.error(error)
    //   );

    for(const form of this.forms){
      console.log(form);
    }
  }

  addDebtorsUsersPercent(){

  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
