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

  // Preguntarle a Jorge como deberia chequear de manera segura si el usuario esta autenticado
  login(params: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    const url = this.baseURL + 'login';
    return this.http.post(url, params) as Observable<{ token: string }>;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + 'register', user);
  }

  isAuthenticated() {
    // Preguntarle a Jorge como deberia chequear de manera segura si el usuario esta autenticado
    return localStorage.getItem('token') !== null; // Esto esta mal, inseguro??
    // Osea de todas maneras no va a poder hacer peticiones a la api porque el token es invalido
    // en caso de que ponga cualquier cosa en el localstorage
  }
}
