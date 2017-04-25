import { Component, OnInit } from '@angular/core';

import { Data, DateFormatter, Calculator } from '../services';
import { Task } from '../models';

@Component({
    selector: '<calendar>',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Calendar implements OnInit {
    referenceDate = new Date();
    tasks: Task[] = [];

    constructor(private data: Data,
                private dateFormatter: DateFormatter,
                private calculator: Calculator) {}

    ngOnInit() {
        this.data.tasks.find({})
            .then(tasks => {
                this.tasks = tasks;
            })
    }

    formatHours(hours: number) {
        return this.dateFormatter.hoursWithDecimal(hours);
    }

    getTotal(day: string): string {
        return this.dateFormatter.hoursWithDecimal(8);
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