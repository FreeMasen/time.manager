const Ned = require('nedb');
const FunctionSerializer = require('./functionSerializer');
const Debug = require('debug');
const debug = Debug('data.collection');

class Collection {
    constructor(filename) {
        debug('collection init')
        this.store = new Ned({filename: filename, autoload: true })
    }

    insert(obj, cb) {
        debug('colletion insert')
        debug('begining serialization');
        obj = this._serializeAnyFuncs(obj);
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
        var ret = {}
        for (var k in obj) {
            var prop = obj[k]
            debug(k);
            debug(typeof prop)
            if (typeof prop == 'function') {
                debug('found function')
                debug(prop);
                ret[k] = FunctionSerializer.serialize(prop);
                debug(ret[k])
            } else if (typeof prop == 'object') {
                debug('found object, recursing')
                ret[k] = this._serializeAnyFuncs(prop);
            } else {
                debug('setting standard');
                ret[k] = prop;
            }
        }
        debug('complete returning')
        return ret;
    }

    find(query, cb) {
        debug('collection find');
        this.store.find(query, (err, docs) => {
            debug('ned store find cb');
            if (err) return cb(err);
            debug('no error in ned store find cb, deserializing');
            debug(docs.length)
            var results = this._deserializeAnyFuncs(docs);
            debug('deserializing complete, sending docs')
            cb(null, results);
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

    _deserializeAnyFuncs(obj) {
        debug('_serializeAnyFuncs')
        if (!Array.isArray(obj)) return this._deserialize(obj);
            debug('not array')
            return obj.map(o => {
                return this._deserialize(o);
        })
    }

    _deserialize(obj) {
        var ret = {}
        for (var k in obj) {
            var prop = obj[k]
            debug(k);
            debug(typeof prop)
            if (typeof prop == 'object') {
                if (prop.isFunc) {
                    ret[k] = FunctionSerializer.deserialize(prop, ret);
                } else {
                    debug('found object recursing');
                    ret[k] = this._deserializeAnyFuncs(prop);
                }
            } else {
                ret[k] = prop;
            }
        }
        return ret;
    }

    update(query, update, cb) {
        update = this._serializeAnyFuncs(update);
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
        this.store.remove(query, {multi: true}
                    , (err, num) => {
            if (err) return cb(err);
            cb(null, num)
        })
    }
}

module.exports = Collection;