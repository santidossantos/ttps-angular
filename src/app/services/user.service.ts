import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { apiURL } from '../constants/api-base-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = apiURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'users');
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }
}
