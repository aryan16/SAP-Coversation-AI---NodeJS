var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var https = require('https');



module.exports = function(app) {
    // application -------------------------------------------------------------
    app.use(bodyParser.json());


    app.post('/get_salesorder', (req, res) => {
        console.log('API for Sales order count');
        console.log(req.body.nlp.entities.time[0]["value"]);
        //console.log(req.body.nlp.entities.days);
        //console.log(req.body.nlp.entities.day[0]["value"]);
        var days_no = req.body.nlp.entities.time[0]["value"];
        var days_no = days_no[0];
        var total_so = [];
        var total_cus = [];

        function get_so() {
            console.log('hyyy');
            let headers = {
                'Authorization': 'Basic MjEyNTk4MTAzOnBvd2VyMTAz',
                'x-csrf-token': 'FETCH',
                'accept': 'application/json',
                'accept-encoding': 'application/json',
                'Content-type': 'application/json'
            };
            var target_url = "https://dy1aps01.pw.com:443/sap/opu/odata/sap/ZBOT_SO_SRV/salesOrderDetailsSet?$filter= iDay eq ";
            target_url = target_url + "'" + days_no + "'";
            console.log(target_url);
            const options = {
                url: target_url,
                headers: headers
            };
            return new Promise(function(resolve, reject) {
                // Do async job
                request.get(options, (err, res, body) => {
                    console.log('hi there');
                    var final_data = JSON.parse(body);
                    console.log(final_data.d.results);
                    console.log(final_data.d.results[0].soHeader);
                    console.log(final_data.d.results.length);
                    for (var i = 0; i < final_data.d.results.length; i++) {
                        total_so.push(final_data.d.results[i].soHeader);
                        total_cus.push(final_data.d.results[i].custNumber);
                    }
                    var total_val = new Set(total_so);
                    total_so = Array.from(total_val);
                    resolve(final_data.d.results);
                })

            })
        }

        get_so().then(function(data) {
            console.log(data);
            var new_data = {

                "replies": [{
                    "type": "text",
                    "content": "Here are your Sales Order"
                }],
                "conversation": {
                    "language": "en",
                    "memory": {
                        "user": "Bob"
                    }
                }

            }
            for (var i = 0; i < 5; i++) {
                new_data.replies.push({
                    "type": "text",
                    "content": ` Sales order : ${data[i].soHeader} and Customer Number : ${data[i].custNumber}`
                });
            }
            new_data.replies.push({
                "type": "text",
                "content": "do you need any other help?"
            })
            res.send(new_data);
            return res.status(200);

        })

    })
};