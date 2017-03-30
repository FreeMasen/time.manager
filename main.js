const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner');
const debug = require('debug')('main');
var Database = require('./src/dataBase.js');
const db = new Database('time.manager', [
                            'menu'
                          ])

const getMenu = require('./src/menuItems.js');
const getTray = require('./src/windows/trayWindow');
const getTasks = require('./src/windows/taskWindow.js');
let menu;

global.dir = app.getAppPath();

let taskWindow;
let trayWindow;
let settingsWindow;

app.on('ready', () => {
  db.menu.find({}, (err, docs) => {
    require('util').inspect(docs);
    Menu.setApplicationMenu(Menu.buildFromTemplate(docs));
    taskWindow = getTasks();

    taskWindow.on('closed', _ => {
      taskWindow = null;
    })
    taskWindow.on('ready-to-show', _ => {
      taskWindow.show();
    })
  })
});

app.on('activate', () => {
  if (taskWindow === null) {
    taskWindow = getTasks();
  }
})

app.on('window-all-closed', _ => {
  app.quit();
})