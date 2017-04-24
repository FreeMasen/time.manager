import { Component, OnInit } from '@angular/core';

import { Data, DateFormatter, Calculator } from '../services';

@Component({
    selector: '<calendar>',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Calendar implements OnInit {
    referenceDate = new Date();
    buckets: any[] = [];

    constructor(private data: Data,
                private dateFormatter: DateFormatter,
                private calculator: Calculator) {}

    ngOnInit() {
        this.data.work.find({$and: [{start: { $gte: this.startDate }}, 
                                    {start: {$lte: this.endDate}}]})
                .then(work => {
                    var taskIds = work.map(workItem => {
                        return workItem.taskId
                    })
                    this.data.tasks.find({_id: {$in: taskIds}})
                        .then(tasks => {
                            
                        })
                })
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
        this.referenceDate.setDate(this.referenceDate.getDate() - 7);
    }

    goForward() {
        this.referenceDate.setDate(this.referenceDate.getDate() + 7);
    }

    get startDate(): Date {
        return this.calculator.getMonday(this.referenceDate);
    } 

    get endDate(): Date {
        return this.calculator.getSunday(this.referenceDate);
    }

    get startDateString(): string {
        return this.dateFormatter.format(this.startDate, 'M/d/yyyy');
    }

    get endDateString(): string {
        return this.dateFormatter.format(this.endDate, 'M/d/yyyy');
    }
}