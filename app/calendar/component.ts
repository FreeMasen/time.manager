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
            this.data.work.find({$and: [
                                    {taskId: {$in: ids}},
                                    {start: {$gte: this.startDate}},
                                    {start: {$lte: this.endDate}}
                            ]})
                .then(work => {
                    this.work = this.calculator.weekOfWorkMinutes(work);
                })
    }

    formatHours(hours: number) {
        return this.dateFormatter.hoursWithDecimal(hours);
    }

    getTotal(day: number): string {
        var hours
        if (day == 7) hours = this.work.reduce((a, b) => {
            return a + b
        }, 0);
        else hours = this.work[day];
        return this.dateFormatter.hoursWithDecimal(hours);
    }

    goBack() {
        this.referenceDate = new Date(this.referenceDate.getFullYear(), this.referenceDate.getMonth(), this.referenceDate.getDate() - 7);
        this.getWork();
    }

    goForward() {
        this.referenceDate = new Date(this.referenceDate.getFullYear(), this.referenceDate.getMonth(), this.referenceDate.getDate() + 7);
        this.getWork();
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