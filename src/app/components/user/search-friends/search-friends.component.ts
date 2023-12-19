import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule, MatIconModule,
             RouterModule, MatFormFieldModule, MatInputModule,
             MatCardModule],
  templateUrl: './search-friends.component.html',
  styleUrl: './search-friends.component.css'
})
export class SearchFriendsComponent implements OnInit{
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['img', 'username', 'name', 'email', 'actions'];
  userId: number = 0;

  constructor(private _userService: UserService){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const token: string | null = localStorage.getItem("token");
    if(token){
      const tokenData = jwtDecode(token);
      this._userService.getByUserName(tokenData.sub).subscribe(
        (res) => {
          this.userId = res.id
        },
        (error) => console.error(error)
      )
    }
  }

  findUser(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    const stringFilter = filterValue.trim().toLowerCase();
    const filterObj = {"filter": stringFilter, "userId": this.userId}
    this._userService.getUsersWithFilter(filterObj).subscribe(
      (res) =>{
        if(res){
          const users = res.filter(user => user.id !== this.userId);
          this.dataSource.data = users || [];
        }
      },
      (error) => console.error(error)
    )
  }

  addFriend(friendId: number): void{
    this._userService.addFriend(this.userId, friendId).subscribe(
      (res) =>{
      },
      (error) => console.error(error)
    )
  }
}
