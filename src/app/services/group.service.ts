import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { apiURL } from '../constants/api-base-url';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  baseURL = apiURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseURL + 'groups');
  }

  create(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseURL, group);
  }
}
