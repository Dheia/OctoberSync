/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const fs = require('fs')
const { net } = require('electron')
const http = require('http');

var syncDir = '' // Where the magic will happen

sync = function(syncDir, dest = '/') {

  if (!fs.existsSync(syncDir)){
      fs.mkdirSync(syncDir);
  }
  this.syncDir = syncDir

  const request = net.request('http://sync.web/api/v1/sync?path=' + dest)
  request.on('response', (response) => {
    var data = '';
    if ((response.statusCode < 200) && (response.statusCode > 299)) {
      console.log(response.headers) // Error
    }
    response.on('data', (chunk) => {
      data += chunk
    })
    response.on('end', () => {
      var folders = JSON.parse(data)
      for (let entry of folders) {
        if(entry.type == 'folder') {
          if (!fs.existsSync(syncDir + entry.path)) {
            fs.mkdirSync(syncDir + entry.path);
          }
          sync(syncDir, entry.path)
        } else {
          createFile(entry)
        }
      }
    })
  })
  request.end()
};

function downloadFile(targetDir, entry) {
  const request = net.request('http://sync.web/api/v1/download?path=' + entry)
  const file = fs.createWriteStream(targetDir + entry);

  request.on('response', (response) => {
    if ((response.statusCode < 200) && (response.statusCode > 299)) {
      console.log(response.headers) // Error
    }
    response.on('data', (chunk) => {
      file.write(chunk)
    })
    response.on('end', () => {
      console.log('Download complete: ' + targetDir + entry)
      file.close()
    })
  })
  request.end()
}

function createFile(entry) {
  downloadFile(this.syncDir, entry.path)
}

module.exports = sync