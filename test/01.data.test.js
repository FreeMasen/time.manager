const assert = require('assert');
const Database = require('../src/dataBase.js');

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

tests = {};
tests[testOne._id] = testOne;
tests[testTwo._id] = testTwo;
tests[testThree._id] = testThree;



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
                var testsArray = [testOne, testTwo, testThree];
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
                        for (var k in doc) {
                            if (typeof doc[k] == 'function') {
                                assert(doc[k].isEqual(test[k]), `test ${doc._id}: ${k} does not match: ${doc[k]} : ${JSON.stringify(test[k])}`)
                            }
                            else {
                                assert(doc[k] == test[k], `test ${doc._id}: ${k} does not match: ${JSON.stringify(doc[k])} : ${JSON.stringify(test[k])}`);
                            }
                        }
                    })
                    assert(docs.length == 3, `array db does not have 3 elements: ${docs.length}`);
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
                    assert(num == 3, `elements deleted is not 3: ${num}`);
                    done();
                })
            })
        })
    })
})

before(function(done) {
    var fs = require('fs');
    var dataPath = __dirname + '/../assets/data/';
    fs.readdir(dataPath, (err, files) => {
        if (err) return done(err);
        files.forEach(file => {
            if (file.includes('testing')) {
                fs.unlinkSync(dataPath + file);
            }
        })
        done();
    })
})

Function.prototype.isEqual = function(func) {
    return this.length == func.length &&
            this() == this()
}