import { Task } from './task';
export class Category {
    _id: string;
    name: string;
    isQuickCategory: boolean;
    constructor(name: string) {
        this.name = name;
        this.isQuickCategory = false;
    }
}