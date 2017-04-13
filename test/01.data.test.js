const assert = require('assert');
var Database
console.log(process.cwd())
try {
    Database = require('../src/database.js');
} catch(e) {
    Database = require('./src/database.js');
}

const testOne = {
    _id: "0",
    justText: "things"
};

const testTwo = {
    _id: "1",
    more: "than",
    just: "text",
    n: 8
};

const testThree = {
    _id: "2",
    with: "a",
    click() { return 'things!' }
};

const unixEpoch = new Date(1970,0,1,0,0,0,0);
const birthday = new Date(1983,0,31,4,30,0,0);
const ani = new Date(2014, 0,18,11,30,0,0);
const dateArray = [
    unixEpoch,
    birthday,
    ani
]

const testFour = {
    _id: "4",
    sub: {
        i: 'am',
        a: [
            'nested',
            'object'
        ],
        with: function() {
            return 'stuff'
        },
        and: dateArray
    }
}

const testFive = {
    _id: "5",
    sub: {
        sub: {
            sub: {
                data: [
                    'one',
                    'two',
                    'three'
                ]
            }
        }
    }
}

tests = {};
tests[testOne._id] = testOne;
tests[testTwo._id] = testTwo;
tests[testThree._id] = testThree;
tests[testFour._id] = testFour;
tests[testFive._id] = testFive;

describe('Database', function() {
    it('init', function() {
        var db = new Database('testing', ['none']);
    })
    describe('Collection', function() {
        describe('insert', function() {
            it('singleElement', function(done) {
                var db = new Database('testing', ['single']);
                db.single.insert(testOne, (err, doc) => {
                    if (err) return done(err);
                    done();
                })
            })
            it('array', function(done) {
                var db = new Database('testing', ['array']);
                var testsArray = [testOne, testTwo, testThree, testFour, testFive];
                db.array.insert(testsArray, (err, docs) => {
                    if (err) return done(err);
                    done();
                })
            })
        })
        describe('find', function() {
            it('all', function(done) {
                var db = new Database('testing', ['array']);
                db.array.find({}, (err, docs) => {
                    if(err) return done(err)
                    docs.forEach((doc) => {
                        var test = tests[doc._id];
                        assert(equals(doc, test));
                    });
                    assert(docs.length == 5, `array db does not have 5 elements: ${docs.length}`);
                    done();
                })
            })
        })
        describe('findOne', function() {
            it('and only one', function(done) {
                var db = new Database('testing', ['array']);
                db.array.findOne({}, (err, doc) => {
                    if (err) return done(err);
                    assert(doc != undefined, 'doc was undefined');
                    assert(!Array.isArray(doc), 'Doc was not an array')
                    done();
                })
            })
        })
        describe('update', function() {
            it('new values', function(done) {
                var db = new Database('testing', ['array']);
                db.array.update({_id: '2'}, {click: 'stuff'}, (err, doc) => {
                    if (err) return done(err);
                    db.array.find({_id: '2'}, (err, found) => {
                        if (err) return doc(err);
                        assert(doc['click'] == found['click'], 'Updated var does not match');
                        done();
                    })
                })
            })
        })
        describe('delete', function() {
            it('removes single value', function(done) {
                var db = new Database('testing', ['single']);
                db.single.delete({_id: '0'}, (err, num) => {
                    if (err) return done(err);
                    assert(num == 1, `elements deleted is not 1: ${num}`);
                    done();
                })
            })
            it('removes more than one', function(done) {
                var db = new Database('testing', ['array']);
                db.array.delete({}, (err, num) => {
                    if (err) return done(err);
                    assert(num == 5, `elements deleted is not 5: ${num}`);
                    done();
                })
            })
        })
    })
})

after(cleanUp);

before(cleanUp);

function cleanUp(done) {
    var fs = require('fs');
    readFolder(process.cwd(), 0);
    var dataPath = __dirname + '/../assets/data/';
    fs.readdir(dataPath, (err, files) => {
        if (err) return done(err);
        files.forEach(file => {
            if (file.includes('testing')) {
                try {
                    fs.unlinkSync(dataPath + file);
                } catch (e) {}
            }
        })
        done();
    })
}

function readFolder(path, n) {
    var tabs = '';
    if (!n || n === 0) tabs = 0;
    else tabs = '  '.repeat(n);
    var fs = require('fs')
    var files = fs.readdirSync(path)
    for (var i = 0; i < files.length; i++) {
        var file = `${path}/${files[i]}`;
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            if (files[i] == 'node_modules') continue;
            if (files[i] == '.git') continue
            readFolder(file, ++n)
        } else {
            console.log(tabs + file);
        }
    }
}

function equals(lhs, rhs) {
    if (Array.isArray(lhs)) {
        if (!Array.isArray(rhs)) return false;
        if (lhs.length != rhs.length) return false;
        for (var i = 0; i < lhs.length; i++) {
            if (!equals(lhs[i], rhs[i])) return false
        }
        return true
    } else if (typeof lhs == 'function') {
        return this.length == func.length &&
            this() == this();
    } else if (lhs instanceof Date) {
        if (!(rhs instanceof Date)) return false
        return lhs == rhs;
    } else if (typeof lhs == 'object') {
        if (typeof rhs != 'object')
        for (var k in lhs) {
            if (!rhs[k]) return false;
            if (!equals(lhs[k] != rhs[k])) return false
        }
        return true
    } else {
        return lhs == rhs;
    }
}