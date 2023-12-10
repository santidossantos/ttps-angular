import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../constants/api-base-url';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = apiURL + 'auth/';

  constructor(private http: HttpClient) {}

  login(params: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    const url = apiURL + 'login';
    return this.http.post(url, params) as Observable<{ token: string }>;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + 'register', user);
  }
}
