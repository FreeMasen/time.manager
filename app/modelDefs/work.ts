import { Storeable } from '../interfaces';

export class Work {
    _id: string;
    taskId: string;
    start: Date;
    duration: number;
    constructor(taskId: string,
                start: Date = new Date(),
                duration:number =  -1) {
        this.taskId = taskId;
        this.start = start;
        this.duration = duration;
    }
}