/**
 * Created by Tomer on 30/07/2017.
 */
var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var express = require('express');

var app = express();

// app.listen('8082');
// console.log('listening on 8082');

var url = 'https://www.walmart.com/browse/0?cat_id=0&facet=special_offers%3AClearance%7C%7Cpickup_and_delivery%3AShip+to+Home&grid=false&max_price=30&page=1#searchProductResult';

const xray = Xray();
    xray(url, '.search-result-listview-item',[
        {
            title: '.prod-ProductTitle div',
            price: 'span.Price-group@aria-label',
            url:'a.product-title-link@href',
            image: 'img.Tile-img@src'
        }
    ]).write('result-walmart.json');

