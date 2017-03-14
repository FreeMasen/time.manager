const fs = require('fs');
const { EventEmitter } = require('events');

function File() {
    this.name = getFileName();
    this.path = process.env.HomePath + '/Documents/Time Manager/' + this.name;
    this.list = this.readIn();
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('update', _ => {
        var json;
        try {
            json = JSON.stringify(this.list);
        } catch (_) {
            throw new Error('Unable to stringify JSON');
        }
        if (json) {
            fs.writeFileSync(json);
        }
    })
}

File.prototype.readIn = function() {
    var text = fs.readFileSync(this.path);
    this.list = JSON.parse(text.trim());
}

File.prototype.save = function() {
    fs.writeFileSync(this.path, JSON.stringify(this.list));
}

File.prototype.add = function(item) {
    this.list.add(this);
    this.eventEmitter.emit('update')
}

File.prototype.find = function(id) {
    this.list.forEach(item => {
        if (item.id == id) return item
    })
}

File.prototype.update = function(id, update) {
    var element = this.find(id);
    if (!element) return false;
    for (var k in update) {
        element[k] = update[k];
    }
    this.eventEmitter.emit('update')
    return true;
}


function getFileName() {
    var dt = new Date()
    return `${dt.getFullYear}.${twoDigits(dt.getMonth)}.${twoDigits(dt.getDate)}.Time.Manager.json`
}

function twoDigits(number) {
    if (number < 10) {
        return `0${number}`
    }
    return `${number}`
}


module.exports = File;