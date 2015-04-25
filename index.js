/**
 * User: Jack Zhang
 * Date: 4/24/15
 * Time: 15:01
 * Desc:
 */

var PORT = 7102;
var PROXY_SERVER = "http://localhost:7101/proxy/";

var parser = require("swagger-parser");
var http = require('http');
var url = require('url');

http.createServer(function(req, res) {

  var resHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  var urlobj = url.parse(req.url);

  if (req.method === 'GET' && urlobj.query) {
    var yamlUrl = urlobj.query.split('=')[1];
    parser.parse(PROXY_SERVER + '?url=' + yamlUrl, {
      dereference$Refs: false
    }, function(err, api, metadata) {

      if (!err) {

        res.writeHead(200, resHeader);
        res.end(JSON.stringify(api, null, ' '));
      } else {
        console.log(err);
        res.writeHead(500, resHeader);
        res.end(err.toString());
      }
    });
  } else {

    res.writeHead(400, resHeader);
    res.end('Invalid\n method:' + req.method + '\nURL:' + req.url);
  }


}).listen(PORT, "127.0.0.1");
console.log('Server running at http://127.0.0.1:', PORT);

