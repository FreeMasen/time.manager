const Ned = require('nedb');

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
           this.collections.push(new Ned({filename: `assets/data/${name}.${col}.db`,
                                    autoLoad) 
        });
    }
}

class Collection {
    constructor(filename) {
        // this.store = new Ned({filename: filename, autoLoad: true})
        this.strings = []
        filename.forEach(test => {
            for (var k in test) {
                if (typeof test[k] == 'function') {
                    test[k] = this._serialize(test[k], test)
                    console.log(test[k])
                    test[k] = this._deserialize(test[k])
                    console.log(test[k])
                }
            }
            
        })
    }

    add(obj) {
        for (var k in obj) {
            if (typeof obj[k] == 'function') {
                this.obj[k] = JSON.stringify(obj[k])
            }
        }
    }

    _serialize(func, owner) {
        var signature
        var body
        
        return JSON.stringify({ signature: func.toString(), owner: owner})
    }

    _deserialize(str) {
        var parsed = JSON.parse(str);
        return this._createFunction(parsed.func, parsed.owner);
    }

    _createFunction(func, owner) {
        return (new Function(this._createFunctionBody(func, owner))(owner));
    }

    _createFunctionBody(func, owner) {
        return Object.keys(owner).reduceRight(this._addVar, 'return ' + func + ';');
    }

    _addVar(s, k) {
        return 'var ' + k + '= argument[0].' + k + ';\n' + s
    }

}

const testArrat = [{
        label: 'File',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
        focusedWindow.loadUrl(__dirname + '/index.html');
        }
    },{
        label: 'Close Window',
        accelerator: 'CmdOrCtrl+W',
        click(item, focusedWindow) {
            focusedWindow.close();
        }
        },{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click(item, focusedWindow) {
            app.quit();
        }
    }]
    
function t() {
    var c = new Collection(testArrat)
}
t()