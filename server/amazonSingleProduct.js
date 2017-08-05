var Xray = require('x-ray');
var request = require('request');
var amazon = require('amazon-product-api');

var Promise = require("bluebird");

var client = amazon.createClient({
    awsId: "AKIAJG3D5XAHMMG3KYMQ",
    awsSecret: "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",
    awsTag: "aws Tag"
});

var products = function amazon(data){
    return new Promise(function (resolve,reject) {
        Promise.mapSeries(data,amazonLookup).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            console.log('err', err);
        });
    });

};

function amazonLookup(asin){
    return new Promise(function (resolve) {
        console.log("\m\n asin to look: " , asin);
        if (!asin){
            resolve('')
        }
        client.itemLookup({
            idType: 'ASIN',
            itemId: asin,
            ResponseGroup:'Medium'
        }).then(function(result) {
            console.log( "\n \n item lookup "+ asin + " : " + JSON.stringify(result));
            resolve(result);
        }).catch(function(err) {
            console.log("\n \n item lookup "+ asin + " error : " + JSON.stringify(err));
            resolve('');
        });
    });

};

module.exports = products;






