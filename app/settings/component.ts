import { Component, OnInit } from '@angular/core'

import { Data } from '../services';
import { Client, Category, Storeable } from '../models';

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
        var sort = {isQuick: -1, name: 1}
        this.data.clients.find({}, sort)
            .then((clients: Client[]) => {
                this.clients = clients;
            })
        this.data.categories.find({}, sort)
            .then((categories: Category[]) => {
                this.categories = categories;
            })
    }

    toggleQuickCategory(element: Category) {
        element.isQuick = !element.isQuick;
        this.toggleQuick(element, 'categories');
    }

    toggleQuickClient(element: Client) {
        element.isQuick = !element.isQuick;
        this.toggleQuick(element, 'clients');
    }

    toggleQuick(element: Storeable, collection: string) {
        this.data[collection].update(element)
        .then(_ => {
            this.getValues();
        });
    }
}