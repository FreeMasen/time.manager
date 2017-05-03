const { Menu } = require('electron');

var menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, win) {
                    win.webContents.loadURL(win.baseURL);
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

var m = Menu.buildFromTemplate(menuTemplate)

module.exports = m;