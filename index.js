var express = require('express');

var inbox = require('./models/inbox.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(JSON.stringify({data: "hello frontend  :-)"}));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


