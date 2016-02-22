var express = require('express');

var inbox = require('./models/inbox.js');

var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/auth', function(request, response) {
  inbox(function(authUrl){
    response.send(JSON.stringify({auth: {link: authUrl}}));
  });
});


app.get('/key/:key', function (request, response) {
  response.send(JSON.stringify({key: request.params.key}))
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


