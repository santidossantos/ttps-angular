import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MyFriendsComponent } from '../my-friends/my-friends.component';
import { SearchFriendsComponent } from '../search-friends/search-friends.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ MatTabsModule, MyFriendsComponent, SearchFriendsComponent],
  templateUrl: './view-info-friends.component.html',
  styleUrl: './view-info-friends.component.css'
})
export class ViewInfoFriendsComponent {

}
