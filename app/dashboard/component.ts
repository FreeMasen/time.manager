import { Component, OnInit, Input} from '@angular/core';
import {trigger, state, style, 
            transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { Task } from '../models';
import { Tasks, Data } from '../services';

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
    tasks: Task[] = [];
    selected: string[] = []
    
    constructor(private router: Router,
                private data: Data) {}

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
        console.log(`getTasks(${value})`)
        var query;
        switch (value) {
            case 0:
                query = { isComplete: false };
            break;
            case 1:
                query = { isComplete: true };
            break;
            default:
                query = {};
        }
        console.log(`about to search with`)
        console.log(query)
        this.data.tasks.find(query, (err, docs: Task[]) => {
            console.log(query)
            console.log(docs);
            if (err) return console.error('error with query', query, err);
            this.tasks = docs;
        })
    }

    deleteSelected() {
        this.data.tasks.remove(this.selected, (err, num) => {
            if (err) return console.error('error in remove',err, this.selected)
        })
    }

    createdNewTask(): void {
        this.pendingTask = new Task();
    }

    saveTask(): void {
        this.data.tasks.insert(this.pendingTask, (err) => {
            if (err) return console.error('error in save', err, this.pendingTask);
            this.getTasks(this.selectedFilter);
            this.pendingTask = null;
        })
    }
}