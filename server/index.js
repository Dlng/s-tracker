module.exports = function(app, mongoose) {

    var Product = require('./models/productModel')(mongoose);
    var User = require('./models/userModel')(mongoose);

    require('./routes/routes')(app, Product);

};