import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-my-friends',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule, MatIconModule,
    RouterModule, MatFormFieldModule, MatInputModule,
    MatCardModule],
  templateUrl: './my-friends.component.html',
  styleUrl: './my-friends.component.css'
})
export class MyFriendsComponent implements OnInit{
  displayedColumns: string[] = ['img', 'username', 'name', 'email'];
  dataSource = new MatTableDataSource<User>([]);
  userId: number = 0;

  constructor(private _userService: UserService){}

  ngOnInit(){
    this.getUserAndFriends();
  }

  getUserAndFriends(){
    const token: string | null = localStorage.getItem("token");
    if(token){
      const tokenData = jwtDecode(token);
      this._userService.getByUserName(tokenData.sub).subscribe(
        (res) => {
          this.userId = res.id
          this.getFriends();
        },
        (error) => console.error(error)
      )
    }
  }

  getFriends(){
    this._userService.getFriendsByUserId(this.userId).subscribe(
      (res) => this.dataSource.data = res || [],
      (error) => console.error(error)
    )
  }

  
}
