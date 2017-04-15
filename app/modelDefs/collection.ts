import { Storeable } from '../models';
import Ned = require('nedb');
export class Collection<T extends Storeable> {
    private store: Ned;
    constructor(name: string) {
        this.store = new Ned({filename: name, autoload: true});
    }

    insert(...value: T[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.store.insert(value, (err, docs: T[]) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    find(query: any): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.store.find(query, (err, docs: T[]) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    update(updated: T): Promise<any> {
        return new Promise((resolve, reject) => {
            var query = {_id: updated._id};
            this.store.update(query, updated, (err) => {
                if (err) return reject(err);
                resolve();
            })
        })
    }

    remove(...value: T[]): Promise<any> {
        return this.removeBulk(value);
    }

    removeBulk(values: T[]): Promise<any> {
        var query = {_id: { $in: values.map(value => {
            return value._id;
        })}}
        return new Promise((resolve, reject) => {
            this.store.remove(query, {multi: true}, (err, num) => {
                if (err) return reject(err);
                resolve()
            })
        })
    }
}