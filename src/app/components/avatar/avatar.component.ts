import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { decodeJwt } from '../../utils/decode-jwt';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  file: string = '';

  constructor(private _userService: UserService) {}

  ngOnInit() {
    const username = decodeJwt()?.sub || '';

    this._userService.getAvatar(username).subscribe(
      (blob: Blob) => {
        const _file = URL.createObjectURL(blob);
        this.file = _file;
      },
      (error) => {
        console.error('Error fetching avatar:', error);
      }
    );
  }

  base64ToArrayBuffer(base64: string): Uint8Array {
    const cleanedBase64 = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
    const binaryString = window.atob(cleanedBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const avatarFile = files[0];

      const username = decodeJwt()?.sub || '';

      this._userService.uploadAvatar(username, avatarFile).subscribe();

      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }
  }

  resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}
