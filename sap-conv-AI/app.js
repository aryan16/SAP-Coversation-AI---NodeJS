var express = require('express');
var app = express();
var port = process.env.port || 80;
var bodyparser = require('body-parser');
var cors = require('cors');
var http = require('http');
var https = require('https');
var request = require('request');

console.log('Hola');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.all("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});


// routes ======================================================================
require('../route/get_data_route.js')(app);
require('../route/delivery_data_route.js')(app);

require('../route/get_priceroute.js')(app);

require('../route/get_sales_order_route.js')(app);



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
