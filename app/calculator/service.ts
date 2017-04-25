
import { Injectable } from '@angular/core';

import { Data } from '../services';
import { Work, Bucket, Task } from '../models';


@Injectable()
export class Calculator {

    constructor(private data: Data) {}

    totalMinutesOfWork(work: Work[]): number {
        var ret =  work.map(work => {
            return work.duration;
        }).reduce((acc, val) => {
            return acc + val;
        }, 0);
        return ret;
    }

    getMonday(dt: Date): Date {
        return this.getDay(dt, 1,true);
    }

    getSunday(dt: Date): Date {
        return this.getDay(dt, 0)
    }

    getDay(dt: Date, targetDay: number, backwards: boolean = false): Date {
        var ret = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
        
        while (ret.getDay() != targetDay) {
            if (backwards) ret.setDate(ret.getDate() - 1)
            else ret.setDate(ret.getDate() + 1)
        }
        return ret;
    }

    timeDifference(lhs: Date, rhs: Date): number {
        var lhsUnix = this.unixTime(lhs);
        var rhsUnix = this.unixTime(rhs);
        return lhsUnix - rhsUnix;
    }

    unixTime(dt: Date): number {
        return dt.getTime() / 1000;
    }
}