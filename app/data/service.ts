import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection} from '../models';
import { Seed } from './seed';

@Injectable()
export class Data {
    tasks = new Collection<Task>('./app/data/tasks.db');
    categories = new Collection<Category>('./app/data/categories.db');
    clients = new Collection('./app/data/clients.db');

    seed() {
        var seed = new Seed();
        this.tasks.insertBulk(seed.tasks());
        this.categories.insertBulk(seed.categories());
        this.clients.insertBulk(seed.clients());
    }
}