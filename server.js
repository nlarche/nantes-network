var express = require('express');  
var request = require('request');

const BASE_URL = "http://open_preprod.tan.fr";

var app = express();  
app.use('/', function(req, res) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.url)
  var url = BASE_URL + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);  
