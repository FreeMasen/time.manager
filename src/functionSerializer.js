
class FunctionSerializer {
    constructor() {}

    serialize(func) {
        var ret = {};
        var text = func.toString();
        ret.name = this._getFuncName(text);
        ret.args = this._getArgs(text);
        ret.body = this._getBody(text);
        ret.isFunc = true;
        return ret;
    }

    _getFuncName(text) {
        var nameEnd = text.indexOf('(');
        var nameStart = text.indexOf(' ') + 1;
        return text.substring(nameStart, nameEnd);
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
        return text.substring(bodyStart, text.length - 1);
    }

    deserialize(func, parent) {
            console.log('func:')
            console.log(func)
        var ret = new Function(func.args, func.body);
            console.log('ret:')
            console.log(ret)
        return ret;
    }
}

const FS = new FunctionSerializer();

module.exports = FS;