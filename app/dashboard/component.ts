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
    pendingTask?: Task = null;
    selectedFilter: number = 0;

    ngOnInit():void {
        this.getTasks(this.selectedFilter);
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

    getTasks(value: number) {
        this.taskList = [];
        var property: string = '';
        switch (value) {
            case 0:
                property = 'getUncomplete';
            break;
            case 1:
                property = 'getComplete';
            break;
            default:
                property = 'getAll'
        }
        this.tasks[property]()
            .then(tasks => {
                this.taskList = tasks;
            })
            .catch(err => {
                console.error(`error with ${property}`, err);
            })
    }

    deleteSelected() {
        this.tasks.delete(this.selected)
            .then(_ => {
                this.selected = [];
                this.getTasks(this.selectedFilter);
            })
    }

    createdNewTask(): void {
        this.pendingTask = new Task();
    }

    saveTask(): void {
        this.tasks.save(this.pendingTask)
            .then(task => {
                this.taskList.unshift(task);
            });
        this.pendingTask = null;
    }
}