var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var action = {
	"GET": function(req, res) {
		console.log(__dirname)
		fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) {
			if (err) {
				console.log('error ' + err)
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'})
				res.end(data)
			}
		})
	},
	"POST": function(req, res) {
		var str = '';
		req.on('data', function(chunk) {
			str = chunk.slice(4) + '\n';
		});
		req.on('end', function() {
			fs.appendFile(__dirname + '/archives/sites.txt', str, function(err) {
				if (err) {
					throw err;
				}
			});
			res.writeHead(302, {'Location': 'http://127.0.0.1:8080'});
			res.end();
		})

	}

}
exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  if(action[req.method]) {
  	action[req.method](req, res);
  }

};
