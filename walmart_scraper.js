/**
 * Created by Tomer on 30/07/2017.
 */
var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var express = require('express');
var Horseman = require('node-horseman');

var app = express();
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.listen('8081');
console.log('listening on 8081');

const makeDriver = require('request-x-ray');

const options = {
    method: "GET", 						//Set HTTP method
    jar: true, 							//Enable cookies
    headers: {							//Set headers
        "User-Agent": "Firefox/48.0"
    }
}

const driver = makeDriver(options);		//Create driver

tempUrl = 'https://www.walmart.com/browse/0?cat_id=0&facet=special_offers%3AClearance%7C%7Cpickup_and_delivery%3AShip+to+Home&grid=false&max_price=30&page=2#searchProductResult';

app.post('/walmart/', function (req, res) {
    var url = req.body.url;
    console.log('url: ', req.body);
    scrapeWalmart(url).then(function (data) {
        console.log('data: ',data);
        res.status(200).send(data);
    })

})

function scrapeWalmart(url) {
    return new Promise (function (resolve) {
        const xray = Xray().delay(3000, 5000).driver(driver);
        xray(url, '.search-result-listview-item', [
            {
                title: '.prod-ProductTitle div',
                price: 'span.Price-group@aria-label',
                url: 'a.product-title-link@href',
                image: '.Tile-img@src'
            }
        ])(function (err,obj) {
            console.log("obj: ",obj)
            resolve(obj);
        });
    })

}

app.post('/amazon/', function (req, res) {
    var content = req.body;
    console.log("content:",content);
    var arr = [];
    for (var i=0; i< content.length; i++){
        arr.push(content[i]);
    }
    var actions = arr.map(scrapeAmazon);
    var results = Promise.all(actions);
    results.catch(function(err) {
        // log that I have an error, return the entire array;
        console.log('A promise failed to resolve', err);
        return actions;
    }).then(function (data) {
        res.status(200).send(data);
    })

});

function scrapeTerm(trem) {
    return new Promise(function (resolve) {
        var serachTerm = trem.replace(/ /g,'+');
        console.log('serachTerm: ', serachTerm);
        var price;
        var image;
        var title;
        var link;
        var asin;
        var horseman = new Horseman();
        horseman
            .viewport(1280, 1024)
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + serachTerm)
            .wait(3000)
            .waitForSelector('.s-item-container')
            .html('.sx-price-whole')
            .then(function (result) {
                price = result;
            })
            .html('.sx-price-fractional')
            .then(function (result) {
                price = price +"." + result;
                console.log('price:', price);
            })
            .attribute('.s-access-image', 'src')
            .then(function (result) {
                image = result
            })
            .attribute('.s-access-detail-page', 'href')
            .then(function (result) {
                link = result;
                var index = link.indexOf('/dp/') + 4;

                asin = link.substr(index,10);
                console.log(index,", ",asin);
            })
            .html('h2.s-access-title')
            .then(function (result) {
                title = result;
                resolve({
                    title: title,
                    price: price,
                    image: image,
                    link: link,
                    asin: asin
                });
            })
            .close();
    })
}

function scrapeAmazon(term) {
    var serachTerm = term.replace(/ /g,'+');
    console.log('serachTerm: ', serachTerm);
    var amazonUrl = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + serachTerm;
    return new Promise(function (resolve) {
        const xray = Xray().delay(3000, 5000).driver(driver);
        xray(amazonUrl, '.s-item-container',
            {
                title: '.s-access-title',
                price: '.sx-zero-spacing@aria-label',
                url: '.s-access-detail-page@href',
                image: '.s-access-image@src'
            }
    )(function (err,obj) {
            console.log("obj: ",obj);
            resolve(obj);
        });
    });
}





