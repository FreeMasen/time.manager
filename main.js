const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner');
const debug = require('debug')('main');

const menuItems = require('./src/menuItems.js');
const getTray = require('./src/windows/trayWindow');
const getTasks = require('./src/windows/taskWindow.js');
let menu;

let taskWindow;
let trayWindow;
let settingsWindow;

app.on('ready', () => {
  Menu.setApplicationMenu(menuItems);
  taskWindow = getTasks();

  taskWindow.on('closed', _ => {
    taskWindow = null;
  })
  taskWindow.on('ready-to-show', _ => {
    taskWindow.show();
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