import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatter {

    format(dt: Date, format: string): string {
        if (format.includes('yyyy')) {
            format.replace('yyyy', dt.getFullYear().toString());
        } else if (format.includes('yy')) {
            format.replace('yy', this.twoDigitString(dt.getFullYear()));
        }
        if (format.includes('MM')) {
            format.replace('MM', this.twoDigitString(dt.getMonth() + 1));
        } else if (format.includes('M')) {
            format.replace('M', (dt.getMonth() + 1).toString());
        }
        if (format.includes('dd')) {
            format.replace('dd', this.twoDigitString(dt.getDate()));
        } else if (format.includes('d')) {
            format.replace('d', dt.getDate().toString());
        }
        if (format.includes('hh')) {
            format.replace('hh', this.twoDigitString(dt.getHours()));
        } else if (format.includes('h')) {
            format.replace('h', dt.getHours().toString());
        }
        if (format.includes('mm')) {
            format.replace('mm', this.twoDigitString(dt.getMinutes()));
        } else if (format.includes('m')) {
            format.replace('m', dt.getMinutes().toString());
        }
        if (format.includes('ss')) {
            format.replace('ss', this.twoDigitString(dt.getSeconds()));
        } else if (format.includes('s')) {
            format.replace('s', dt.getSeconds.toString());
        }
        if (format.includes('TT')) {
            if (dt.getHours() > 11) {
                format.replace('TT', 'PM');
            } else {
                format.replace('TT', 'AM');
            }
        } else if(format.includes('T')) {
            if (dt.getHours() > 11) {
                format.replace('T', 'P');
            } else {
                format.replace('T', 'A');
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

    private twoDigitString(num: number) {
        return `0${num}`.substr(-2);
    }
}