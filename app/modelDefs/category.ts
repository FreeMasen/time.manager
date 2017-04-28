import { Storeable } from '../interfaces';
export class Category implements Storeable {
    _id: string;
    name: string;
    isQuick: boolean;
    constructor(name: string = '') {
        this.name = name;
        this.isQuick = false;
    }
}