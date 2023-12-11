import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseCategory } from '../models/expense-category';
import { apiURL } from '../constants/api-base-url';

@Injectable({
    providedIn: 'root',
})

export class ExpenseCategoryService{
    baseURL = apiURL+'expense-category/';
    constructor(private http: HttpClient) {}

    getAll(): Observable<ExpenseCategory[]> {
        return this.http.get<ExpenseCategory[]>(this.baseURL);
    }
}