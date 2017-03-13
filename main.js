const {app, BrowserWindow, Menu} = require('electron');

let mainWindow

function createWindow() {
    let window = new BrowserWindow({
        width: 800,
        height: 800
    });
    window.loadURL(__dirname + '/index.html');
    window.webContents.toggleDevTools();
    window.on('closed', _ => {
        window = null
    })
    return window;
}

app.on('ready', _ => {
    mainWindow = createWindow();
})

app.on('window-all-closed', _ => {
    app.quit();
})

app.on('activate', _ => {
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
})

let menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            focusedWindow.loadURL(__dirname + '/index.html')
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)