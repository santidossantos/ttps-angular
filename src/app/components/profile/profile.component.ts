import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../models/user';
import { decodeJwt } from '../../utils/decode-jwt';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, AvatarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private _userService: UserService) {
    this.user = {
      id: 0,
      name: '',
      username: '',
      email: '',
      password: '',
      avatar: '',
    };
  }

  ngOnInit() {
    const username = decodeJwt()?.sub || '';

    this._userService.getByUserName(username).subscribe((user) => {
      this.user = user;
    });
  }
}
