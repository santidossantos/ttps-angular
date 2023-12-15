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

  getByUserName(userName: string): Observable<User> {
    return this.http.get<User>(this.baseURL + 'username/' + userName);
  }

  getGroupsByUserId(id: number): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseURL + id + '/groups');
  }

  getExpensesWithUsername(username: String | undefined): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.baseURL+username+"/expense")
  }
}
