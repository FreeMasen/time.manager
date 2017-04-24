import { Storeable } from '../interfaces';
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

    find(query: any, sortDescriptor?: any, projection?: any): Promise<T[]> {
        this.activityListener('find');
        this.activityListener(query);
        return new Promise((resolve, reject) => {
                this.activityListener('finding sorted');
                this.activityListener(sortDescriptor);
                this.store
                    .find(query)
                    .sort(sortDescriptor)
                    .exec((err, docs: T[]) => {
                        if (err) return reject(err);
                        resolve(docs);
                    })
        })
    }

    update(...value: T[]): Promise<number> {
        this.activityListener('update')
        this.activityListener(value);
        return this.updateBulk(value);
    }

    updateBulk(values: T[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this._update(values, err => {
                if (err) return reject(err)
                resolve();
            })
        })
    }

    private _update(values: T[], cb) {
        if (values.length < 1) return cb(null)
        var update = values.pop();
        var q = {_id: update._id};
        delete update._id;
        this.store.update(q, update, {upsert: true}, (err, num) => {
            if (err) return cb(err)
            this._update(values, cb);
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