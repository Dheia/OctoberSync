/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const { app, Menu, Tray } = require('electron')
const path = require('path')
const sync = require('./sync')
const watcher = require('./watcher')

let trayApp = null
let syncDir = app.getPath('home') + path.sep + 'October'

function createApp () {
  trayApp = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', click() { app.quit() }}
  ])
  trayApp.setToolTip('OctoberCMS Sync is running')
  trayApp.setContextMenu(contextMenu)

  sync(syncDir)
  watch(syncDir)
}

app.on('ready', createApp)