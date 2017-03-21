import { Component } from '@angular/core';
import { Task } from '../models';

@Component({
    selector: '<task-list-item>',
    inputs: ['task'],
    templateUrl: 'app/taskListItem/template.html',
    styleUrls: ['app/taskListItem/style.css']
})
export class TaskListItem {
    task: Task;
    constructor(){}
}