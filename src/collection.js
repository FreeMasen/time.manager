const Ned = require('nedb');
const FunctionSerializer = require('./functionSerializer');

class Collection {
    constructor(filename) {
        this.store = new Ned({filename: filename, autoload: true })
    }

    insert(obj, cb) {
        obj = this._serializeAnyFuncs(obj);       
        this.store.insert(obj, (err, doc) => {
            if (err) return (err);
            cb(null, doc);
        });
    }

    _serializeAnyFuncs(obj) {
        var ret;
        if (Array.isArray(obj)) {
            ret = [];
            obj.forEach((element, i) => {
                ret[i] = this._serializeAnyFuncs(element);
            })
            return ret;
        }
        if (obj instanceof Date) {
            return obj;
        }
        if (typeof obj == 'object') {
            ret = {}
            for (var k in obj) {
                //if the _id property of an object is -1 I want to treat it
                //as undefined to have the DB provide an id
                if (k == '_id' && obj[k] == -1) continue
                ret[k] = this._serializeAnyFuncs(obj[k]);
            }
            return ret;
        } 
        if (typeof obj == 'function') {
            return FunctionSerializer.serialize(obj);
        }
        return obj;
    }

    find(query, cb) {
        this.store.find(query, (err, docs) => {
            if (err) return cb(err);
            var results = this._deserializeAnyFuncs(docs);
            cb(null, results);
        })
    }

    findOne(query, cb) {
        this.find(query, (err, docs) => {
            if (err) return cb(err);
            if (docs && docs.length > 0) return cb(null, docs[0]);
            (null, null);
        })
    }

    _deserializeAnyFuncs(obj) {
        if (obj instanceof Date) {
            return obj
        }
        if (Array.isArray(obj)) {
            var ret = [];
            obj.forEach((element, i) => {
                ret[i] = this._deserializeAnyFuncs(element);
            })
            return ret;
        }
        if (typeof obj == 'object') {
            if (obj.isFunc) {
                var func = FunctionSerializer.deserialize(obj);
                return func;
            }
            var ret = {};
            for (var k in obj) {
                ret[k] = this._deserializeAnyFuncs(obj[k]);
            }
            return ret
        }
        return obj
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