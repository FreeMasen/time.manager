import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../models';
import { Data, DateFormatter, Calculator } from '../services';
import { Work } from '../models';

@Component({
    selector: '<taskDetail>',
    templateUrl:'./template.html',
    styleUrls: ['./style.css']
})
export class TaskDetail implements OnInit {
    task: Task;
    get taskCreated(): string {
        return this.dateHandler.format(this.task.created, 'MM/dd/yyyy')
    }

    get taskCompleted(): string {
        if (!this.task.completed) {
            return 'Pending'
        }
        return this.dateHandler.format(this.task.created, 'MM/dd/yyyy hh:mm D');
    }

    selectedNotes: number[] = [];
    selectedWork: number[] = [];

    _pendingWorkDate?: Date;
    pendingWorkDuration?: number;
    pendingNote?: string;

    constructor(private route: ActivatedRoute,
                private data: Data,
                private router: Router,
                private dateHandler: DateFormatter,
                private calculator: Calculator) {}

    ngOnInit(): void {
        this.route.params.forEach(param => {
            if (param["id"]) {
                var id = param['id'];
                this.data.tasks.find({_id: id})
                    .then(task => {
                        this.task = task[0];
                    });
            }
        });
    }

    get totalWork(): string {
        return this.dateHandler.hoursAndMinutes(
            this.calculator.totalMinutesOfWork(this.task)
        )
    }

    getDateString(dt: Date) {
        return this.dateHandler.format(dt, 'M/d/yy h:m D');
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
        this.sendUpdate();
    }

    addNote() {
        this.pendingNote = ''
    }

    finalizeNote() {
        this.task.notes.push(this.pendingNote);
        this.pendingNote = null;
        this.sendUpdate();
    }

    addWork() {
        this._pendingWorkDate = new Date();
        this.pendingWorkDuration = 0;
    }

    get pendingWorkDate(): string {
        if (!this._pendingWorkDate) return "";
        return this.dateHandler.toDateTimeLocal(this._pendingWorkDate);
    }

    set pendingWorkDate(newVal: string) {
        if (!newVal) return;
        this._pendingWorkDate = this.dateHandler.fromDateTimeLocal(newVal);
    }

    finalizeWork() {
        this.task.work.push(new Work(null, this._pendingWorkDate, this.pendingWorkDuration));
        this.pendingWorkDate = null;
        this.pendingWorkDuration = null;
        this.sendUpdate();
    }

    clearWork() {
        this._pendingWorkDate = null;
        this.pendingWorkDuration = null;
    }

    clearNote() {
        this.pendingNote = null;
    }

    deleteSelf() {
        this.data.tasks.remove(this.task)
            .then(_ => {
                this.router.navigate(['dashboard']);
            })
            .catch(err => {
                console.log(err);
            })
    }

    private updating: boolean = false;
    private sendUpdate(): void {
        this.data.tasks.update(this.task)
            .then(_ => {

            })
            .catch(err => {
                console.error(err);
            })
    }
    toggleCompletion() {
        if (this.task.completed) {
            delete this.task.completed
        } else {
            this.task.completed = new Date()
        }
        this.data.tasks.update(this.task)
            .then(_ => {})
            .catch(err => {
                console.error(err);
            })
    }
}