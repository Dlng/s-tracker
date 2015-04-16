var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('port', (process.env.PORT || 5000));

//var databaseUrl = 'mongodb://localhost/mean';
var databaseUrl = process.env.MONGOLAB_URL;
var mongoose = require("mongoose");
mongoose.connect(databaseUrl);

var Product = mongoose.model('Product', {name: String});

app.get("/products", function (reg, res) {
    Product.find(function (err, products) {
        res.send(products);
    })
});

app.post("/add", function(req, res) {
    var name = req.body.name;
    var product = new Product({name: name});
    product.save(function(err) {
        res.send();
    });
});

app.post("/remove", function(req, res) {
    var name = req.body.name;
    Product.remove({name: name}, function(err) {
        res.send();
    });
});

app.listen(app.get('port'));


//var product = new Product({name: "Webstorm"});
//product.save(function (err) {
//    if (err) {
//        console.log('failed');
//    } else {
//        console.log('saved');
//    }
//});