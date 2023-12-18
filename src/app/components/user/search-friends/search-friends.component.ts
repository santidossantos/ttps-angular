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
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule, MatIconModule,
             RouterModule, MatFormFieldModule, MatInputModule,
             MatCardModule],
  templateUrl: './search-friends.component.html',
  styleUrl: './search-friends.component.css'
})
export class SearchFriendsComponent {
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['img', 'name', 'email', 'actions'];

  constructor(private _userService: UserService){}


  findFriend(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    const stringFilter = filterValue.trim().toLowerCase();
    this._userService.getFriendsWithFilter({"filter":stringFilter}).subscribe(
      (res) =>{ 
        this.dataSource.data = res || [];
        console.log(res); 
      },
      (error) => console.error(error)
    )
  }
}
