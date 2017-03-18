const Database = require('../../src/dataBase.js');
const db = new Database('time.manager', ['menu', 'work']);
const { MenuItem } = require('electron');

var menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click (item, focusedWindow) {
                    focusedWindow.loadUrl(__dirname + '/index.html');
                }
            },
            {
                role: 'close'
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
        ]
    },
    {
        label: 'View',
        submenu: [
        ]
    }
]

db.menu.insert(menuTemplate, (err, doc) => {
    if (err) return console.log('Menu Seed Error: ', err);
    if (doc) console.log(doc)
})

