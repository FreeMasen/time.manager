import { Injectable } from '@angular/core';

import { Task } from '../models';
import { Mocks } from './mocks';


@Injectable()
export class Tasks {

    mocks: Task[];
    db: any

    constructor() {
        this.mocks = Mocks();
    }

    getUncomplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mocks.filter(task => {
                return !task.isComplete;
            }));
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