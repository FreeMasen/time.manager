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
                console.log(docs);
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    getWithId(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.mocks.forEach(mock => {
                if (mock._id == id) return resolve(mock);
                
            })
            reject(new Error('No task found for ID'));
        })
    }

    delete(listOfIds: string[]) {
        return new Promise((resolve, reject) => {
            this.mocks = this.mocks.filter(mock => {
                return !listOfIds.includes(mock._id);
            })
            resolve()
        })

    }
}