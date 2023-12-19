import { User } from '../models/user';
import { GroupCategory } from '../models/group-category';
import { Expense } from '../models/expense';

export interface Group {
  id: number;
  name: string;
  hidden?: boolean;
  users?: User[];
  category: GroupCategory;
  expenses: Expense[];
  img: string;
}
