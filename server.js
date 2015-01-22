var express = require('express');
var http = require('request');
var path = require('path');
var app = express();

function Server () {
  // config
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));

  var bloggerId = process.env.GOOGLE_BLOGGER_ID;
  var googleKey = process.env.GOOGLE_KEY;

  // if route begins with a numerical date
  app.get(/\d+/, function(req, res){

    http('https://www.googleapis.com/blogger/v3/blogs/'+bloggerId+'/posts/bypath?path='+req.url+'&key='+googleKey, function(err, response, body){
      if (err) { 
        console.log("ERROR: ", err);
        res.send(500);
        return;
      }
      if (response.statusCode === 400) {
        res.send("Wooops");
      } else {
        res.render('index', { date: JSON.parse(body).published, message: JSON.parse(body).content });
      }
    })

  });

  // if route has /p/ prefix, treat as a basically normal route
  app.get(/p\/(.+)/, function(req, res){
    // console.log("REQ", req);
    res.send("PATH!")
  })

  app.get('/', function(req, res) {
    res.render('index', { date: new Date(), message: 'Hello there!'});
  })

  app.listen(5005);
}

module.exports = Server;

// Run the server if someone runs this file directly
if(path.basename(process.argv[1], '.js') === path.basename(__filename, '.js')) {
  Server();
}