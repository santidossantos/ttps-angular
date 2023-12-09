import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../constants/api-base-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = apiURL;

  constructor(private http: HttpClient) {}

  login(params: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    const url = apiURL + 'auth/login';
    return this.http.post(url, params) as Observable<{ token: string }>;
  }
}
