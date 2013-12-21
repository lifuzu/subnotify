
var casper = require('casper').create();
casper.options.clientScripts = ["node_modules/jquery/dist/jquery.min.js"];

casper.start('http://maven.apache.org/download.cgi', function(){
  if (this.exists('#SelectMirror')) {
    this.evaluate(function(){
      $("#SelectMirror").remove();
    });
  }
});

casper.then(function() {
  //casper.echo(this.getPageContent());
  //console.log(this.getHTML("div.section"));
  console.log(this.fetchText("div.section h2"));
  //console.log(this.fetchText("div.xright:nth-child(2)").trim());
  //casper.echo("I'm loaded.");
});

casper.run()
