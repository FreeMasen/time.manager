import { Component, OnInit } from '@angular/core';

declare var electron: any;
@Component({
    selector:'<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit {
    
    ngOnInit():void {
    }
}