var fs = require('fs');
var path = require('path');
var request = require('/Users/student/2015-08-web-historian/node_modules/http-request/lib/main.js');
var _ = require('underscore');
// var http = request.createHttpClient({"url": __dirname + '/web/archives/'});

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
	console.log(exports.paths.list);
	fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
		if (err) { console.log('error', err); }
	  	console.log(data);
		return data.split('\n');
	})
};

exports.isUrlInList = function(url) {
	var siteArray = exports.readListOfUrls();
	var found = false;
	siteArray.forEach(function(site) {
		if (site === url) {
			found = true;
		}
	})
	return found;
};

exports.addUrlToList = function(url) {
	if (!exports.isUrlInList(url)) {
		fs.appendFile(exports.paths.list, url, function(err) {
			if (err) {
				throw err;
			}
		});
	}
};

exports.isUrlArchived = function(url) {
	if (fs.existsSync(exports.paths.archivedSites + '/' + url)) {
		return true;
	} else {
		return false;
	}
};

exports.downloadUrls = function() {
	// var listUrls = exports.readListOfUrls();
	fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
		if (err) { console.log("error " + err) }
		console.log(data)
		var listUrls = data.split('\n');

		listUrls.forEach(function(url) {
			if (!exports.isUrlArchived(url)) {
				fs.mkdirSync(exports.paths.archivedSites + '/' + url)
				fs.writeFileSync(exports.paths.archivedSites + '/' + url + '/index.html')
				request.get({"url": url}, exports.paths.archivedSites + '/' + url + '/index.html', function(err, res) {
					if (err) { console.log(err); }
					console.log(res.code, res.header, res.file)
				})
			}
		})
	})
	
	
};
