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

var url = 'https://www.toysrus.com/family?categoryid=13131514';

const xray = Xray().delay(5000);
    xray(url, '.product-item',[
        {
            title: '.product-item__product-title',
            price: '.product-price__label__sale',
            url:'.product-item@href',
            image: '.product-item__product-image-alt__item img@src'
        }
    ]).write('result.json');

