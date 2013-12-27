//analyze.js

var config = require('./subnotify.json');
var jsdom  = require("jsdom");
var fs     = require("fs");
var events = require("events");
var util   = require("util");
var eventEmitter = new events.EventEmitter();
var email  = require("./sendemail");

for (var i = 0; i <= config.subscriptions.length - 1; i++) {
  var sub = config.subscriptions[i];
  var cache  = fs.readFileSync(sub.cache.file, 'UTF-8');

  // Read critetrion to a map
  var criterion = {};
  for (var c = 0; c < sub.criterion.length; c++) {
    var criteria = sub.criterion[c];
    criterion[criteria.name] = criteria;
    criterion[criteria.name]['value'] = fs.readFileSync(criteria.file, 'UTF-8');
    //console.log(criteria.name + '-' + criterion[criteria.name]['value']);
  };

  // Read patterns to a map and replace the variables if in the criterion map
  var patterns = {};
  for (var p = 0; p <= sub.patterns.length - 1; p++) {
    var pattern = sub.patterns[p];
    patterns[pattern.name] = pattern;
    //patterns[pattern.name]['value'] = "3.1.1";
    if (pattern.pattern) {
      var pattern_replace_regexp = new RegExp('{(.*)}');
      var pattern_replace = pattern_replace_regexp.exec(pattern.pattern)
      if (pattern_replace) {
        if (pattern_replace[1] in criterion) {
          patterns[pattern.name]["pattern"] = pattern.pattern.replace(pattern_replace[0], criterion[pattern_replace[1]].value);
        }
      }
    }
  }
  //console.log(patterns);

  // Loop the cache as dom to look for the patterns
  jsdom.env({
    html: cache,
    scripts: ["node_modules/jquery/dist/jquery.min.js"],
    done: function (err, window) {
      var $ = window.$;
      for (var name in patterns) {
        $(patterns[name].selector).each(function() {
          if (patterns[name].pattern) {
            var pattern_regexp = new RegExp(patterns[name]["pattern"]);
            if (pattern_regexp.test($(this).attr(patterns[name].attribute))) {
              patterns[name]['value'] = $(this).attr(patterns[name].attribute);
              //console.log(patterns[name]['value']);
              return;
            }
          }
        });
      };
      eventEmitter.emit('sendemail', patterns, criterion, sub);
    }
  });
}

eventEmitter.on('sendemail', function(patterns, criterion, subscription) {
  for (var i = 0; i <= config.notifications.length - 1; i++) {
    var notify = config.notifications[i];
    /*console.log(patterns);
    console.log(criterion);
    console.log(subscription);
    console.log(notify);*/
    email.sendemail(patterns, criterion, subscription, notify);
  }
});