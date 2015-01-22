var moment = require('moment');
var fs = require('fs');
var path = require('path');
var now = moment();

function newPost(titleInput, appDir, cb) {

  if (!titleInput || !appDir) { throw new Error('missing title or appDir!'); }

  var basePath = path.resolve(appDir, 'public/md');
  var yearPath = path.resolve(basePath, now.format('YYYY') );
  var monthPath = path.resolve(yearPath, now.format('MM') );
  var dayPath = path.resolve(monthPath, now.format('DD') );

  function hid () {
    return Math.random().toString('16').slice(2);
  }

  function makeFileName (titleInput) {
    return hid()+"-"+titleInput.toLowerCase().replace(/\s+/,'-');
  }

  fs.readdir(yearPath, function(err) {
    if (err) { fs.mkdirSync(yearPath); }
    fs.readdir(monthPath, function(err) {
      if (err) { fs.mkdirSync(monthPath); }
      fs.readdir(dayPath, function(err) {
        if (err) { fs.mkdirSync(dayPath); }
        // TODO: add make file step
        cb();
      })
    })
  })

}

module.exports = newPost;
