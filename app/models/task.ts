import { Work } from './work';
export class Task {
    _id: string;
    objective: string;
    notes: string[];
    work: Work[];
    created: Date;
    private _completed?: Date;
    get completed(): string {
        if (this.isComplete) {
            return this._completed.toLocaleDateString();
        } 
        return "Not yet complete"
    }
    get isComplete(): boolean {
        return this._completed != null;
    }

    constructor(id: string = '-1',
                objective: string = '',
                created: Date = new Date(),
                notes: string[] = [],
                work: Work[] = [],
                completed?: Date) {
        this._id = id;
        this.objective = objective;
        this.created = created;
        this.notes = notes;
        this.work = work;
    }

    complete() {
        this._completed = new Date();
    }

    uncomplete() {
        this._completed = null;
    }
}