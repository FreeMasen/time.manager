import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task, Work } from '../models';
import { Data, DateFormatter, Calculator } from '../services';

@Component({
    selector: '<taskDetail>',
    templateUrl:'./template.html',
    styleUrls: ['./style.css']
})
export class TaskDetail implements OnInit {
    taskId: string;
    task: Task;
    work: Work[];


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
                this.taskId = id;
                this.getTask(id);
            }
        });
    }

    getTask(taskId: string): void {
        this.data.tasks.find({_id: taskId})
            .then(tasks => {
                this.task = tasks[0];
                this.getWork();
            })
    }

    getWork(): void {
        console.log('getWork', this.task._id);
        this.data.work.find({taskId: this.task._id})
            .then(work => {
                console.log(work)
                this.work = work;
            })
    }

    get totalWork(): string {
        return this.dateHandler.hoursAndMinutes(
            this.calculator.totalMinutesOfWork(this.work)
        );
    }

    getDateString(dt: Date) {
        return this.dateHandler.format(dt);
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
            var toBeRemoved = this.work.filter((item, i) => {
                return this.selectedWork.includes(i);
            })
            this.data.work.removeBulk(toBeRemoved)
                .then(_ => {
                    this.selectedWork = [];
                    this.getWork();
                })
        } else if (element == 'notes') {
            this.task.notes = this.task.notes.filter((item, i) => {
                return !this.selectedNotes.includes(i);
            })
            this.data.tasks.update(this.task)
                .then(_ => {
                    this.selectedNotes = [];
                });
        }
        
    }

    addNote() {
        this.pendingNote = ''
    }

    finalizeNote() {
        this.task.notes.push(this.pendingNote);
        this.data.tasks.update(this.task)
            .then(_ => {
                this.clearNote();
            });
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
        var toBeInserted = new Work(this.taskId, this._pendingWorkDate, this.pendingWorkDuration);
        this.data.work.insert(toBeInserted)
            .then(_ => {
                this.getWork();
                this.clearWork();
            })
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
                this.data.work
                    .removeBulk(this.work)
                    .then(_ => {

                    })
                    .catch(err => {
                        console.error(err);
                    });
                this.router.navigate(['dashboard']);
            })
            .catch(err => {
                console.error(err);
            });
    }

    toggleCompletion() {
        if (this.task.completed) {
            delete this.task.completed
        } else {
            this.task.completed = new Date()
        }
        this.data.tasks.update(this.task)
            .then(_ => {
                
            })
            .catch(err => {
                console.error(err);
            })
    }
}