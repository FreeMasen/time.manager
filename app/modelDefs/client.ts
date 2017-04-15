import { Storeable } from '../models';
export class Client implements Storeable {
    _id: string;
    name: string;
    isQuickClient: boolean;
    constructor(name: string) {
        this.name = name;
        this.isQuickClient = false;
    }
}