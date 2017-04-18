import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatter {

    format(dt: Date, format: string): string {
        
        if (format.includes('yyyy')) {
            
            format = format.replace('yyyy', dt.getFullYear().toString());
        } else if (format.includes('yy')) {
            format = format.replace('yy', this.twoDigitString(dt.getFullYear()));
        }
        
        if (format.includes('MM')) {
            format = format.replace('MM', this.twoDigitString(dt.getMonth() + 1));
        } else if (format.includes('M')) {
            format = format.replace('M', (dt.getMonth() + 1).toString());
        }
        
        if (format.includes('dd')) {
            format = format.replace('dd', this.twoDigitString(dt.getDate()));
        } else if (format.includes('d')) {
            format = format.replace('d', dt.getDate().toString());
        }
        
        if (format.includes('hh')) {
            var hours = dt.getHours();
            if (format.includes('D') && hours > 12) {
                hours = hours - 12;
            }
            format = format.replace('hh', this.twoDigitString(hours));
        } else if (format.includes('h')) {
            var hours = dt.getHours();
            if (format.includes('D') && hours > 12) {
                hours = hours - 12;
            }
            format = format.replace('h', dt.getHours().toString());
        }
        
        if (format.includes('mm')) {
            format = format.replace('mm', this.twoDigitString(dt.getMinutes()));
        } else if (format.includes('m')) {
            format = format.replace('m', dt.getMinutes().toString());
        }
        
        if (format.includes('ss')) {
            format = format.replace('ss', this.twoDigitString(dt.getSeconds()));
        } else if (format.includes('s')) {
            format = format.replace('s', dt.getSeconds.toString());
        }
        
        if (format.includes('DD')) {
            if (dt.getHours() > 11) {
                format = format.replace('DD', 'PM');
            } else {
                format = format.replace('DD', 'AM');
            }
        } else if(format.includes('D')) {
            if (dt.getHours() > 11) {
                format = format.replace('D', 'P');
            } else {
                format = format.replace('D', 'A');
            }
        }
        
        return format;
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

    timeString(minutes: number): string {
        console.log(`timeString(${minutes})`);
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

    private twoDigitString(num: number) {
        return `0${num}`.substr(-2);
    }
}