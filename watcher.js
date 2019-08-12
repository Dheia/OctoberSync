/*!
 * October Sync
 * Copyright(c) Saifur Rahman Mohsin
 * MIT Licensed
 */

const chokidar = require('chokidar');

watch = function(syncDir) {
  chokidar.watch(syncDir, {ignored: /(^|[\/\\])\../, cwd: syncDir}).on('all', (event, path) => {
    console.log(event, path);
  });
}

module.exports = watch