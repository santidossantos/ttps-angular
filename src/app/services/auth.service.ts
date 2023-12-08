import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../constants/api-base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = apiURL;

  constructor(private http: HttpClient) {}

  login(params: { username: string; password: string }) {
    const url = apiURL + 'auth/login';
    return this.http.post(url, params).subscribe((res) => {
      const { token } = res as any;
      localStorage.setItem('token', token);
      return token;
    });
  }
}
