// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require("../helpers/archive-helpers.js");

var CronJob = require('cron').CronJob;

new CronJob('* * * * * *', function() {
	console.log('cronjob running');
	helpers.downloadUrls();
}, null, true, 'America/Los_Angeles');
