/**
 * Created by Tomer on 28/07/2017.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var Horseman = require('node-horseman');



app.get('/amazon/', function (req, res) {
    var name = req.query.name;
    console.log('query: ' + name);
    var price;
    var image;
    var title;
    var link;
    var asin;
    var horseman = new Horseman();
    horseman
        .viewport(1280, 1024)
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .open('http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + name)
        .waitForSelector('.s-item-container')
        .html('.sx-price-whole')
        .then(function (result) {
            price = result;
        })
        .html('.sx-price-fractional')
        .then(function (result) {
            price = price +"." + result;
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
            var ans = {
                title: title,
                price: price,
                image: image,
                link: link,
                asin: asin
            };
            res.send('response: ' + JSON.stringify(ans));
        })
        .close();
});

app.listen('8081');
console.log('Magic happens on port 8081');

exports = module.exports = app;