import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


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
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './add-debtor-users.component.html',
  styleUrl: './add-debtor-users.component.css',
})
export class AddDebtorUsersComponent implements OnInit {
  form!: FormGroup;
  expenseId: number = 0;
  expense: Expense = {};
  group: Group = { id: 0, name: '', category: {}, expenses: [], img: '' };
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['position', 'user', 'amount', 'isPayed', 'actions'];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _expenseService: ExpenseService,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.expenseId = params['id'];
    });
    this.getExpense();
    this.getGroup();

    this.form = this.fb.group({
      debtorsUsers: this.fb.array([])
    })
  }
  
  get debtorsUsers(): FormArray{
    return this.form.get('debtorsUsers') as FormArray;
  }

  addRow(): void{
    const debtorForm = this.fb.group({
      user: [],
      isPayed: [],
      amountPayed: []
    })
    this.debtorsUsers.push(debtorForm);
    this.dataSource = new MatTableDataSource(this.debtorsUsers.controls);
    this.cd.detectChanges();
  }

  deleteRow(rowIndex: number): void{
    this.debtorsUsers.removeAt(rowIndex);
    this.dataSource = new MatTableDataSource(this.debtorsUsers.controls);
  }

  
  addDebtorsUsersFixed() {
    this._expenseService.addDebtorsUsers(this.expenseId, this.form.value.debtorsUsers).subscribe(
      (res) => {
        this.openSnackBar('Deudores agregados con exito');
      },
      (error) =>{
        console.error(error)
        if(error.status == 406){
          this.openSnackBar('El total de los montos ingresados son menores al total del gasto');
        }
      }
    );
  }

  addDebtorsUsersPercent(){
    const debtors = this.form.value.debtorsUsers;
    this.debtorsUsers.clear();
    for(const debtor of debtors){
      let amount = ((this.expense.amount! * debtor.amountPayed)/100);
      console.log(amount);
      const debtorForm = this.fb.group({
        user: debtor.user,
        isPayed: debtor.isPayed,
        amountPayed: amount
      })
      this.debtorsUsers.push(debtorForm);
    }
    console.log(this.form.value.debtorsUsers);
    this._expenseService.addDebtorsUsers(this.expenseId, this.form.value.debtorsUsers).subscribe(
      (res) => {
        this.openSnackBar('Deudores agregados con exito');
      },
      (error) =>{
        console.error(error)
        if(error.status == 406){
          this.openSnackBar('El total de los montos ingresados son menores al total del gasto');
        }
      }
    );
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
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
      },
      (error) => console.error(error)
    );
  }
}
