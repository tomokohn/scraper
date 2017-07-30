/**
 * Created by Tomer on 28/07/2017.
 */
var casper = require('casper').create();

casper.start('http://www.tomer-k.com/', function() {
    this.echo(this.getTitle());
});

casper.run();
