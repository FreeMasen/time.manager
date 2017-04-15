import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './template.html',
    styleUrls: ['./style.css'] 
})
export class AppComponent { 

    constructor(
        private location: Location,
        private router: Router
    ){
        
    }
    get canGoBack():boolean {
        return this.location.path() != '/dashboard';
    }

    goBack() {
        this.location.back();
    }

    openSettings() {
        this.router.navigate(['settings']);
    }
}