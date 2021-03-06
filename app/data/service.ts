import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection, Work} from '../models';
import { Seed } from './seed';


@Injectable()
export class Data {
    tasks = new Collection<Task>('tasks.db');
    categories = new Collection<Category>('categories.db');
    clients = new Collection<Client>('clients.db');
    work = new Collection<Work>('work.db');

    seed() {
        console.warn('SEEDING DATA STORE FILES')
        var seed = new Seed();
        var tasks = seed.tasks();
        var work: Work[] = [];
        
        console.warn('SEEDING TASKS');
        this.tasks.insertBulk(tasks)
            .then(_ => {
                console.warn('SEEDING CATEGORIES');
                this.categories.insertBulk(seed.categories())
                    .then(_ => {
                        console.warn('SEEDING CLIENTS');
                        this.clients.insertBulk(seed.clients())
                            .then(_ => {
                                this.tasks.find({})
                                    .then(tasks => {
                                        console.warn('SEEDING WORK');
                                            var w = seed.work(tasks);
                                        this.work.insertBulk(w)
                                            .then(_ => {
                                                console.warn('SEEDING COMPLETE')
                                            })
                                    });
                            });
                    });
            });
    }

    listenToTasks(msg: any) {
        console.log(`Tasks: ${JSON.stringify(msg)}`);
    }

    listenToCategories(msg: any) {
        console.log(`Categories: ${JSON.stringify(msg)}`);
    }

    listenToClients(msg: any) {
        console.log(`Clients: ${JSON.stringify(msg)}`);
    }
}