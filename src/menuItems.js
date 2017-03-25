const { Menu } = require('electron');
const db = require('./dataBase.js');

var menuList;

function getMenu(cb) {
    db.menu.find({}, (err, docs) => {
        if (err) throw err;
        cb(docs);
    })
}

module.exports = getMenu;

// /Users/RFM/Documents/Projects/time.manager/src/dataBase.js