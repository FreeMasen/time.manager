import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection} from '../models';
import { Seed } from './seed';

@Injectable()
export class Data {
    tasks = new Collection<Task>('./app/data/tasks.db');
    categories = new Collection<Category>('./app/data/categories.db');
    clients = new Collection<Client>('./app/data/clients.db');

    seed() {
        console.error('SEEDING DATA STORE FILES')
        var seed = new Seed();
        console.error('SEEDING TASKS')
        this.tasks.insertBulk(seed.tasks());
        console.error('SEEDING CATEGORIES');
        this.categories.insertBulk(seed.categories());
        console.error('SEEDING CLIENTS');
        this.clients.insertBulk(seed.clients());
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