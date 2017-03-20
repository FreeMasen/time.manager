import { Work } from './work';
export class Task {
    _id: string;
    objective: string;
    notes: string[];
    work: Work[];
    isComplete: boolean;
    
    constructor(id: string = '-1',
                objective: string = '',
                notes: string[] = [],
                work: Work[] = [],
                isComplete: boolean = false) {
        this._id = id;
        this.objective = objective;
        this.notes = notes;
        this.work = work;
        this.isComplete = isComplete;
    }
}