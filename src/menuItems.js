const { Menu } = require('electron');
const db = require('./dataBase.js');

var menuList;

function getMenu(cb) {
    db.menu.find({}, (err, docs) => {
        if (err) throw err;
        console.log(docs);
        cb(docs);
    })
}

module.exports = getMenu;