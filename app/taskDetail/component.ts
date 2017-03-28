import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

    _pendingWorkDate?: Date;
    pendingWorkDuration?: number;
    pendingNote?: string;

    constructor(private route: ActivatedRoute,
                private tasks: Tasks,
                private router: Router) {}

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

    deleteSelected(element: string) {
        if (element == 'work') {
            this.task.work = this.task.work.filter((item, i) => {
                return !this.selectedWork.includes(i);
            })
            this.selectedWork = [];
        } else if (element == 'notes') {
            this.task.notes = this.task.notes.filter((item, i) => {
                return !this.selectedNotes.includes(i);
            })
            this.selectedNotes = [];
        }
    }

    addNote() {
        this.pendingNote = ''
    }

    finalizeNote() {
        this.task.notes.push(this.pendingNote);
        this.pendingNote = null;
    }

    addWork() {
        this._pendingWorkDate = new Date();
        this.pendingWorkDuration = 0;
    }

    get pendingWorkDate(): string {
        if (!this._pendingWorkDate) return "";
        var year = this._pendingWorkDate.getFullYear();
        var month = this._pendingWorkDate.getMonth() + 1;
        var day = this._pendingWorkDate.getDate();
        var hour = this._pendingWorkDate.getHours();
        var minutes = this._pendingWorkDate.getMinutes();
        if (this._pendingWorkDate) {
            var ret = `${year}-${this.twoDigitString(month)}-${this.twoDigitString(day)}T${this.twoDigitString(hour)}:${this.twoDigitString(minutes)}`
            return ret;
        }
        return '';
    }

    set pendingWorkDate(newVal: string) {
        var dateParts = newVal.replace('T', '-').split('-')
        var year = Number.parseInt(dateParts[0]);
        var month = Number.parseInt(dateParts[1]);
        var day = Number.parseInt(dateParts[2]);
        var timeParts = dateParts[3].split(':');
        var hour = Number.parseInt(timeParts[0]);
        var minute = Number.parseInt(timeParts[1]);
        this._pendingWorkDate = new Date(year, month - 1, day, hour, minute);
    }

    finalizeWork() {
        this.task.work.push(new Work(null, this._pendingWorkDate, this.pendingWorkDuration));
        this.pendingWorkDate = null;
        this.pendingWorkDuration = null;
    }

    clearWork() {
        this._pendingWorkDate = null;
        this.pendingWorkDuration = null;
    }

    clearNote() {
        this.pendingNote = null;
    }

    private twoDigitString = function(num: number): string {
        if (num < 10) {
            return '0' +  num;
        }
        return num.toString();
    }

    deleteSelf() {
        this.tasks.delete([this.task._id])
            .then(_ => {
                this.router.navigate(['dashboard']);
            })
    }
}