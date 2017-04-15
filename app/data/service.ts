import { Injectable } from '@angular/core';

import {Task, Category, Client, Collection} from '../models';


@Injectable()
export class Data {
    tasks = new Collection<Task>('./app/data/tasks.db');
    categories = new Collection<Category>('./app/data/categories.db');
    clients = new Collection('./app/data/clients.db');
}