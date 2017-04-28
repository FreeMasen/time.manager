
import { Injectable } from '@angular/core';

import { Data } from '../services';
import { Work, Task } from '../models';


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
        var ret = this.getDay(dt, 0);
        ret.setHours(23)
        ret.setMinutes(59)
        ret.setSeconds(59)
        return ret;
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
    /**Returns a list of minutes worked divided by day
     * of the week sunday being position 0
     * @param work: Work[] list of work to divide across a week
     */ 
    weekOfWorkMinutes(work: Work[]): number[] {
        var ret = [
            0,//u
            0,//m
            0,//t
            0,//w
            0,//r
            0,//f
            0,//s
        ];
        work.forEach(element => {
            var elementDay = element.start.getDay();
            console.log(elementDay, element.start);
            ret[element.start.getDay()] += element.duration;
        });
        return ret;
    }
}