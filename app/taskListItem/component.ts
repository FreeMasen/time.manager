import { Component, OnInit, Input,trigger, state, style, 
            transition, animate } from '@angular/core';

import { Task } from '../models';

@Component({
    selector: 'task-list-item',
    templateUrl: 'app/taskListItem/template.html',
    styleUrls: ['app/taskListItem/style.css'],
    inputs: ['task'],
    animations: [
        trigger('drawer', [
            transition('void => *', [
                animate(250, style({
                    height: '75px'}))
            ]),
            transition('* => void', [
                animate(250, style({
                    height: 0}))
            ])
        ])
    ]
})
export class TaskListItem {

    expanded: string = 'collapsed';
    drawer: string = 'closed';
    @Input() task: Task;

    constructor() {
    
    }

    toggleExpanded(): void {
        if (this.expanded = 'collapsed') {
            this.expanded = 'expanded'
        } else {
            this.expanded = 'collapsed'
        }
    }

    toggleDrawer(): string {
        if (this.expanded == 'expanded') {
            return 'open';
        } else {
            return 'closed';
        }
    }

    toggleSelected() {

    }
}