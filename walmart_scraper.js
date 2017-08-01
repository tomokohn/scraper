/**
 * Created by Tomer on 30/07/2017.
 */
var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var express = require('express');

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

const makeDriver = require('request-x-ray')

const options = {
    method: "GET", 						//Set HTTP method
    jar: true, 							//Enable cookies
    headers: {							//Set headers
        "User-Agent": "Firefox/48.0"
    }
}

const driver = makeDriver(options)		//Create driver

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
                image: 'img.Tile-img@src'
            }
        ])(function (err,obj) {
            console.log("obj: ",obj)
            resolve(obj);
        });
    })

}

// const xray = Xray().delay(3000, 5000).driver(driver);
// xray(tempUrl, '.search-result-listview-item', [
//     {
//         title: '.prod-ProductTitle div',
//         price: 'span.Price-group@aria-label',
//         url: 'a.product-title-link@href',
//         image: 'img.Tile-img@src'
//     }
// ]).write('walmart-result.json')





