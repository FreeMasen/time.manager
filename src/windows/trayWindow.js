const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const Positioner = require('electron-positioner');

let positioner;
let icon;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 800, show: true});
  win.baseURL = url.format({
    pathname: path.join(__dirname, 'tray.html'),
    protocol: 'file:',
    slashes: true
  })
  win.loadURL(win.url);

  var menu = Menu.buildFromTemplate(menuTemplate);
  if (!icon) {
    var path;
    path = `${__dirname}/assets/img/icon.png`
    if(process.platform == 'darwin') {
        path.replace('icon.png', 'icon.mac.png');
    }
    icon = new Tray(path);
    if (!positioner) {
      positioner = new Positioner(win);
    }
    if (process.platform == 'win') {
      positioner.move('trayBottomRight', icon.getBounds());
    } else {
      positioner.move('trayCenter', icon.getBounds());
    }
    
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
    if (win.isVisible()) {
      return win.hide();
    }
    win.show();
  }

  return win

}

module.exports = createWindow