import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatter {

    format(dt: Date, fmt?: string): string {
        if (!fmt) return this.standard(dt);
        if (fmt.includes('yyyy')) {
            
            fmt = fmt.replace('yyyy', dt.getFullYear().toString());
        } else if (fmt.includes('yy')) {
            fmt = fmt.replace('yy', this.twoDigitString(dt.getFullYear()));
        }
        
        if (fmt.includes('MM')) {
            fmt = fmt.replace('MM', this.twoDigitString(dt.getMonth() + 1));
        } else if (fmt.includes('M')) {
            fmt = fmt.replace('M', (dt.getMonth() + 1).toString());
        }
        
        if (fmt.includes('dd')) {
            fmt = fmt.replace('dd', this.twoDigitString(dt.getDate()));
        } else if (fmt.includes('d')) {
            fmt = fmt.replace('d', dt.getDate().toString());
        }
        
        if (fmt.includes('hh')) {
            var hours = dt.getHours();
            if (fmt.includes('D') && hours > 12) {
                hours = hours - 12;
            }
            fmt = fmt.replace('hh', this.twoDigitString(hours));
        } else if (fmt.includes('h')) {
            var hours = dt.getHours();
            if (fmt.includes('D') && hours > 12) {
                hours = hours - 12;
            }
            fmt = fmt.replace('h', dt.getHours().toString());
        }
        
        if (fmt.includes('mm')) {
            fmt = fmt.replace('mm', this.twoDigitString(dt.getMinutes()));
        } else if (fmt.includes('m')) {
            fmt = fmt.replace('m', dt.getMinutes().toString());
        }
        
        if (fmt.includes('ss')) {
            fmt = fmt.replace('ss', this.twoDigitString(dt.getSeconds()));
        } else if (fmt.includes('s')) {
            fmt = fmt.replace('s', dt.getSeconds.toString());
        }
        
        if (fmt.includes('DD')) {
            if (dt.getHours() > 11) {
                fmt = fmt.replace('DD', 'PM');
            } else {
                fmt = fmt.replace('DD', 'AM');
            }
        } else if(fmt.includes('D')) {
            if (dt.getHours() > 11) {
                fmt = fmt.replace('D', 'P');
            } else {
                fmt = fmt.replace('D', 'A');
            }
        }
        
        return fmt;
    }

    standard(dt: Date): string {
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var year = dt.getFullYear().toString().substr(-2);
        var hour = dt.getHours();
        var minutes = this.twoDigitString(dt.getMinutes());
        var timeOfDay
        if (hour > 11) {
            if (hour > 12) hour = hour -12;
            timeOfDay = "PM" ;
        } else {
            timeOfDay = "AM";
        }
        return `${month}/${day}/${year} ${hour}:${minutes} ${timeOfDay}`
    }

    toDateTimeLocal(dt: Date): string {
        if (!dt) dt = new Date()
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var hour = dt.getHours();
        var minutes = dt.getMinutes();
        var ret = `${year}-${this.twoDigitString(month)}-${this.twoDigitString(day)}T${this.twoDigitString(hour)}:${this.twoDigitString(minutes)}`
        return ret;
    }

    fromDateTimeLocal(value: string): Date {
        var dateParts = value.replace('T', '-').split('-')
        var year = Number.parseInt(dateParts[0]);
        var month = Number.parseInt(dateParts[1]);
        var day = Number.parseInt(dateParts[2]);
        var timeParts = dateParts[3].split(':');
        var hour = Number.parseInt(timeParts[0]);
        var minute = Number.parseInt(timeParts[1]);
        return new Date(year, month - 1, day, hour, minute);
    }

    hoursAndMinutes(minutes: number): string {
        console.log(`hoursAndMinutesString(${minutes})`);
        var hours = 0;
        while(minutes > 60) {
            hours++;
            minutes -= 60;
        }
        var ret = '';
        if (hours > 0) ret += `${hours} hours `;
        if (minutes > 0) ret += `${minutes} minutes`;
        if (ret.length == 0) return `0 minutes`;
        return ret.trim();
    }

    hoursWithDecimal(minutes: number): string {
        return `${(minutes / 60).toFixed(2)} hours`;
    }

    private fillWithZeros(num: number, targetLength: number = 2): string {
        return `${'0'.repeat(targetLength)}${num}`.substr(-targetLength);
    }

    private twoDigitString(num: number) {
        return `0${num}`.substr(-2);
    }
}