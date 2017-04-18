import { Task } from './task';
export class Category {
    _id: string;
    name: string;
    isQuick: boolean;
    constructor(name: string) {
        this.name = name;
        this.isQuick = false;
    }
}