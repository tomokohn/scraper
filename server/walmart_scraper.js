/**
 * Created by Tomer on 30/07/2017.
 */
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

//     scrapeWalmart(url).then(function (data) {
//         console.log('data: ',data);
//         res.status(200).send(data);
//     })
//
// })

var walmart = function scrapeWalmart(url) {
    return new Promise (function (resolve) {
        console.log('the url: ', url);
        const xray = Xray().delay(3000, 5000).driver(driver);
        xray(url, '.search-result-listview-item', [
            {
                title: '.prod-ProductTitle div',
                price: 'span.Price-group@aria-label',
                url: 'a.product-title-link@href',
                image: '.Tile-img@src'
            }
        ])(function (err,obj) {
            //console.log("obj: ",obj);
            resolve(obj);
        });
    })
}

module.exports = walmart;




