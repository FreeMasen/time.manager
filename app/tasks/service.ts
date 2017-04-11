import { Injectable } from '@angular/core';

import { Task } from '../models';
import { Mocks } from './mocks';

var Database = require('../../src/database.js');

@Injectable()
export class Tasks {

    mocks: Task[];
    private db: any;

    constructor() {
        this.mocks = Mocks();
        this.db = new Database('time.manager', ['tasks']);
    }

    getUncomplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.db.tasks.find({}, (err, docs: Task[]) => {
                if (err) return reject(err);
                resolve(docs.filter(task => {
                    return !task.isComplete
                }));
            })
        })
    }

    getWithId(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.db.tasks.findOne({_id: id}, (err, task: Task) => {
                if (err) return reject(err);
                resolve(task);
            })
        })
    }

    update(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.db.tasks.update({_id: task._id}, task, (err, num, docs) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    delete(listOfIds: string[]): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.tasks.delete({_id: { $in: listOfIds}}, (err, num) => {
                if (err) return reject(err);
                resolve(num);
            })
        })
    }
}