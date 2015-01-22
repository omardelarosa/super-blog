var gulp = require('gulp');
var readline = require('readline');
var newPost = require('./tasks/new-post');
var path = require('path');
var appDir = path.resolve('.');
var server = require('./server');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

gulp.task('default', function() {
  // place code for your default task here
  server();
});

gulp.task('new-post', function(done) {
  rl.question('title: ', function(title) {
    try {
      createPost(title, appDir, function(err){
        if (err) { done(err) }
        done();
        process.exit();
      });
    } catch (e) { done(e); }
  });
})