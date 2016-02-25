var express = require('express');

var inbox = require('./models/inbox.js');
var mailParser = require('./models/mail-parser.js');

var app = express();
var pg = require('pg');


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-

app.set('port', (process.env.PORT || 5000));


app.get('/auth', function(request, response) {
  response.send(JSON.stringify({auth: {link: inbox.authUrl}}))
});

app.get('/emails', function(request, response){
  var loginId = "nishant.singh87@gmail.com";

  inbox.unreadMailsFrom(loginId).then(function(mails){
    mailParser.parse(mails).then(function(referrals){
      response.send(JSON.stringify({referrals: referrals}));
    });
  })
});

app.post('/key', function (request, response) {
  inbox.fetchTokenWith(request.body.key);
  response.send("authorized..you can go crazy now.")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var localDb = "postgresql://localhost:5432/test";

var initDb = function(){
  pg.connect(process.env.DATABASE_URL || localDb, function(err, client, done) {
    client.query('SELECT * FROM test_db', function(err, result) {
      done();
      err ? console.error(err) : console.log(JSON.stringify(result.rows))
    });
  });
};

initDb();


