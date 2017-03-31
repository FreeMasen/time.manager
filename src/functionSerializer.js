const debug = require('debug')('FunctionSerializer');

class FunctionSerializer {
    constructor() {}

    serialize(func) {
        var ret = {};
        var text = func.toString();
        ret.args = this._getArgs(text);
        ret.body = this._getBody(text);
        ret.isFunc = true;
        return ret;
    }

    _getArgs(text) {
        var argsStart = text.indexOf('(') + 1;
        var argsEnd = text.indexOf(')');
        var argsString = text.substring(argsStart, argsEnd);
        return argsString.split(',').filter(arg => { return arg.length > 0});
    }

    _getBody(text) {
        var bodyStart = text.indexOf('{') + 1;
        var bodyEnd = text.trim().lastIndexOf('}') - 1;
        var rawBody =  text.substring(bodyStart, text.length - 1);
        var lines = rawBody.split('\n');
        lines = lines.map(line => {
            return line.trim();
        })
        return lines.join('\n');
    }

    deserialize(func, parent) {
        var ret = new Function(func.args, func.body);
        ret.bind(parent)
        return ret;
    }
}

const FS = new FunctionSerializer();

module.exports = FS;