import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

import {Task, Work} from '../models';
import { Data, Calculator, DateFormatter } from '../services';

@Component({
    selector: '<calendar-row>',
    inputs: ['task', 'centerDate'],
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class CalendarRow implements OnInit {

    @Input() task: Task;
    startDate: Date;
    endDate: Date;
    @Input() 
    set centerDate (dt: Date) {
        this.startDate = this.calculator.getMonday(dt);
        this.endDate = this.calculator.getSunday(dt);
        this.getWork();
    }

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
        this.getWork();
    }

    getWork() {

        var q = {$and: [
                        { taskId: this.task._id },
                        { start: { $gte: this.startDate} },
                        { start: { $lte: this.endDate}}
                        ]}
        console.log('getWork', q)
        this.data.work.find(q, {start: 1})
            .then(work => {
                console.log('gotWork', work)
                this.work = this.calculator.weekOfWorkMinutes(work);
            }).catch(e => {
                console.error(e)
            }) 
    }

    getWorkForDay(day: number): string {
        return this.dateFormatter.hoursWithDecimal(this.work[day])
    }

    getTotalWork() {
        return this.dateFormatter.hoursWithDecimal(this.work.reduce((a, b) => {
            return a + b;
        }, 0))
    }
    
}