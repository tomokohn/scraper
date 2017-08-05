var Xray = require('x-ray');
var request = require('request');
var Promise = require("bluebird");
var amazon = require('amazon-product-api');
var keys = require('./keys');
var _ = require('lodash')

var client = amazon.createClient({
    awsId: "AKIAJG3D5XAHMMG3KYMQ",
    awsSecret: "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",
    awsTag: "aws Tag"
});


const makeDriver = require('request-x-ray');

const options = {
    method: "GET", 						//Set HTTP method
    jar: true, 							//Enable cookies
    headers: {							//Set headers
        "User-Agent": "Firefox/48.0"
    }
};

const driver = makeDriver(options);		//Create driver


var search = function amazon(data){
    return new Promise(function (resolve,reject) {
        var content = data;
        console.log("content:", content);
        var arr = [];
        for (var i = 0; i < content.length; i++) {
            arr.push(content[i]);
        }
         Promise.mapSeries(arr,amazonApi).then(function (data) {
             console.log('map series', data);
         resolve(data);
        }).catch(function (err) {
             console.log('err', err);
         });
    });

};

function amazonApi(term) {
    return new Promise(function (resolve) {
        console.log('search term', term);
        client.itemSearch({
            Keywords: term,
            ResponseGroup: 'ItemIds'
        }).then(function(results){
            resolve(results[0].ASIN[0]);
            //console.log("amazon api results: ",results);
        }).catch(function(err){
            console.log("\n \n amazon api error: ",JSON.stringify(err));
            resolve('');
        });
    });
}

module.exports = search;





