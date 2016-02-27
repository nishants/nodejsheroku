
var tokens = [
    {
      name: "skills",
      values: [
        "sap",
        "peoplesoft",
        "plm (product lifecycle management)",
        "siebel",
        "business intelligence",
        "microsoft technologies",
        "java / j2ee",
        "mainframes",
        "oracle applications",
        "testing",
        "database administration",
        "linux administration",
        "solaris administration",
        "windows administration",
      ]
    },
    {
      name: "locations",
      values: [
        "mysore",
        "bangalore",
        "hyderabad",
        "pune",
        "jaipur",
        "chandigarh"
      ]
    }
];

var tokensIn = function(body, tokens){
  var found = [];
  for(var i = 0; i< tokens.length; i++){
    var token = tokens[i];
    if(body.indexOf(token) != -1){
      found.push(token);
    }
  }
  return found;
};

var parse = function(mail){
  var body = mail.toLowerCase(), result = {};
  for(var i = 0; i< tokens.length; i++){
    var token = tokens[i];
    result[token.name] = tokensIn(body, token.values)
  }
  return result;
}

module.exports = {
  parse: function(mails){
    return new Promise(function(success, error){
      var parsed = [];
      if(mails.length == 0) success([]);
      mails.forEach(function(mail){
        parsed.push({
          id: mail.id,
          body: mail.body,
          subject: mail.subject,
          suggestions: parse(mail.body)
        });
        if(parsed.length == mails.length){
          success(parsed);
        }
      });
    })
  }
};