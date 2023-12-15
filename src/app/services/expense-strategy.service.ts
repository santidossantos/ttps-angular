import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from '../constants/api-base-url';
import { ExpenseStrategy } from '../models/expense-strategy';

@Injectable({
    providedIn: 'root',
})

export class expenseStrategyService{
    baseURL = apiURL+'expense-strategy/';
    constructor(private http: HttpClient) {}

    getAll(): Observable<ExpenseStrategy[]> {
        return this.http.get<ExpenseStrategy[]>(this.baseURL);
    }
}