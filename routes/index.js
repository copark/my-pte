var express = require('express');
var router = express.Router();
var fs = require('fs');
var clog = require('clog');

clog.configure({"log level":5});

const dir = 'public/images/';

function initImages() {
    var path = process.cwd();
    console.log('initImages');
    clog.log("initImages " + path);
    var images = [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        images.push(dir + '/' + files[i]);
        console.log(files[i]);
    }
    return images;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.redirect('pte.html');
});

router.get('/*.html', function(req, res, next) {
    clog.log("url  " + req.url);
    var url = req.url.substring(1);
    var suburl = url;

    if (url.indexOf("?") > -1) {
        suburl = url.substring(0, url.indexOf("?"));
    }
    res.render(suburl);
});

router.all("/initImages", function(req, res, next) {
    clog.log("initImages call " + req);
    var params = {};
    if (req.method == "GET") {
        params = req.query;
    } else if (req.method == "POST") {
        params = req.body;
    }
    res.status(200).json(JSON.stringify(initImages()));
});

module.exports = router;
