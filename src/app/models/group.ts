import { User } from '../models/user'
import { GroupCategory } from '../models/group-category'

export interface Group {
    id: number;
    name: string;
    hidden?: boolean;
    users?: User[];
    category: GroupCategory;
}
