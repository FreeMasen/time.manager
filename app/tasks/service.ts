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
}