import { Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';

import { Task, Category, Client } from '../models';
import { Data } from '../services';

@Component({
    selector:'<dashboard>',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class Dashboard implements OnInit {
    tasks: Task[];
    selected: string[];

    categories: Category[] = [];
    clients: Client[] = [];
    
    constructor(private router: Router,
                private data: Data) {
                    this.selected = [];
                    this.selected = [];
                }

    pendingTask?: Task = null;
    selectedFilter: number = 0;

    ngOnInit():void {
        this.getTasks(this.selectedFilter)
        this.data.categories.find({}, {isQuick: -1, name: 1})
            .then(categories => {
                this.categories = categories;
            })
        this.data.clients.find({}, {isQuick: -1, name: 1})
            .then(clients => {
                this.clients = clients;
            })
    }

    getTasks(value: number) {
            var query;
            switch (value) {
                case 0:
                    query = { completed: { $exists: false } };
                break;
                case 1:
                    query = { completed: { $exists: true } };
                break;
                default:
                    query = {};
            }
            this.data.tasks
                .find(query, {created: -1})
                .then(tasks => {
                    this.tasks = tasks;
                })
    }

    toggleSelected(change: [string, boolean]) {
        if (change[1]) {
            this.selected.push(change[0]);
        } else {
            this.selected = this.selected.filter(selectedId => {
                return change[0] != selectedId;
            })
        }
    }

    deleteSelected() {
        var toBeRemoved = this.tasks.filter(task => {
            return this.selected.includes(task._id);
        })
        this.data.tasks.removeBulk(toBeRemoved)
        .then(_ => {
            this.tasks = this.tasks.filter(task => {
                return !this.selected.includes(task._id)
            })
            this.selected = [];
        })
        .catch(err => {

        }) 
    }

    completeSelected() {
        var selectedTasks = this.tasks.filter(task => {
            var ret = this.selected.includes(task._id);
            if (ret) {
                if (!task.completed) {
                    task.completed = new Date();
                } else {
                    delete task.completed
                }
            } 
            return ret;
        })
        this.data.tasks.updateBulk(selectedTasks)
        .then(_ => {
            this.selected = [];
            this.getTasks(this.selectedFilter);
        })
    }

    createdNewTask(): void {
        this.pendingTask = new Task();
    }

    saveTask() {
            this.data.tasks.insert(this.pendingTask)
            .then(_ => {
                this.pendingTask = null;
                this.getTasks(this.selectedFilter);
            })
            .catch(err => {
                
            })
    }

    clearTask() {
        this.pendingTask = null;
    }
}