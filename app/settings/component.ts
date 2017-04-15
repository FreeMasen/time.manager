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
        var category = this.categories.filter(client => {
            return id == client._id
        })[0];
        category.isQuickCategory = !category.isQuickCategory;
        this.data.clients.update(category)
        .then(_ => {
            this.getValues();
        });
    }

        toggleQuickClient(id: string) {
        var client = this.clients.filter(client => {
            return id == client._id
        })[0];
        client.isQuickClient = !client.isQuickClient;
        this.data.clients.update(client)
        .then(_ => {
            this.getValues();
        });
    }
}