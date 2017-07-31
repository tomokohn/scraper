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

var url = 'http://www.toysrus.com/family/index.jsp?categoryId=13131514&ppg=96';

const xray = Xray().delay(5000);
    xray(url, '.prodloop_cont',[
        {
            title: '.prodtitle',
            price: '.ourPrice2',
            url:'.prodtitle@href',
            image: 'img.swatchProdImg@src'
        }
    ]).write('result.json');

