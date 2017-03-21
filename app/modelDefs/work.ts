export class Work {
    _id: string;
    start: Date;
    duration: number;
    constructor(_id: string = '-1',
                start: Date = new Date(),
                duration:number =  -1) {
        this._id = _id;
        this.start = start;
        this.duration = duration;
    }
}