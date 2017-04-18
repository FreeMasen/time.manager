import { Component, OnInit } from '@angular/core'

import { Data } from '../services';
import { Client, Category } from '../models';

@Component({
    selector: '<settings>',
    templateUrl:'./template.html',
    styleUrls: ['./style.css']
})
export class Settings implements OnInit {
    clients: Client[] = [];
    categories: Category[] = [];
    constructor(private data: Data) {

    }
    ngOnInit() {
        this.getValues();
    }

    getValues() {
        this.data.clients.find({})
            .then((clients: Client[]) => {
                this.clients = clients;
            })
        this.data.categories.find({})
            .then((categories: Category[]) => {
                this.categories = categories;
            })
    }

    toggleQuickCategory(id: string) {
        this.toggleQuick(id, 'categories');
    }

    toggleQuickClient(id: string) {
        this.toggleQuick(id, 'clients');
    }

    toggleQuick(id: string, collection: string) {
        // var query = {_id: id};
        // var isQuick = false; 
        // isQuick = this[collection].filter(category => { 
        //     return id == category._id
        // })[0].isQuick;
        // var update = {isQuick: isQuick};
        // this.data[collection].update(query, update, {})
        // .then(_ => {
        //     this.getValues();
        // });
    }
}