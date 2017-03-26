import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../models';
import { Tasks } from '../tasks/service';
import { Work } from '../models';

@Component({
    selector: '<taskDetail>',
    templateUrl: 'app/taskDetail/template.html',
    styleUrls: ['app/taskDetail/style.css']
})
export class TaskDetail implements OnInit {
    task: Task;

    selectedNotes: number[] = [];
    selectedWork: number[] = [];

    pendingWorkDate?: Date;
    pendingWorkDuration?: number;
    pendingNote?: string;

    constructor(private route: ActivatedRoute,
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

    toggleNote(id: number) {
        this.toggleList(id, 'selectedNotes');
    }

    toggleWork(id: number) {
        this.toggleList(id, 'selectedWork');
    }

    private toggleList(id: number, listName: string) {
        if (this[listName].includes(id)) {
            this[listName] = this[listName].filter(noteId => {
                return noteId != id
            })
        } else {
            this[listName].push(id);
        }
    }

    deleteSelected() {
        this.task.work = this.task.work.filter((item, i) => {
            return !this.selectedWork.includes(i);
        })
        this.task.notes = this.task.notes.filter((item, i) => {
            return !this.selectedNotes.includes(i);
        })
        this.selectedNotes = [];
        this.selectedWork = [];
    }

    addNote() {
        this.pendingNote = ''
    }

    finalizeNote() {
        this.task.notes.push(this.pendingNote);
        this.pendingNote = null;
    }

    addWork() {
        this.pendingWorkDate = new Date();
        this.pendingWorkDuration = 0;
    }

    finalizeWork() {
        this.task.work.push(new Work(null, this.pendingWorkDate, this.pendingWorkDuration));
        this.pendingWorkDate = null;
        this.pendingWorkDuration = null;
    }
}