import { Injectable } from '@angular/core';

import { Task } from '../models';
import { Mocks } from './mocks';
declare var electron: any;

@Injectable()
export class Tasks {

    mocks: Task[];

    constructor() {
        this.mocks = Mocks();
    }

    getUncomplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            resolve(this.mocks);
        })
    }

    getWithId(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.mocks.forEach(mock => {
                if (mock._id = id) return resolve(mock);
                
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