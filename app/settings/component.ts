import { Component, OnInit } from '@angular/core'

import { Data } from '../services';
import { Client, Category } from '../models';
import { Storeable } from '../interfaces';

@Component({
    selector: '<settings>',
    templateUrl:'./template.html',
    styleUrls: ['./style.css']
})
export class Settings implements OnInit {
    clients: Client[] = [];
    categories: Category[] = [];
    clientsSelected: Client[] = [];
    categoriesSelected: Category[] = [];
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

    toggleClientSelection(client: Client): void {
        var i = this.clientsSelected.indexOf(client);
        if (i > -1) {
            this.clientsSelected.splice(i, 1);
        } else {
            this.clientsSelected.push(client)
        }
    }

    toggleCatSelection(cat: Category): void {
        var i = this.categoriesSelected.indexOf(cat);
        if (i > -1) {
            this.categoriesSelected.splice(i, 1);
        } else {
            this.categoriesSelected.push(cat);
        }
    }

    deleteSelected(listName: string): void {
        this[listName] = this[listName].filter(element => {
            return this[`${listName}Selected`].indexOf(element) > -1
        });
        this[`${listName}Selected`] = [];
    }
}