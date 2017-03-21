const Database = require('../../src/dataBase.js');
const FunctionSerializer = require('../../src/functionSerializer');
const db = new Database('time.manager', ['menu', 'work']);
const { MenuItem } = require('electron');



var menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, win) {  
                    var url = 'file://' + global.dir + '/index.html';
                    win.webContents.loadURL(url);
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
            {
                role: 'undo'
            },
            {
                role: 'redo'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
        ]
    }
]

module.exports = menuTemplate;

db.menu.insert(menuTemplate, (err, doc) => {
    if (err) return console.log('Menu Seed Error: ', err);
    if (doc) console.log(doc)
})

