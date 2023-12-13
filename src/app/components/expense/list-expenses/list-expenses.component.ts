import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../../../services/user.service';
import { Expense } from '../../../models/expense';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-list-expenses',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule],
  templateUrl: './list-expenses.component.html',
  styleUrl: './list-expenses.component.css'
})

export class ListExpensesComponent implements OnInit{
  displayedColumns: string[] = ['name', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Expense>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _userService: UserService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    let token: string | null = localStorage.getItem("token");
    if(token){
      let tokenData = jwtDecode(token);
      this._userService.getExpensesWithUsername(tokenData.sub).subscribe(
        (res) => {
          this.dataSource.data = res || [];
        },
        (error) => console.error(error)
      )
    }
  }
}