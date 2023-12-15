import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../../../models/expense';
import { ExpenseUsersPays } from '../../../models/expense-users-pays';
import { dateFormatter } from '../../../utils/dateFormatter';
import { Group } from '../../../models/group';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail-expense',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './detail-expense.component.html',
  styleUrl: './detail-expense.component.css',
})
export class DetailExpenseComponent implements OnInit {
  expenseId: number = 0;
  panelOpenState = false;
  expense: Expense;
  group: Group = { id: 0, name: '', category: {}, expenses: [] };
  displayedColumns: string[] = ['username', 'amountPayed', 'isPayed'];
  dataSource: ExpenseUsersPays[] = [];

  constructor(
    private _expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {
    this.expense = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.expenseId = params['id'];
    });
    this.getExpenseById();
    this.getGroup();
  }

  getExpenseById() {
    this._expenseService.getById(this.expenseId).subscribe(
      (res) => {
        res.date = dateFormatter(res.date || '');
        this.expense = res;
        this.dataSource = this.expense?.debtorsUsers || [];
      },
      (error) => console.error(error)
    );
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
