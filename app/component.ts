import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Data } from './services';

@Component({
    selector: 'my-app',
    templateUrl: './template.html',
    styleUrls: ['./style.css'] 
})
export class AppComponent { 

    listView: boolean = true

    constructor(
        private location: Location,
        private router: Router,
        private data: Data
    ){
        
    }
    get canGoBack():boolean {
        return this.location.path() != '/dashboard'
    }

    get isCalendarView():boolean {
        return this.location.path() != '/calendar';
    }

    goBack() {
        this.location.back();
    }

    openSettings() {
        this.router.navigate(['settings']);
    }

    openCalendar() {
        this.router.navigate(['calendar']);

    }

    openDashboard() {
        this.router.navigate(['dashboard']);
    }
}