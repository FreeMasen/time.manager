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
                animate('250ms ease-in', style({
                    height: '75px'}))
            ]),
            transition('* => void', [
                animate('250ms ease-out', style({
                    height: 0}))
            ])
        ]),
        trigger('expanded', [
            state('collapsed', style({transform: 'rotate(0)'})),
            transition('collapsed => expanded', [
                animate(250, style({
                    transform: 'rotate(90deg)'}))
            ]),
            state('expanded', style({transform: 'rotate(90deg)'})),
            transition('expanded => collapsed', [
                animate(250, style({
                    transform: 'rotate(0)'}))
            ])
        ])
    ]
})
export class TaskListItem {

    expanded: string = 'collapsed';
    
    @Input() task: Task;

    constructor() {
    
    }

    toggleExpanded(): void {
        console.log(`updating from: ${this.expanded}, ${this.drawer}`);
        if (this.expanded == 'collapsed') {
            this.expanded = 'expanded';
        } else {
            this.expanded = 'collapsed';
        }
        console.log(`to: ${this.expanded}, ${this.drawer}`);
    }

    get drawer(): string {
        if (this.expanded == 'collapsed') {
            return 'closed'
        }
        return 'open'
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