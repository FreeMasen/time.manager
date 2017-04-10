import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  trigger, state, style, 
            transition, animate,} from '@angular/animations';
import { Router } from '@angular/router';

import { Task } from '../models';

import { DateFormatter } from '../services';

@Component({
    selector: 'task-list-item',
    templateUrl: './template.html',
    styleUrls: ['./style.css'],
    inputs: ['task'],
    animations: [
        trigger('direction', [
            state('collapsed', style({ transform: 'rotate(0)' })),
            state('expanded', style({ transform: 'rotate(90deg)' })),
            transition('expanded -> collapsed', animate('300ms 500ms')),
            transition('collapsed => expanded', animate('300ms'))
        ]), 
        trigger('drawer', [
            state('void', style({ height: 0 })),
            state('open', style({ height: '*' })),
            transition('void => open', animate('250ms ease-in')),
            transition('* => void', animate('250ms 250ms ease-out'))
        ]),
        trigger('notesFader', [
            state('expanded', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* => expanded', animate('250ms ease-in')),
            transition('expanded => *', animate('250ms 125ms ease-out'))
        ]),
        trigger('workFader', [
            state('expanded', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* => expanded', animate('250ms 125ms ease-in')),
            transition('expanded => *', animate('250ms ease-out'))
        ])
    ]
})
export class TaskListItem {

    state: boolean = false;
    selected: boolean = false;
    @Input() task: Task;
    @Output() onSelectionChange = new EventEmitter<[string, boolean]>();

    constructor(
            private router: Router,
            private dateFormatter: DateFormatter
    ) {}

    get currentState() {
        return this.state ? 'expanded' : 'collapsed';
    }

    dateString(dt: Date): string {
        return this.dateFormatter.format(dt, 'MM-dd-yyyy hh:mm TT');
    }

    toggleExpanded() {
        this.state = !this.state;
    }

    toggleSelected() {
        this.selected = !this.selected;
        this.onSelectionChange.emit([this.task._id, this.selected]);
    }

    goTo(): void {
        console.log(`goTo(${this.task._id})`);
        this.router.navigate(['taskDetail', this.task._id]);
    }
}