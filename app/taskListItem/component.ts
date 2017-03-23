import { Component, OnInit, Input,trigger, state, style, 
            transition, animate } from '@angular/core';

import { Task } from '../models';

@Component({
    selector: 'task-list-item',
    templateUrl: 'app/taskListItem/template.html',
    styleUrls: ['app/taskListItem/style.css'],
    inputs: ['task'],
    animations: [
        trigger('expanded', [
            state('collapsed', style({
                transition: 'rotate(0)'
            })),
            transition('collapsed => expanded', [
                style({
                    
                }),
                animate(250, style({
                    transition: 'rotate(90)'
                }))
            ])
        ]),
        trigger('drawer', [
            state('closed', style({
                height: 0
            })),
            transition('void => *', [
                style({
                    height: 0
                }),
                animate(250, style({height: '*'}))
            ]),
            transition('* => void', [
                style({
                    height: '*'
                }),
                animate(250, style({height: 0}))
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
}