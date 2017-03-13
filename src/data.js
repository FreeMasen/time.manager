const fs = require('fs');

function File() {
    this.name = 
    this.path = process.env.HomePath + '/Documents/Time Manager/' + this.name
    this.list = this.readIn()
}

File.prototype.readIn = function() {
    var text = fs.readFileSync(this.path);
    this.list = JSON.parse(text.trim())
}

File.prototype.save = function() {
    fs.writeFileSync(this.path, JSON.stringify(this.list));
}

function getFileName {
    var dt = new Date()
    return `${dt.getFullYear}.${twoDigits(dt.getMonth)}.${twoDigits(dt.getDate)}.Time.Manager.json`
}

function twoDigits(number) {
    if (number < 10) {
        return `0${number}`
    }
    return `${number}`
}
