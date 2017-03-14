const Ned = require('nedb');

const work = new Ned({
    filename: `${__dirname}/assets/data/time.manager.work.db`,
    timestampData: true,
    autoLoad: true
});

const menu = new Ned({
    filename: `${__dirname}/assets/data/time.manager.menu.db`,
    autoLoad: true
})

db = {
    work: work,
    menu: menu
}

module.exports = db;