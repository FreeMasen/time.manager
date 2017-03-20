var menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    focusedWindow.loadUrl('/index.html');
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