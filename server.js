"use strict";

var http = require("http");
var fs = require("fs");

var template = fs.readFileSync("./demo.html").toString();

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method == "POST") {

        var data;
        req.on("data", function (chunk) {
            data = chunk.toString().split("&").map(function (d) {
                return d.split("=");
            });
        });
        req.on("end", function () {
            var t = template.replace("<form", "<h2>Form Data</h2><pre>" + JSON.stringify(data).replace(/\]/g, "]\n") + "</pre><form");
            return res.end(t);
        });

        return;
    }

    try {
        fs.createReadStream(__dirname + req.url.replace(/\?.*/, "")).pipe(res);
    } catch (e) {
        res.writeHead(500);
        res.end();
    }
}).listen(process.env.PORT || 3001);
