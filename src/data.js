const Ned = require('nedb');
const FunctionSerializer = require('./functionSerializer');

const work = new Ned({
    filename: `assets/data/time.manager.work.db`,
    timestampData: true,
    autoLoad: true
});

const menu = new Ned({
    filename: `assets/data/time.manager.menu.db`,
    autoLoad: true
})

db = {
    work: work,
    menu: menu
}

module.exports = db;

class Database {
    constructor(name, collections) {
        this.collections = [];
        collections.forEach(col => {
           this.collections.push(new collection(`assets/data/${name}, ${col}.db`));
        });
    }
}

class Collection {
    constructor(filename) {
        this.store = new Ned({filename: filename, autoLoad: true})
    }

    add(obj, cb) {
        for (var k in obj) {
            if (typeof obj[k] == 'function') {
                this.obj[k] = FunctionSerializer.serialize(obj[k]);
            }
        }
        this.store.insert(obj, (err, doc) => {
            if (err) return (err);
            cb(null);
        });
    }

    find(query, cb) {
        this.store.find(query, (err, docs) => {
            if (err) return cb(err);
            docs.forEach(doc => {
                for (var k in doc) {
                    if (typeof doc[k] == 'object' && doc[k].name && doc[k].body && doc[k].args) {
                        doc[k] = FunctionSerializer.deserialize(doc[k]);
                    }
                }
            })
            cb(null, docs);
        })
    }

    findOne(query, cb) {
        this.find(query, (err, docs) => {
            if (err) return cb(err);
            if (docs && docs.length > 0) return cb(null, docs[0]);
            (null, null);
        })
    }

    //TODO: update, insert, delete
}