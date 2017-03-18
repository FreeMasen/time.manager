const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner')

const Database = require('./src/dataBase.js');
const db = new Database('time.manager', ['menu']);

let win;
let icon;
let positioner;

let blurring = false;

function createWindow (menuTemplate) {
  win = new BrowserWindow({width: 300, height: 400, show: false});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  });

  var menu = Menu.buildFromTemplate(menuTemplate);
  if (!icon) {
    icon = new Tray(__dirname + '/assets/img/icon.png')
    if (!positioner) {
      positioner = new Positioner(win);
    }
    if (process.platform == 'win') {
      positioner.move('trayBottomRight', icon.getBounds());
    } else {
      positioner.move('trayCenter', icon.getBounds());
    }
    Menu.setApplicationMenu(menu);
    icon.on('click', _ => {
      if (!blurring) {
        toggleWindow();
      }
    })
  }


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

app.on('ready', () => {
  db.menu.find({}, (err, docs) => {
    if (err) console.log(err);
    createWindow(docs);
  })
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})