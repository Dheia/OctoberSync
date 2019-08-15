/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const { app, Menu, Tray } = require('electron')
const settings = require('electron-settings');
const path = require('path')
const sync = require('./sync')
const setup = require('./setup/setup')
const watcher = require('./watcher')

let trayApp = null
let syncDir = app.getPath('home') + path.sep + 'October'

function createApp () {
  trayApp = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Reset', type: 'normal', click() {
      settings.deleteAll()
      app.quit()
    }},
    { label: 'Exit', type: 'normal', click() { app.quit() }}
  ])
  trayApp.setToolTip('OctoberCMS Sync is running')
  trayApp.setContextMenu(contextMenu)

  if(!settings.get('app.isInitialized', false)) {
    setup.initiate(app)
  } else {
    app.dock.hide()
    serverUrl = settings.get('app.url')
    sync(serverUrl, syncDir)
    // watch(syncDir)
  }
}

app.on('ready', createApp)