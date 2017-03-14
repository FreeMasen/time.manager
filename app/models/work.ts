
export class Work {
    id: number;
    start: Date;
    duration: number;
    categoryId: string;

    constructor(
        id: number = -1,
        start: Date = new Date(0),
        duration: number = -1,
        categoryId: string = ''
    ) {
        this.id = id;
        this.start = start;
        this.duration = duration;
        this.categoryId = categoryId;
    }
}