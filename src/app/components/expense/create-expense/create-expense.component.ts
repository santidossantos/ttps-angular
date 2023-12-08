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
import { ActivatedRoute } from '@angular/router';

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
  groupId: number;

  constructor(private fb: FormBuilder, private _expenseService: ExpenseService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      // date: ['', Validators.required],
      img: ['', Validators.required],
      category: ['', Validators.required],
      group: [''],
      payingUser: [''],
      expenseStrategy: ['', Validators.required],
    });
    this.groupId=0;
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
  }

  create(){
    this.form.controls['group'].setValue(this.groupId);
    this._expenseService.create(this.form.value).subscribe(
      (res) => {
        console.log('User created successfully');
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  
}
