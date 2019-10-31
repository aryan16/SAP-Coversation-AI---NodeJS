var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var https = require('https');



module.exports = function(app) {
    // application -------------------------------------------------------------
    app.use(bodyParser.json());



    app.post('/get_deldate', function(req, res) {
        console.log('hey');
        var reply;

        // var xyz = JSON.parse(req.headers);
        // console.log(r.headers.authorizarion);
        console.log(req.body.nlp.entities.so);
        console.log(req.body.nlp.entities.so[0]["value"]);
        var test_data = {
            Vbeln: req.body.nlp.entities.so[0]["value"]
        }
        test_data = JSON.stringify(test_data);
        console.log(test_data);

        function get_token() {
            console.log('hyyy');
            let headers = {
                'Authorization': 'Basic MjEyNTk4MTAzOnBvd2VyMTAz',
                'x-csrf-token': 'FETCH',
                'accept': 'application/json',
                'accept-encoding': 'application/json',
                'Content-type': 'application/json'
            };

            const options = {
                url: 'https://dy1aps01.pw.com/sap/opu/odata/SAP/ZCHATBOT_SRV/SalesOrderSet',
                headers: headers
            };
            return new Promise(function(resolve, reject) {
                // Do async job
                request.get(options, (err, res, body) => {
                    console.log('hi there');
                    var token = res.headers['x-csrf-token']
                    console.log(token);
                    resolve(res.headers);
                })

            })
        }

        function getdeldata(result) {
            console.log('hyyy');
            console.log(result);
            let headers = {
                'Authorization': 'Basic MjEyNTk4MTAzOnBvd2VyMTAz',
                'x-csrf-token': 'FETCH',
                'accept': 'application/json',
                'accept-encoding': 'application/json',
                'Content-type': 'application/json'
            };

            const options = {
                url: 'https://dy1aps01.pw.com/sap/opu/odata/SAP/ZCHATBOT_SRV/SalesOrderSet',
                headers: headers
            };
            var token = result['x-csrf-token'];
            headers['Cookie'] = result['set-cookie'];
            headers['x-csrf-token'] = token;
            // console.log(token);
            return new Promise(function(resolve, reject) {
                // Do async job
                request.post({
                    headers: headers,
                    url: 'https://dy1aps01.pw.com:443/sap/opu/odata/SAP/ZCHATBOT_SRV/SalesOrderSet',
                    body: test_data
                }, function(error, response, body) {
                    var final_data = JSON.parse(body);
                    reply = final_data.d.Posnr;
                    console.log(reply);
                    resolve(JSON.parse(body));
                });
            })
        }



        get_token()
            .then(result => getdeldata(result))
            .then(function(data) {
                var final_data = {
                    "Sales Order": data.d.Vbeln,
                    "Posnr": data.d.Posnr,
                    "Vendor": "Alstom"
                }
                var date_new = data.d.Vdatu;
                var del_year = date_new.substring(0, 4);
                var del_date = date_new.substring(6, 8);
                var del_month = date_new.substring(4, 6);
                var date_new = del_date + '/' + del_month + '/' + del_year;
                if (data.d.message) {
                    var new_data = {

                        "replies": [{
                                "type": "text",
                                "content": 'OOPS!! There is no data related to this order number'
                            },
                            {
                                "type": "text",
                                "content": "If you have any other query, please ask!!"
                            }
                        ],
                        "conversation": {
                            "language": "en",
                            "memory": {
                                "user": "Bob"
                            }
                        }

                    }
                } else {
                    var new_data = {

                        "replies": [{
                                "type": "text",
                                "content": `Expected Delivery date is  ${date_new}`
                            },
                            {
                                "type": "text",
                                "content": "If you have any other query, please ask!!"
                            }

                        ],
                        "conversation": {
                            "language": "en",
                            "memory": {
                                "user": "Bob"
                            }
                        }

                    }
                }
                res.send(new_data);
                return res.status(200);
            })





    })

   

};