import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'my-app',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css'] 
})
export class AppComponent { 

    constructor(
        private location: Location
    ){
        
    }
    get canGoBack():boolean {
        return this.location.path() != '/dashboard';
    }

    goBack() {
        this.location.back();
    }
}