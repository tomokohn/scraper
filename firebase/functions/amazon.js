var Xray = require('x-ray');
var request = require('request');


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
        var actions = arr.map(scrapeAmazon);
        var results = Promise.all(actions);
        return results.then(function (data) {
            resolve(data);
        });
    });

};

function scrapeAmazon(term) {
    var serachTerm = term.replace(/ /g,'+');
    console.log('serachTerm: ', serachTerm);
    var amazonUrl = 'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + serachTerm;
    return new Promise(function (resolve) {
        const xray = Xray().delay(3000, 5000).driver(driver);
        xray(amazonUrl, '.s-item-container',
            {
                title: '.s-access-title',
                price: '.sx-zero-spacing@aria-label',
                url: '.s-access-detail-page@href',
                image: '.s-access-image@src'
            }
    )(function (err,obj) {
            console.log("obj: ",obj);
            resolve(obj);
        });
    });
}

module.exports = search;





