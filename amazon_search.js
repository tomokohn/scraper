/* http://pycoders.com/archive/
 *  - get date, name, link
 *  - generate HTML page with above in table format
 */
var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var fs = require('fs');
var url = 'https://www.amazon.com/';

var link = [];
var title;
var image = [];
var price = [];
var output = [];

function outputJSON() {
  for (var i=0;i<link.length; i++){
      output.push({
          link:link[i],
          title:title[i],
          price:price[i],
          image:image[i]
      });
  }
  return JSON.stringify(output);
};

function getLink() {
  var link = $('.details--title>a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};

function getTitle() {
  var title = $('.s-item-container h2');
  return _.map(title, function(e) {
    return e.innerHTML;
  });
};

function getImage() {
  var image = $('img.js-altImg');
  return _.map(image, function(e) {
    return e.getAttribute('src');
  });
};

function grtPrice() {
  var price = $('.price .h-text-red')
    return _.map(price, function(e) {
        return e.innerText.replace('$', '');;
    });
};

function getForm() {
    var form = $('form[name="site-search"]');
    return form
}

casper.start(url, function() {
  // do something
});

casper.then(function () {
   // var form = this.evaluate(getForm);
    this.fill('form[name="site-search"]',{
        'field-keywords':'Playskool Heroes Star Wars Galactic Heroes Speeder Bike and Scout Trooper'
    },true);
});

// casper.then(function() {
//   link = this.evaluate(getLink);
// });

casper.then(function() {
  title = this.evaluate(getTitle);
});

// casper.then(function() {
//     price = this.evaluate(grtPrice);
// });
//
// casper.then(function() {
//     image = this.evaluate(getImage);
// });

casper.run(function() {
  // var data = outputJSON();
  // fs.write('data.json', data, 'w');
    this.echo("\n");
    this.echo(title)
  this.echo("\n Execution terminated").exit();
});