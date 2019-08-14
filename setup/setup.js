/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const { BrowserWindow, ipcMain } = require('electron')
const settings = require('electron-settings')

var app = null

module.exports.initiate = function (app) {
  this.app = app

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
        nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./setup/setup.htm')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

module.exports.handleForm = function (targetWindow, baseurl) {
    settings.set('app.isInitialized', true)
    settings.set('app.url', baseurl)
    this.closeForm(targetWindow)
};

module.exports.closeForm = function (targetWindow) {
    if (!settings.has('app.url')) {
      this.app.quit()
    }
    mainWindow.close()
    mainWindow = null
    this.app.relaunch()
    // settings.set('app.isInitialized', true)
};