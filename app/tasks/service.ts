import { Injectable } from '@angular/core';

import { Task } from '../models';

import { Data } from '../services';

@Injectable()
export class Tasks {
    db = new Data('tasks');

    getAll(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.db.store.find({}, (err, docs: Task[]) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    getUncomplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            //find all where isComplete does not exist pr
            //is explicitly false
            this.db.store.find({$or: [{isComplete: {$exists: false}}, 
                                        {isComplete: false}]}, (err, docs: Task[]) => {
                if (err) return reject(err);
                resolve(docs.filter(task => {
                    return !task.isComplete
                }));
            })
        })
    }

    getComplete(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            this.db.store.find({isComplete: true}, (err, docs: Task[]) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    getWithId(id: string): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.db.store.findOne({_id: id}, (err, task: Task) => {
                if (err) return reject(err);
                resolve(task);
            })
        })
    }

    update(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.db.store.update({_id: task._id}, task, (err, num, docs) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    delete(listOfIds: string[]): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.store.remove({_id: { $in: listOfIds}}, (err, num) => {
                if (err) return reject(err);
                resolve(num);
            })
        })
    }

    save(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            this.db.store.insert(task, (err, task: Task)=> {
                if (err) return reject(err);
                resolve(task);
            })
        })
    }
}