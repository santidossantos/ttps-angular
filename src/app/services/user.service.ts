import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { apiURL } from '../constants/api-base-url';
import { Group } from '../models/group';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = apiURL + 'users/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  getByUserName(userName: string | undefined): Observable<User> {
    return this.http.get<User>(this.baseURL + 'username/' + userName);
  }

  getFriendsByUserId(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + id + '/friends');
  }

  getGroupsByUserId(id: number): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseURL + id + '/groups');
  }

  getExpensesWithUsername(username: String | undefined): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseURL + username + '/expense');
  }

  uploadAvatar(username: string, avatarFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('avatarFile', avatarFile, avatarFile.name);
    return this.http.post(this.baseURL + 'avatar/upload', formData);
  }

  getAvatar(username: string): Observable<Blob> {
    return this.http.get(`${this.baseURL}${username}/avatar/`, {
      responseType: 'blob',
    });
  }

  getUsersWithFilter(filter: object){
    return this.http.post<User[]>(apiURL+'users', filter);
  }

  addFriend(userId: number, friendId: number){
    return this.http.post<any>(this.baseURL+'friends', {"id": userId, "friendId": friendId});
  }
}
