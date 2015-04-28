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
var querystring = require('querystring');

http.createServer(function(req, res) {

  var resHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  var urlobj = url.parse(req.url);
  var queryObj = querystring.parse(urlobj.query);
  console.log(queryObj);
  console.log('-----------');

  if (req.method === 'GET' && urlobj.query && queryObj.yaml) {
    var yamlUrl = queryObj.yaml;

    if (!queryObj.noproxy) {

      if (queryObj.proxy) {
        yamlUrl = queryObj.proxy + '?url=' + yamlUrl;
      } else {
        yamlUrl = PROXY_SERVER + '?url=' + yamlUrl;
      }
    }


    parser.parse(yamlUrl, {
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


}).listen(PORT, "0.0.0.0");
console.log('Server running at http://0.0.0.0:', PORT);

