import { Injectable } from '@angular/core';

import { Task } from '../models/task';
import { Mocks } from './mocks';
declare var electron: any;

@Injectable()
export class Tasks {

    getUncomplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            resolve(Mocks);
        })
    }

    getWithId(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            Mocks.forEach(mock => {
                if (mock._id = id) return resolve(mock);
                
            })
            reject(new Error('No task found for ID'));
        })
    }
}