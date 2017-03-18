const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner')

const db = require('./src/dataBase.js');

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

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})