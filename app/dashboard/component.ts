import { Component, OnInit, Input} from '@angular/core';
import {trigger, state, style, 
            transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { Task } from '../models';
import { Tasks } from '../services';

declare var electron: any;
@Component({
    selector:'<dashboard>',
    animations: [
    trigger('displayToggle', [
      state('displayed', style({
        transform: 'rotate(90)'
      })),
      state('hidden',   style({
        transform: 'rotate(-90)'
      })),
      transition('displayed => hidden', animate('100ms ease-in')),
      transition('hidden => displayed', animate('100ms ease-out'))
    ])],
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Dashboard implements OnInit {
    taskList: Task[] = [];
    selected: string[] = []
    constructor(private tasks: Tasks,
                private router: Router) {}
    
    ngOnInit():void {
        this.getUncomplete();
    }

    toggleSelected(change: [string, boolean]) {
        console.log(change)
        if (change[1]) {
            this.selected.push(change[0])
        } else {
            this.selected = this.selected.filter(selectedId => {
                return change[0] != selectedId;
            })
        }
    }

    getUncomplete() {
        this.tasks.getUncomplete()
        .then(taskList => {
            this.taskList = taskList;
        })
    }

    deleteSelected() {
        this.tasks.delete(this.selected)
            .then(_ => {
                this.selected = [];
                this.getUncomplete()
            })
    }
}