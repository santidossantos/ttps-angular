import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../dashboard/navbar/navbar.component';
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
import { Group } from '../../../models/group'
import { GroupService } from '../../../services/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseCategoryService } from '../../../services/expense-category.service'
import { ExpenseCategory } from '../../../models/expense-category'

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [NavbarComponent, MatInputModule, MatCardModule, MatNativeDateModule, 
            MatDatepickerModule, MatFormFieldModule, MatIconModule, MatButtonModule,
            MatChipsModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})


export class CreateExpenseComponent implements OnInit{

  form: FormGroup;
  groupId: number = 0;
  group: Group = {id:0,name:"",category: {}};
  expenseCreated: boolean = false;
  maxDate: Date;
  categories: ExpenseCategory[] = [];

  constructor(private fb: FormBuilder, private _expenseService: ExpenseService, private route: ActivatedRoute, private _groupService: GroupService, private _snackBar: MatSnackBar, private router: Router, private _expenseCategoryService: ExpenseCategoryService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      img: ['', Validators.required],
      category: ['', Validators.required],
      group: [''],
      payingUser: ['', Validators.required],
      expenseStrategy: ['', Validators.required],
    });

    this.maxDate = new Date();

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.getGroupInfo();
    this.getAllCategories();
  }

  create(){
    const strategy = this.form.get('expenseStrategy');
    const category = this.form.get('category');
    const payingUser = this.form.get('payingUser');
    if(strategy && category && payingUser){
      this.form.controls['expenseStrategy'].setValue(JSON.parse(strategy.value));
      this.form.controls['category'].setValue({"id":parseInt(category.value, 10)});
      this.form.controls['payingUser'].setValue({"id":parseInt(payingUser.value, 10)});
    }
    this.form.controls['group'].setValue({"id": this.groupId});
    this._expenseService.create(this.form.value).subscribe(
      (res) => {
        this.openSnackBar("Gasto creado con exito");
        this.router.navigate(['dashboard'])
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error);
      }
    )
  }

  getGroupInfo(){
    this._groupService.getById(this.groupId).subscribe(
      (res) => {
        this.group = res;
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

  getAllCategories(){
    this._expenseCategoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => console.error(error)
    )
  }
}