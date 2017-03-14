const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner')

const db = require('./src/data');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let icon;
let positioner;

let blurring = false;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 300, height: 400, show: false});

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  // var menu = Menu.buildFromTemplate()
    if (!icon) {
      icon = new Tray(__dirname + '/assets/img/icon.png')
      icon.on('click', _ => {
        if (!blurring) {
          toggleWindow();
        }
      })
      
    }
    if (!positioner) {
      positioner = new Positioner(win);

    }
    positioner.move('trayBottomRight', icon.getBounds());

    win.on('blur', e => {
      blurring = true;
      win.hide()
      setTimeout(_ => {blurring = false;}, 500);
    })

    function toggleWindow() {
      console.log('toggleWindow')
      if (win.isVisible()) {
        return win.hide();
      }
      win.show();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})