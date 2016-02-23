
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'credentials.json';


var readConfig = function(params){
  fs.readFile(params.file, function(err, credentials) {
    err ? params.error(err) : params.then(JSON.parse(credentials));
  })
};


function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
}

function listLabels(auth) {
  var gmail = google.gmail('v1');
  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var labels = response.labels;
    if (labels.length == 0) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('- %s', label.name);
      }
    }
  });
};

var auth = {
  authUrl: null,
  unreadMails: function (callback) {
    var gmail = google.gmail('v1');
    gmail.users.messages.list({
      auth: auth.oauth2Client,
      userId: 'me',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
        return;
      }
      var labels = response.messages;
      var result = [];
      if (labels.length == 0) {
        console.log('No labels found.');
      } else {
        console.log('Labels:');
        for (var i = 0; i < labels.length; i++) {
          var label = labels[i];
          result.push(label);
        }
      }
      gmail.users.messages.get({
        auth: auth.oauth2Client,
        userId: 'me',
        'id': result[0].id,
        format: 'raw' //return body content as raw base64 encoded text.
      },function(err, email){
        console.log(new Buffer(email.raw, 'base64').toString('ascii'))
      });

      callback(result);
    });
  },
  fetchTokenWith: function(code){
    auth.oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.oauth2Client.credentials = token;
      storeToken(token);
      console.log(JSON.stringify(auth.oauth2Client));
      listLabels(auth.oauth2Client);
    });
  },
  init: function(){
    var onInit = function(){};
    readConfig({
          file : 'client_secret.json',
          error  : function(err){
            console.error('Error loading client secret file: ' + err)
          },
          then: function (credentials) {
            var authApi = new googleAuth();
            var oauth2Client = new authApi.OAuth2(
                credentials.installed.client_id,
                credentials.installed.client_secret,
                credentials.installed.redirect_uris[0]
            );
            auth.oauth2Client= oauth2Client;

            readConfig({
              file: TOKEN_PATH,
              then: function (token) {
                oauth2Client.credentials = token;
                auth.authUrl = null;
                onInit(null, oauth2Client);
              },
              error: function (error) {
                var authUrl = oauth2Client.generateAuthUrl({
                  access_type: 'offline',
                  scope: SCOPES
                });
                auth.authUrl = authUrl;
                onInit(authUrl);
              }
            });
          },
        }
    )
  }
};

auth.init();
module.exports = auth;
