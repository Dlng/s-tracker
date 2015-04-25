/**
 * Created by dave on 23/04/15.
 */


function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

module.exports = function (app, Product) {

    app.get("/products", function (reg, res) {
        Product.find(function (err, products) {
            res.send(products);
        })
    });

    app.post("/add", function (req, res) {
        var name = req.body.name;
        var product = new Product({name: name});
        product.saveSimple(res);
    });

    app.post("/remove", function (req, res) {
        var name = req.body.name;
        Product.remove({name: name}, function (err) {
            res.send();
        });
    });

    app.use(function(req, res, next) {
        res.status(404).send('404 Sorry cant find that!');
    });

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

};