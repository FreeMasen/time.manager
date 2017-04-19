import { Storeable } from '../interfaces';
export class Category implements Storeable {
    _id: string;
    name: string;
    isQuick: boolean;
    constructor(name: string = 'Uncategorized') {
        this.name = name;
        this.isQuick = false;
    }
}