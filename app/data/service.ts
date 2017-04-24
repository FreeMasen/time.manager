import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection, Work} from '../models';
import { Seed } from './seed';

@Injectable()
export class Data {
    tasks = new Collection<Task>('./app/data/tasks.db');
    categories = new Collection<Category>('./app/data/categories.db');
    clients = new Collection<Client>('./app/data/clients.db');
    work = new Collection<Work>('./app/data/work.db');

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
                                        tasks.forEach(task => {
                                            var w = seed.work(task._id);
                                            w.forEach(wrk => {
                                                work.push(wrk);
                                            });
                                        });
                                        console.warn('SEEDING WORK');
                                        this.work.insertBulk(work)
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