import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Task, Work} from '../models';
import { Data, Calculator, DateFormatter } from '../services';

@Component({
    selector: '<calendar-row>',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class CalendarRow implements OnInit {

    @Input() task: Task;
    @Input() startDate: Date;
    @Input() endDate: Date;
    work: number[] = [
        0,//u
        0,//m
        0,//t
        0,//w
        0,//r
        0,//f
        0,//s
    ];
    
    constructor(
        private data: Data,
        private calculator: Calculator,
        private dateFormatter: DateFormatter
    ) {
        
    }

    ngOnInit(): void {
        this.data.work.find({$and: [
                        { _id: this.task._id },
                        { start: { $gte: this.startDate} },
                        { start: { $lte: this.endDate}}
                        ]}, {start: 1})
            .then(work => {
                work.forEach(workItem => {
                    this.work[workItem.start.getDay()] += workItem.duration;
                })
            })
    }

    getWorkForDay(day: number): string {
        return this.dateFormatter.hoursWithDecimal(this.work[day])
    }
    
}