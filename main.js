const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow() {
  win = new BrowserWindow({show: false, useContentSize: true})
  win.once('ready-to-show', () => {
    win.setMenu(null);
    win.maximize();
    win.show();
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow)
