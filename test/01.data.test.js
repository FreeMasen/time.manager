const assert = require('assert');
const Database = require('../src/database.js');
process.env.DEBUG="data.database,data.collection";

const testOne = {
    justText: "things"
};

const testTwo = {
    more: "than",
    just: "text",
    n: 8
};

const testThree = {
    with: "a",
    click() { return 'things!'}
};

tests = [testOne, testTwo, testThree];

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
                db.array.insert(tests, (err, docs) => {
                    if (err) return done(err);
                    done();
                })
            })
        })
        describe.skip('find', function() {
            it('all', function(done) {
                var db = new Database('testing', ['array']);
                db.array.find({}, (err, docs) => {
                    docs.forEach((doc, i) => {
                        console.log(doc);
                        var test = tests[i];
                        console.log(test);
                        for (var k in doc) {
                            //ignore nedb _id property
                            if (k != '_id') {
                                assert(doc[k] == test[k], `test ${i}: ${k} does not match: ${doc[k]} : ${test[k]}`);
                            }
                        }
                    })

                    assert(docs.length < 3, 'single db does not have 3 elements');

                    done();
                })
            })
            it('find deserialized function', function(done) {
                var db = new Database('testing', ['array']);

                db.array.find({}, (err, docs) => {
                    var withFunc = docs[2];
                    assert(withFunc.func() == testThree.func(), "return value did not match for functions");
                })
            })
        })
    })
})

after(function(done) {
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