import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../models/task';
import { Tasks } from '../tasks/service';
@Component({
    selector: '<taskDetail>',
    templateUrl: 'app/taskDetail/template.html',
    styleUrls: ['app/taskDetail/style.css']
})
export class TaskDetail implements OnInit {
    task: Task;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private tasks: Tasks) {}
    ngOnInit(): void {
        this.route.params.forEach(param => {
            if (param["id"]) {
                var id = param['id'];
                this.tasks.getWithId(id)
                    .then(task => {
                        this.task = task;
                    })
            }
            
        })
    }

    back() {
        this.location.back();
    }
}