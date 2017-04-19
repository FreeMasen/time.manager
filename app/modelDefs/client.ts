import { Storeable } from '../Interfaces';
export class Client implements Storeable {
    _id: string;
    name: string;
    isQuick: boolean;
    constructor(name: string = 'Unbillable') {
        this.name = name;
        this.isQuick = false;
    }
}