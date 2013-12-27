var fs     = require('fs');
var config = require('./subnotify.json');
var casper = require('casper').create();
casper.options.clientScripts = ["node_modules/jquery/dist/jquery.min.js"];

//console.log(config.subscriptions);
// for sub in ...
for (var i = 0; i <= config.subscriptions.length - 1; i++) {
  var sub = config.subscriptions[i];
  //console.log(sub.name);
  // console.log(sub.url);
  // console.log(sub.cache);
  casper.start(sub.url, function(){
    if (sub.cache && sub.cache.exclude) {
      if (this.exists(sub.cache.exclude)) {
        this.evaluate(function(){
          //$("#SelectMirror").remove();
          $(sub.cache.exclude).remove();
        });
      }
    }
  }).then(function() {
    // Get the all content and save it for debug
    if (true) {
      var all = this.getPageContent();
      // Save the all content
      fs.write(sub.cache.file + '.all', all, function(err) {
        if (err) throw err;
      })
    }
    // Match the cache and save it
    if (sub.cache) {
      var cache = this.getHTML(sub.cache.scope);
      // Save the cache
      fs.write(sub.cache.file, cache, function(err) {
        if (err) throw err;
      })
    }
    // Match the criteria and save it
    for (var c = 0; c <= sub.criterion.length - 1; c++) {
      var criteria = sub.criterion[c];
      var match = this.fetchText(criteria.selector);
      if (criteria.pattern) {
        var pattern = new RegExp(criteria.pattern);
        match = pattern.exec(this.fetchText(criteria.selector));
      }
      // Save the criteria
      fs.write(criteria.file, match, function(err) {
        if (err) throw err;
      })
    }
    
    // console.log(this.getHTML("div.section"));
    // console.log(this.fetchText("div.section h2"));
    // for (var j = 0; j <= sub.patterns.length - 1; j++) {
    //   console.log(sub.patterns[j].name);
    //   console.log(sub.patterns[j].selector);
    //   console.log(sub.patterns[j].pattern);

    //   var patt = new RegExp(sub.patterns[j].pattern);
    //   console.log(patt.exec(this.fetchText(sub.patterns[j].selector)))
    // }
    //console.log(this.fetchText("div.xright:nth-child(2)").trim());
    //casper.echo("I'm loaded.");
  }).run()
  // if (sub.cache.file) {
  //   console.log(sub.cache.file);
  // }
  //console.log(sub.criterion);
  //console.log(sub.patterns);
  // for subpat in ...
  //for (var j = 0; j <= sub.patterns.length - 1; j++) {
  //  console.log(sub.patterns[j].name);
  //}
}

