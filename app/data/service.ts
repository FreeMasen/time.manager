import { Injectable } from '@angular/core';

import Ned = require('nedb');

@Injectable()
export class Data {
    store: Ned;

    constructor(name: string) {
        this.store = new Ned({filename: `./app/data/${name}.db`, autoload: true});
    }
}