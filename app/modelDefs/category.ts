import { Task } from './task';
export class Category {
    _id: string;
    name: string;
    tasks: Task[];
    isQuickCategory: boolean;
}