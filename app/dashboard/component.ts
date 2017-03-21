import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../models';
import { Tasks } from '../services';
import { TaskListItem } from '../taskListItem/component'

declare var electron: any;
@Component({
    selector:'<dashboard>',
    outputs: ["task"],
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit {
    taskList: Task[] = [];
    expandedList: string[] = [];
    selected: string[] = []
    constructor(private tasks: Tasks,
                private router: Router) {}
    
    ngOnInit():void {
        this.tasks.getUncomplete()
        .then(taskList => {
            this.taskList = taskList;
        })
    }

    toggleExpanded(_id: string) {
        if (this.expandedList.includes(_id)) {
            this.expandedList = this.expandedList.filter(id => {
                return id != _id;
            })
        } else {
            this.expandedList.push(_id);
        }
    }

    toggleSelected(id: string) {
        if (this.selected.includes(id)) {
            this.selected = this.selected.filter(selectedId => {
                return id != selectedId;
            })
        } else {
            this.selected.push(id);
        }
    }

    goTo(id: string): void {
        this.router.navigate(['taskDetail', id])
    }
}