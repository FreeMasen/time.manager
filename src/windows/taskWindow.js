const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

function createTaskWindow() {
    win = new BrowserWindow({width: 800, height: 800, show: true});
    var u = url.format({
        pathname: path.join(__dirname,'..', '..', 'index.html'),
        protocol: 'file:',
        slashes: true
    })
    win.baseURL = u;
    win.loadURL(u);

    return win;
}

module.exports = createTaskWindow
