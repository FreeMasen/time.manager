import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  trigger, state, style, 
            transition, animate,} from '@angular/animations';
import { Router } from '@angular/router';

import { Task } from '../models';

import { DateFormatter, Calculator } from '../services';

@Component({
    selector: 'task-list-item',
    templateUrl: './template.html',
    styleUrls: ['./style.css'],
    inputs: ['task'],
    animations: [
        trigger('direction', [
            state('collapsed', style({ transform: 'rotate(0)' })),
            state('expanded', style({ transform: 'rotate(90deg)' })),
            transition('expanded -> collapsed', animate('100ms')),
            transition('collapsed => expanded', animate('100ms'))
        ]), 
        trigger('drawer', [
            state('void', style({ height: 0 })),
            state('expanded', style({ height: '*' })),
            transition(':enter', animate('250ms ease-in')),
            transition(':leave', animate('250 ease-out'))
        ]),
        trigger('notesFader', [
            state('expanded', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition(':enter', animate('250ms 250ms ease-in')),
            transition(':leave', animate('250ms ease-out'))
        ]),
        trigger('workFader', [
            state('expanded', style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition(':enter', animate('250ms 250ms ease-in')),
            transition(':leave', animate('250ms ease-out'))
        ])
    ]
})
export class TaskListItem {

    state: boolean = false;
    exiting: boolean = false;
    selected: boolean = false;
    @Input() task: Task;
    @Output() onSelectionChange = new EventEmitter<[string, boolean]>();

    constructor(
            private router: Router,
            private dateFormatter: DateFormatter,
            private calculator: Calculator
    ) {}

    get totalWork(): string {
        var totalMinutes = this.calculator.totalMinutesOfWork(this.task);
        return this.dateFormatter.hoursAndMinutes(totalMinutes);
    }

    get currentState(): string {
        return this.state ? 'expanded' : 'collapsed';
    }

    dateString(dt: Date): string {
        return this.dateFormatter.format(dt, 'M-d-yy h:m D');
    }

    toggleExpanded(): void {
        if (this.state) {
            this.exiting = true;
        } else {
            this.state = true;
            this.exiting = false;
        }
    }

    toggleSelected(): void {
        this.selected = !this.selected;
        this.onSelectionChange.emit([this.task._id, this.selected]);
    }

    goTo(): void {
        console.log(`goTo(${this.task._id})`);
        this.router.navigate(['taskDetail', this.task._id]);
    }

    animationsCallback(event): void {
        console.log(`**${event.phaseName}** trigger: ${event.triggerName} is going from ${event.fromState} to ${event.toState}`);
        if (event.phaseName == 'done') {
            if (event.triggerName == 'notesFader') {
                if (event.toState == 'void') {
                    this.state = false;
                }
            }
        }
    }
}