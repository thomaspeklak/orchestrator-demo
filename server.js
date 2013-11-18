"use strict";

var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    fs.createReadStream(__dirname + req.url.replace(/\?.*/, "")).pipe(res);
}).listen(process.env.PORT || 3001);
