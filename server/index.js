var express = require('express');
var walmart = require('./walmart_scraper');
var search = require('./amazon');
var products = require('./amazonSingleProduct');


var app = express();

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


app.post('/walmart',function(req,res){
    walmart(req.body.url).then(function (result) {
        console.log('-------     done walmart scrape ------');
        res.status(200).send(result)
    });
});

app.post('/amazon',function(req,res){
    console.log(req.body);
    search(req.body).then(function (result) {
        console.log("\n \n amazon ASIN's: ",result);
            res.status(200).send(result) ;
    });
});

app.post('/products',function(req,res){
    console.log(req.body);
    products(req.body).then(function (result) {
        console.log("\n \n amazon products: ",result);
        res.status(200).send(result) ;
    });
});

app.listen('8081');
console.log('the scraper is ready on 8081');

