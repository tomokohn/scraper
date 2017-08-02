const functions = require('firebase-functions');
var express = require('express');
var walmart = require('./walmart_scraper');
var search = require('./amazon');

var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/walmart',function(req,res){
    walmart(req.body.url).then(function (result) {
        res.status(200).send(result)
    });
});

app.post('/amazon',function(req,res){
    console.log(req.body);
    search(req.body).then(function (result) {
        res.status(200).send(result)
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
