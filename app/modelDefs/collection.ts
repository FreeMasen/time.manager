import { Storeable } from '../models';
import Ned = require('nedb');
export class Collection<T extends Storeable> {
    private store: Ned;
    private activityListener
    constructor(name: string, activityListener?: (msg: any) => void) {
        this.store = new Ned({filename: name, autoload: true});
        this.activityListener = activityListener || function(){};
    }

    insert(...value: T[]): Promise<T[]> {
        this.activityListener('insert')
        this.activityListener(value);
        return this.insertBulk(value);
    }

    insertBulk(value: T[]): Promise<T[]> {
        this.activityListener('insertBulk')
        this.activityListener(value);
        return new Promise((resolve, reject) => {
            this.store.insert(value, (err, docs: T[]) => {
                this.activityListener(err)
                this.activityListener(docs);
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    find(query: any): Promise<T[]> {
        this.activityListener('find')
        this.activityListener(query);
        return new Promise((resolve, reject) => {
            this.store.find(query, (err, docs: T[]) => {
                if (err) return reject(err);
                resolve(docs);
            })
        })
    }

    update(query, updated, options): Promise<number> {
        this.activityListener('update')
        this.activityListener(query)
        this.activityListener(updated)
        this.activityListener(options)
        return new Promise((resolve, reject) => {
            this.store.update(query, updated, options, (err, num) => {
                
                if (err) return reject(err);
                resolve(num);
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