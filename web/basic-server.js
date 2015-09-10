var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var worker = require('../workers/htmlfetcher.js')

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
	console.log('Calling method ' + req.method + ' on ' + req.url);
	if (routes[req.url]) {
		routes[req.url](req, res);
	} else {
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.end();
	}
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

routes = {
	'/': handler.handleRequest,
	'/sites/post': handler.handleRequest
}