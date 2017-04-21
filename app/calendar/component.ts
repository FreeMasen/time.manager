import { Component, OnInit } from '@angular/core';

import { Data, DateFormatter } from '../services';

@Component({
    selector: '<calendar>',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Calendar implements OnInit {
    startDate: Date;
    endDate: Date;
    buckets: any[] = [];

    constructor(private data: Data,
                private dateFormatter: DateFormatter) {
        
    }

    ngOnInit() {
        //TODO: Add data service call
        for (var i = 0; i < 10; i++) {
            this.buckets.push({
                client: `Client ${i}`,
                category: `Category ${i}`,
                sunday: 0,
                monday: this.dateFormatter.timeString(this.rnd(1,120)),
                tuesday: this.dateFormatter.timeString(this.rnd(1,120)),
                wednesday: this.dateFormatter.timeString(this.rnd(1,120)),
                thursday: this.dateFormatter.timeString(this.rnd(1,120)),
                friday: this.dateFormatter.timeString(this.rnd(1,120)),
                saturday: 0
            })
        }
    }

    goBack() {
        console.log('goBack()');
    }

    goForward() {
        console.log('goForward()')
    }

    get startDateString(): string {
        return this.dateFormatter.toDateTimeLocal(this.startDate);
    }

    get endDateString(): string {
        return this.dateFormatter.toDateTimeLocal(this.endDate);
    }

    private rnd(min, max): number {
        return Math.floor(Math.random() * (max - min) + min)
    }
}