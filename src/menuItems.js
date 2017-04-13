const { Menu } = require('electron');
const db = require('./database.js');

var menuList;

function getMenu(cb) {
    db.menu.find({}, (err, docs) => {
        if (err) throw err;
        console.log(docs);
        cb(docs);
    })
}

module.exports = getMenu;