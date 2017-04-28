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
        this.getWork();
    }

    getTasks(listOfIds: string[]): void {
        this.data.tasks.find({_id: { $in: listOfIds}})
            .then(tasks => {
                this.tasks = tasks;
            })
    }

    getWork(): void {
            this.data.work.find({$and: [
                                    {start: {$gte: this.startDate}},
                                    {start: {$lte: this.endDate}}
                            ]})
                .then(work => {
                    this.work = this.calculator.weekOfWorkMinutes(work);
                    var ids = work.map(element => {
                        return element.taskId;
                    });
                    this.getTasks(ids);
                });
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