import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Task, Work} from '../models';
import { Data, Calculator, DateFormatter } from '../services';

@Component({
    selector: '<calendar-row>',
    inputs: ['task', 'startDate', 'endDate'],
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
        console.log('oninit')
        var q = {$and: [
                        { taskId: this.task._id },
                        { start: { $gte: this.startDate} },
                        { start: { $lte: this.endDate}}
                        ]}
        console.log('query', q)
        this.data.work.find(q, {start: 1})
            .then(work => {
                console.log('got work');
                work.forEach(workItem => {
                    var dayIndex = workItem.start.getDay();
                    var duration = workItem.duration;
                    console.log('Adding', duration, ' minues to', dayIndex);
                    this.work[workItem.start.getDay()] += workItem.duration;
                })
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