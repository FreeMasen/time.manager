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

    deleteSelectedClients(): void {
        this.data.clients.removeBulk(this.clientsSelected)
            .then(_ => {
                this.clients = this.clients.filter(element => {
                    return !this.clientsSelected.includes(element);
                });
                this.clientsSelected = [];
            });
    }

    deleteSelectedCategories(): void {
        this.data.categories.removeBulk(this.categoriesSelected)
            .then(_ => {
                this.categories = this.categories.filter(element => {
                    return !this.categoriesSelected.includes(element);
                });
                this.categoriesSelected = [];
            });
    }

    pendingClientName?: string;
    newClient(): void {
        this.pendingClientName = '';
    }

    finalizeClient(): void {
        this.data.clients.insert(new Client(this.pendingClientName))
            .then(docs => { 
                this.clients.push(docs[0]);
                this.pendingClientName = null;
            })
    }

    clearClient(): void {
        this.pendingClientName = null;
    }

    pendingCategoryName?: string;
    newCategory(): void {
        this.pendingCategoryName = '';
    }

    finalizeCategory(): void {
        this.data.categories.insert(new Category(this.pendingCategoryName))
            .then(docs => {
                this.categories.push(docs[0]);
                this.pendingCategoryName = null
            })
    }

    clearCategory(): void {
        this.pendingCategoryName = null;
    }
}