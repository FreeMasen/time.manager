import { Work, Category, Client } from '../models';
import { Storeable } from '../interfaces'
export class Task implements Storeable {
    _id: string;
    objective: string;
    notes: string[];
    work: Work[];
    created: Date;
    completed?: Date;
    status: string
    category: Category;
    client: Client

    constructor(id?: string,
                objective: string = '',
                created: Date = new Date(),
                notes: string[] = [],
                work: Work[] = [],
                completed?: Date,
                category: Category = new Category(),
                client: Client = new Client()) {
        this._id = id;
        this.objective = objective;
        this.created = created;
        this.notes = notes;
        this.work = work;
        this.category = category;
        this.client = client;
    }
}