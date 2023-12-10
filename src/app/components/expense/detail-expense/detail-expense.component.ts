import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../../../models/expense'
import { ExpenseUsersPays } from '../../../models/expense-users-pays'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},
  {position: 5, name: 'Boron', weight: 10.81},
  {position: 6, name: 'Carbon', weight: 12.0107,},
  {position: 7, name: 'Nitrogen', weight: 14.006},
  {position: 8, name: 'Oxygen', weight: 15.9994},
  {position: 9, name: 'Fluorine', weight: 18.9984},
  {position: 10, name: 'Neon', weight: 20.1797},
];

@Component({
  selector: 'app-detail-expense',
  standalone: true,
  imports: [ MatCardModule, MatTableModule, MatExpansionModule, RouterModule, MatButtonModule],
  templateUrl: './detail-expense.component.html',
  styleUrl: './detail-expense.component.css'
})


export class DetailExpenseComponent implements OnInit {

  expenseId: number = 0;
  panelOpenState = false;
  expense: Expense;
  displayedColumns: string[] = ['username', 'amountPayed', 'isPayed'];
  dataSource: ExpenseUsersPays[] = [];

  constructor(private _expenseService: ExpenseService, private route: ActivatedRoute){
    this.expense = {};
  }


  ngOnInit(){
    this.route.params.subscribe(params => {
      this.expenseId = params['id'];
    });
    this.getExpenseById();
    console.log(this.dataSource);
  }

  getExpenseById(){
    this._expenseService.getById(this.expenseId).subscribe(
      (res) => {
        this.expense = res;
        this.dataSource = this.expense?.debtorsUsers  || [];
      },
      (error) => console.error(error)
    )
  }
}
