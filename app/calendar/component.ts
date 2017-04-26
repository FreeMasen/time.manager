import { Component, OnInit } from '@angular/core';

import { Data, DateFormatter, Calculator } from '../services';
import { Task } from '../models';

@Component({
    selector: '<calendar>',
    outputs: ['task', 'startDate', 'endDate'],
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Calendar implements OnInit {
    referenceDate = new Date();
    tasks: Task[] = [];
    work: number[] = [
        0,//u
        0,//m
        0,//t
        0,//w
        0,//r
        0,//f
        0,//s
    ];
    constructor(private data: Data,
                private dateFormatter: DateFormatter,
                private calculator: Calculator) {}

    ngOnInit() {
        this.getTasks();
    }

    getTasks(): void {
        this.data.tasks.find({})
            .then(tasks => {
                this.tasks = tasks;
                this.getWork();
            })
    }

    getWork(): void {
        var ids = this.tasks.map(task => {
                return task._id;
            })
            this.data.work.find({taskId: {$in: ids}})
                .then(work => {
                    this.work = this.calculator.weekOfWorkMinutes(work);
                })
    }

    formatHours(hours: number) {
        return this.dateFormatter.hoursWithDecimal(hours);
    }

    getTotal(day: number): string {
        return this.dateFormatter.hoursWithDecimal(this.work[day]);
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