import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection} from '../models';
import { Seed } from './seed';

@Injectable()
export class Data {
    tasks = new Collection<Task>('./app/data/tasks.db', this.listenToCollection);
    categories = new Collection<Category>('./app/data/categories.db');
    clients = new Collection('./app/data/clients.db');

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

    listenToCollection(msg: any) {
        console.log(msg);
    }
}