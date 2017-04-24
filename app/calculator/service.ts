import { Injectable } from '@angular/core';
import { Work } from '../models';
@Injectable()
export class Calculator {
    totalMinutesOfWork(work: Work[]): number {
        var ret =  work.map(work => {
            return work.duration;
        }).reduce((acc, val) => {
            return acc + val;
        }, 0);
        return ret;
    }
}