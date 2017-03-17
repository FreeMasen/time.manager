const assert = require('assert');
const Database = require('../src/database.js');
process.env.DEBUG="data.database,data.collection";

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
                        console.log(doc);
                        var test = tests[doc._id];
                        console.log(test);
                        for (var k in doc) {
                            assert(doc[k] == test[k], `test ${doc._id}: ${k} does not match: ${doc[k]} : ${JSON.stringify(test[k])}`);
                        }
                    })

                    assert(docs.length < 3, 'array db does not have 3 elements');

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