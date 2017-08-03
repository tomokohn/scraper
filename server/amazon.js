var Xray = require('x-ray');
var request = require('request');

var amazon = require('amazon-product-api');

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
    return new Promise(function (resolve) {
        var content = data;
        console.log("content:", content);
        var arr = [];
        for (var i = 0; i < content.length; i++) {
            arr.push(content[i]);
        }
        var actions = arr.map(amazonApi);
        var results = Promise.all(actions);
        return results.then(function (data) {
            resolve(data);
        });
    });

};

function amazonApi(term) {
    return new Promise(function (resolve) {
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
    //     const xray = Xray().delay(3000, 5000).driver(driver);
    //     xray(amazonUrl, '#result_0@data-asin'
    // )(function (err,obj) {
    //         console.log("obj: ",obj);
    //         resolve(obj);
    //     });
    });
}

module.exports = search;





