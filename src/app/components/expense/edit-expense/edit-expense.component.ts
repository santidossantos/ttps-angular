import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../../services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../../../models/group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCategoryService } from '../../../services/expense-category.service';
import { ExpenseCategory } from '../../../models/expense-category';
import { Expense } from '../../../models/expense';
import { RouterModule } from '@angular/router';
import { expenseStrategyService } from '../../../services/expense-strategy.service';
import { ExpenseStrategy } from '../../../models/expense-strategy';
import { PutInSpanish } from '../../../utils/putInSpanish';
import IconExpense from '../icons-expense';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [ MatInputModule, MatCardModule, MatNativeDateModule, MatDatepickerModule,
             MatFormFieldModule, MatIconModule, MatButtonModule, MatChipsModule,
             MatSelectModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
})
export class EditExpenseComponent implements OnInit{
  form: FormGroup;
  maxDate: Date;
  categories: ExpenseCategory[] = [];
  strategies: ExpenseStrategy[] = [];
  expenseId: number = 0;
  expense: Expense = {};
  defaultValues: any = {};
  group: Group = { id: 0, name: '', category: {} }
  icons = IconExpense.icons;

  constructor(
    private fb: FormBuilder,
    private _expenseService: ExpenseService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _expenseCategoryService: ExpenseCategoryService,
    private _expenseStrategyService: expenseStrategyService){
      this.form = this.fb.group({
        name: [],
        amount: [],
        date: [],
        img: [],
        category: [],
        group: [],
        payingUser: [],
        expenseStrategy: [],
      });
      this.maxDate = new Date();
    }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.expenseId = params['id'];
    });
    this.getGroup();
    this.getExpenseInfo();
    this.getAllCategories();
    this.getAllExpenseStrategies();
  }

  
  getGroup(){
    this._expenseService.getGroup(this.expenseId).subscribe(
      (res) => {
        this.group = res;
        this.form.controls['group'].setValue({"id": res.id});
      },
      (error) => console.error(error)
      )
    }
    
  getExpenseInfo(){
    this._expenseService.getById(this.expenseId).subscribe(
      (res) =>{
      //Para setear los valores por defecto
      this.expense = res;
      const strategy: Object = {"id": res.expenseStrategy?.id, "expenseStrategy": res.expenseStrategy?.name}
      const category: Object = {"id": res.category?.id}
      const payingUser: Object = {"id": res.payingUser?.id}
      this.defaultValues = {"name": res.name, "amount": res.amount, "date":res.date,
      "category": category, "payingUser": payingUser,
      "expenseStrategy": strategy}
      this.form.patchValue({
        name: res.name,
        amount: res.amount,
        date: res.date,
        category: category,
        payingUser: payingUser,
        expenseStrategy: strategy,
      });
    },
    (error) => console.error(error)
    )
  }

    
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getAllCategories() {
    this._expenseCategoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => console.error(error)
      );
  }
    
  getAllExpenseStrategies(){
    this._expenseStrategyService.getAll().subscribe(
      (res) => {
        this.strategies = res;
      },
      (error) => console.error(error)
      );
  }
  
  edit(){
    this._expenseService.editExpense(this.expenseId,this.form.value).subscribe(
      (res) => {
        this.openSnackBar('Gasto editado con exito');
        this.router.navigate(['dashboard/expense']);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error);
      }
    )
  }

  changeToSpanish(strategyName: string): string{
    return PutInSpanish(strategyName);
  }
}