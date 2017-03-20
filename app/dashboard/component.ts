import { Component, OnInit } from '@angular/core';

import { Task } from '../models/task';
import { Tasks } from '../tasks/service';

declare var electron: any;
@Component({
    selector:'<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit {
    taskList: Task[] = [];
    expandedList: string[] = [];

    constructor(private tasks: Tasks) {}
    
    ngOnInit():void {
        this.tasks.getUncomplete().then(taskList => {
            this.taskList = taskList;
        })
    }

    toggle(_id: string) {
        if (this.expandedList.includes(_id)) {
            this.expandedList = this.expandedList.filter(id => {
                return id != _id;
            })
        } else {
            this.expandedList.push(_id);
        }
    }
}