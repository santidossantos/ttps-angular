import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { apiURL } from '../constants/api-base-url';
import { Group } from '../models/group';
@Injectable({
    providedIn: 'root',
})

export class ExpenseService{
    baseURL = apiURL+'expenses/';
    constructor(private http: HttpClient) {}

    create(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(this.baseURL, expense);
    }

    getById(id: number): Observable<Expense>{
        return this.http.get<Expense>(this.baseURL+id);
    }

    getGroup(idExpense: number): Observable<Group>{
        return this.http.get<Group>(this.baseURL+idExpense+'/group');
    }
}