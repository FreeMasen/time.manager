import { Component, OnInit, Input,trigger, state, style, 
            transition, animate } from '@angular/core';

import { Task } from '../models';

@Component({
    selector: 'task-list-item',
    templateUrl: 'app/taskListItem/template.html',
    styleUrls: ['app/taskListItem/style.css'],
    inputs: ['task'],
    animations: [
        trigger('displayToggle', [
            state('expanded', style({
                transfor: 'rotate(90)'
            })),
            state('!expanded', style({
                transition: 'rotate(-90)'
            })),
            transition('collapsed => expanded', animate('100ms')),
            transition('expanded => collapsed', animate('100ms'))
        ])
    ]
})
export class TaskListItem {

    expanded: string = 'collapsed';
    
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
}