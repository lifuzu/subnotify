
var config = require('./subnotify.json');
var exec = require('child_process').exec, child;

console.log(config.subscriptions);
for (var i = 0; i <= config.subscriptions.length - 1; i++) {
  console.log(config.subscriptions[i].criterion);
  console.log(config.subscriptions[i].patterns);
  for (var j = 0; j <= config.subscriptions[i].patterns.length - 1; j++) {
    console.log(config.subscriptions[i].patterns[j].name);
  }
}
// console.log(config.username);
// console.log(config.password);
// console.log(config.clientscript);

/*
for (var i = 0; i <= config.server.length - 1; i++) {
	console.log(config.server[i]);
	var commandstr = 'node ./ssh-login.js' +
		' -h ' + config.server[i] +
		' -u ' + config.username +
		' -p ' + config.password +
		' -s ' + config.clientscript;
	//console.log(commandstr);
	exec(commandstr, function (error, stdout, stderr) {
    	if (stdout !== '') console.log('stdout: ' + stdout);
    	if (stderr !== '') console.log('stderr: ' + stderr);
    	if (error !== null) {
      		console.log('exec error: ' + error);
    	}
	});
};*/
