const Ned = require('nedb');
const FunctionSerializer = require('./functionSerializer');
const debug = require('debug')('data.collection')

class Collection {
    constructor(filename) {
        debug('collection init')
        this.store = new Ned({filename: filename, autoload: true })
    }

    insert(obj, cb) {
        debug('colletion insert')
        debug('begining serialization');
        this._serializeAnyFuncs(obj);
        debug('serialization complete');
        debug('inserting into ned store');
        this.store.insert(obj, (err, doc) => {
            debug('ned store cb');
            if (err) return (err);
            debug('no error in cb');
            cb(null, doc);
        });
    }

    _serializeAnyFuncs(obj) {
        debug('_serializeAnyFuncs')
        if (!Array.isArray(obj)) return this._serialize(obj);
        debug('not array')
        return obj.map(o => {
            return this._serialize(o);
        })
    }

    _serialize(obj) {
        for (var k in obj) {
            debug(k);
            debug(typeof obj[k])
            if (typeof obj[k] == 'function') {
                obj[k] = FunctionSerializer.serialize(obj[k]);
            }
        }
        return obj;
    }

    find(query, cb) {
        debug('collection find');
        this.store.find(query, (err, docs) => {
            debug('ned store find cb');
            if (err) return cb(err);
            debug('no error in ned store find cb, deserializing');
            debug(docs.length)
            docs = docs.map(doc => {
                for (var k in doc) {
                    if (typeof doc[k] == 'object' && doc[k].name && doc[k].body && doc[k].args) {
                        debug('found func');
                        debug(doc[k]);
                        doc[k] = FunctionSerializer.deserialize(doc[k]);
                        debug(doc[k])
                    }
                }
                return doc;
            })
            debug('deserializing complete, sending docs')
            cb(null, docs);
        })
    }

    findOne(query, cb) {
        debug('collection findOne');
        this.find(query, (err, docs) => {
            if (err) return cb(err);
            if (docs && docs.length > 0) return cb(null, docs[0]);
            (null, null);
        })
    }

    update(query, update, cb) {
        for (var k in update) {
            if (typeof update[k] == 'function') {
                try {
                    update[k] = FunctionSerializer.serialize(update[k]);
                } catch (e) {
                    return cb(e);
                }
            }
        }
        var opts = {
            multi: true,
            upsert: true,
            returnUpdatedDocs: true
        }
        this.store.update(query, update
                        , opts, (err, num
                        , docs , upsert) => {
            if (err) return cb(err);
            cb(null, num, docs, upsert);
        })
    }

    delete(query, cb) {
        this.remove(query, {multi: true}
                    , (err, num) => {
            if (err) return cb(err);
            cb(null, num)
        })
    }
}

module.exports = Collection;