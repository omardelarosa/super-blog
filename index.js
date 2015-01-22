var express = require('express');
var http = require('request');
var app = express();

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
      console.log("RESPONSE", response.toJSON());
      res.send(body);
    }
  })

});

// if route has /p/ prefix, treat as a basically normal route
app.get(/p\/(.+)/, function(req, res){
  console.log("REQ", req);
  res.send("PATH!")
})

app.listen(6000);