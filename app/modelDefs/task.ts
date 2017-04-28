import { Work, Category, Client } from '../models';
import { Storeable } from '../interfaces'
export class Task implements Storeable {
    _id: string;
    objective: string;
    notes: string[];
    created: Date;
    completed?: Date;
    status: string
    category: Category;
    client: Client

    constructor(id?: string,
                objective: string = '',
                created: Date = new Date(),
                notes: string[] = [],
                completed?: Date,
                category: Category = new Category(),
                client: Client = new Client()) {
        this._id = id;
        this.objective = objective;
        this.created = created;
        this.notes = notes;
        this.category = category;
        this.client = client;
    }
}