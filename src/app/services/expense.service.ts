import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { apiURL } from '../constants/api-base-url';
import { Group } from '../models/group';
import { ExpenseUsersPays } from '../models/expense-users-pays';

@Injectable({
    providedIn: 'root',
})

export class ExpenseService{
    baseURL = apiURL+'expenses/';
    constructor(private http: HttpClient) {}

    create(expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(this.baseURL, expense);
    }

    getById(idExpense: number): Observable<Expense>{
        return this.http.get<Expense>(this.baseURL+idExpense);
    }

    getGroup(idExpense: number): Observable<Group>{
        return this.http.get<Group>(this.baseURL+idExpense+'/group');
    }

    addDebtorsUsers(idExpense: number, eupList: ExpenseUsersPays[]): Observable<ExpenseUsersPays>{
        return this.http.post<ExpenseUsersPays>(this.baseURL+idExpense+'/debtorsUsers', eupList);
    }

    editExpense(idExpense: number, expense: Expense): Observable<Expense>{
        return this.http.put<Expense>(this.baseURL+idExpense, expense)
    }

    changeIsPayedStatus(idEup: number): Observable<ExpenseUsersPays>{
        return this.http.put<any>(apiURL+'eup/'+idEup+'/isPayed', {});
    }
}