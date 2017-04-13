const Collection = require('./collection.js')
const FunctionSerializer = require('./functionSerializer.js');
const debug = require('debug')('data.database');

class Database {
    constructor(name, colNames) {
        debug('init')
        this.collections = [];
        debug('pushing list of collections');
        colNames.forEach(col => {
            this[col] = new Collection(`assets/data/${name}.${col}.db`);
        });
        debug(`complting init with ${Object.keys(this).length}`);
    }
}

module.exports = Database;