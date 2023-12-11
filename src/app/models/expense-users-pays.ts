import { User } from '../models/user'

export interface ExpenseUsersPays {
    id?: number;
    amountPayed?: number; 
    isPayed?: boolean;
    user?: User;
}