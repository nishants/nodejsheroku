


var google = require('googleapis');
var drive = google.drive('v2');
var authClient = new google.auth.JWT(
    'inbox-service@stoked-sun-122814.iam.gserviceaccount.com',
    'path/to/key.pem',
    // Contents of private_key.pem if you want to load the pem file yourself
    // (do not use the path parameter above if using this param)
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCQzZXVzU8t/URw\nCoXYit5SyA568H0tEIyBhRE1IY48CF7DvO/xjLXE7df+al/4b7SezwlMdQejUzJX\n0eQDZkBhxwXHhwBpYXKzaBz+8+CoGSjRU3Tom9iwsh5AWMhyTVNZWvq6DBmEh7B7\n3TT9i8krurEBKIrlmAB/Y0HpP+xY5+a/5VzVVgG1MEnzqLJNV6RmIXPLkEeQboX/\nyt17KQyQsJCtbESforOVATDRN9ZiBXtI4aHAFGLkpD2ddwWGYsMN8fllR5iurbtA\nlGzJy6uV4fsZon/5BgBW/JN1kvwU2TDrIa9IX64PQDE7ysfbwkd7qV7eMHPDRYYG\n1TCRRTaHAgMBAAECggEAa0k3Q+LLUKq/Azh4tNknIjSBrgry4+nIAMrD1hbXmJkn\nBWW+bbywjIkgqKrOEndJXwTMwe5Py23/9dtYUkB3YTqhiJT49Bs0bcKtASVWhZWm\njXmFPDcEFN7T1R8y3KV4JNNow2HlojEazJs4AMeKNLEtJkuQpc26SKgVFKm9Bp0k\nAJffJVJ7EbS39icci9EUs/pDZBALYcTEyzIM6VZ+YvDy4sBA7bYUM84IlHcUSXS3\nv2krkQxo2VUuUUBJ2Nm12BX2U4fiGEtcerVB3elVeba25CF/+aVfyoUl7KDRIINX\npQQQhz8YhBDGrkiC7Lzo3XWu4fVeBKRj9iD0sTx+YQKBgQDZq7FMLMiSLAOyzH7K\nTaEb/DIGgRPAKmbS7fQH6nlL6dAbR1EjUTorYKMdBmetUwmxRCPTRenjjji5/glR\nbq6JTzD5nH7ePsuxBUmWAxmLygv9rNmzBsYE68X8m+3D+bzpcUS+CSe7gUCzOfvu\nBr+MbI/VtVy7jzvYh9moTVCw1wKBgQCqTR3wcHK8RWQmcLW5saUZssEirX7FwjJ0\nJY7Q6GcKWrKaMIThczv6P0ThMVeusxWolPN7g3CaDuct/XsGlHomLQxjh+djSDkx\n9PlGlPOz1oxEJtYuRP1BYti+GObtZHhTLaZ7wV5yLUdfxVybhOgLjrxX51Rpt3cW\nahg+0WwB0QKBgAbuf8PkPTLice+0sWjx1eqVOmaYn69j6khXSYki/1/af0UPHVdZ\nk9ejyS34cT7EwS9C8z0cIdmcQtQxccyFEMvQmMeqIyQircviVjiPurWH5p/abEhW\nM+IeO/zSXlz6S/jHIaBHnFtNP2k1tH8c+eaX4nC0yNI0OnynvtesNqCbAoGAIt1g\n2L2cr7ChHUGL4rVcsJMo+Rl9z6y/OYoK3/gESFljIS/3tFQsHkJfrp60bb6aG4ZL\nBqlVHyUX7RFs4174VuJ4G9RR6cB6fSDC+9E4x0OQOc+dn6FeG8nJx7k/ZbBg9d5t\nq/5dgJCGgTPdjrU58EvLgU+Jt47o4Xzc89dZ/lECgYAY1kFKEGjRNLrIayPcC1Z/\n5A3Pkr20YGYv6cwnkfoqdg0sKqdcJcpANRMyhbvTeDuYWJeS2GRg73/1jmsXNt26\nIEqt2eVY06sz1HzwWpv3QqcnsEgSYaTLfXD1ncLsdry6BT+ux5GDptbWYJ3kcGz3\nG6wLpr7hL7zWT+3/YRyeXQ==\n-----END PRIVATE KEY-----\n',
    // Scopes can be specified either as an array or as a single, space-delimited string
    ['https://www.googleapis.com/auth/drive.readonly']
    // User to impersonate (leave empty if no impersonation needed)
);

authClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Make an authorized request to list Drive files.
  drive.files.list({ auth: authClient }, function(err, resp) {
    // handle err and response
  });
});