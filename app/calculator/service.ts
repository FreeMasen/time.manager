import { Injectable } from '@angular/core';
import { Task } from '../models';
@Injectable()
export class Calculator {
    totalMinutesOfWork(task: Task): number {
        var ret =  task.work.map(work => {
            return work.duration;
        }).reduce((acc, val) => {
            return acc + val;
        }, 0);
        console.log(`totalMinutesOfWork(): ${ret}`);
        return ret;
    }
}