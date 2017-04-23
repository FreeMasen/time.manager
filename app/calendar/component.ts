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
                monday: this.rnd(1,120),
                tuesday: this.rnd(1,120),
                wednesday: this.rnd(1,120),
                thursday: this.rnd(1,120),
                friday: this.rnd(1,120),
                saturday: 0
            })
        }
    }

    formatHours(hours: number) {
        return this.dateFormatter.hoursWithDecimal(hours);
    }

    getTotal(day: string): string {
        var total = this.buckets.reduce((a, b) => {
            return a + b[day];
        }, 0);
        return this.dateFormatter.hoursWithDecimal(total);
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