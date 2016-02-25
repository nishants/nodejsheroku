
var parse = function(mail){
  return mail;
}

module.exports = {
  parse: function(mails){
    return new Promise(function(success, error){
      var parsed = [];
      mails.forEach(function(mail){
        parsed.push(parse(mail));
        if(parsed.length == mails.length){
          success(parsed);
        }
      });
    })
  }
};