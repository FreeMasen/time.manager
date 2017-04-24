export class Bucket {
    constructor(
                private clientName: string,
                private categoryNamy: string,
                private monday: number = 0,
                private tuesday: number = 0,
                private wednesday: number = 0,
                private thursday: number = 0,
                private friday: number = 0,
                private saturday: number = 0,
                private sunday: number = 0
                ) {}

}