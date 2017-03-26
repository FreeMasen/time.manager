const assert = require('assert');
const FunctionSerializer = require('../src/functionSerializer.js');

describe('FunctionSerializer', function() {
    it('serialize', function() {
        var serializedFuncs = []
        funcs.forEach(func => {
            serializedFuncs.push(FunctionSerializer.serialize(func));
        })
        targetNames = ['firstTest', 'secondTest', 'thirdTest']
        targetLengths = [0,1,3]
        serializedFuncs.forEach((func, i) => {
            assert(func != undefined, `${targetNames[i]} was undefined`)
            assert(typeof func == 'object', `${targetNames[i]} was not an object`);
            assert(typeof func.args == 'object', `${targetNames[i]} args was not an object`);
            assert(Array.isArray(func.args), `${targetNames[i]} args was not an array`);
            assert(func.args.length == targetLengths[i], `${targetNames[i]} args was not ${targetLengths[i]}: ${func.args}`);
            assert(func.body != undefined, `${targetNames[i]}.body was undefind`);
            assert(typeof func.body == 'string', `${targetNames[i]}.body was not a string`);
            assert(func.body.includes('console.log'), `${targetNames[i]} did not include console.log`)
        })
    })
    it('deserialize', function() {
        var serializedFuncs = []
        funcs.forEach(func => {
            serializedFuncs.push(FunctionSerializer.serialize(func));
        })
        var deserializedFuncs = []
        serializedFuncs.forEach(obj => {
            deserializedFuncs.push(FunctionSerializer.deserialize(obj));
        })
        var args = [undefined, 'arg1', ['arg1', 'arg2', 'arg3']]
        deserializedFuncs.forEach((func, i) => {
            assert(func != undefined, `${serializedFuncs[i]} was undefined`);
            assert(typeof func == 'function', `${serializedFuncs[i].name} was not a function`);
            assert(func.length == funcs[i].length, `${serializedFuncs[i].name}'s args.length did not match funcs[${i}]`);
            assert(func.displayName == funcs[i].displayName, `Displayname's did not match`)
        })
    })
})

var funcs = [firstTest, secondTest, thirdTest]

function firstTest() {
    console.log('firstTest');
}

function secondTest(arg1) {
    console.log(arg1);
}

function thirdTest(arg1, arg2, arg3) {
    console.log(`thirdTest: ${arg1}, ${arg2}, ${arg3}`);
    return [arg1, arg2, arg3];
}