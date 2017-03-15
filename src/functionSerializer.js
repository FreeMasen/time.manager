
class FunctionSerializer {
    constructor() {}

    serialize(func) {
        var ret = {};
        var text = func.toString();
        ret.name = this._getFuncName(text);
        ret.args = this._getArgs(text);
        ret.body = this._getBody(text);
        return ret;
    }

    _getFuncName(text) {
        var nameEnd = text.indexOf('(');
        return text.substring(0, nameEnd);
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
        return text.substring(bodyStart, bodyEnd).replace('\n', '');
    }

    deserialize(func) {
        return new Function(func.args, func.body);
    }
}

const FS = new FunctionSerializer();

module.exports = FS;