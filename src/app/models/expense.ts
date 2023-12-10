import { Group } from '../models/group'
import { User } from '../models/user'
import { ExpenseCategory } from '../models/expense-category'
import { ExpenseUsersPays } from '../models/expense-users-pays'
import { ExpenseStrategy } from '../models/expense-strategy'


export interface Expense {
    id?: number; // int64
    amount?: number; // double
    name?: string;
    date?: string; // date-time
    img?: string;
    group?: Group;
    category?: ExpenseCategory;
    payingUser?: User;
    debtorsUsers?: ExpenseUsersPays[];
    expenseStrategy?: ExpenseStrategy;
}