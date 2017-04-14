import { Injectable } from '@angular/core';

import Ned = require('nedb');

@Injectable()
export class Data {
    tasks: Ned = new Ned({filename: `./app/data/tasks.db`, autoload: true}); 
    categories: Ned = new Ned({filename: './app/data/categories.db', autoload: true});
    clients: Ned = new Ned({filename: './app/data/tasks.db', autoload: true});
}