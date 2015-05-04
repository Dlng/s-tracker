/**
 * Created by dave on 23/04/15.
 */


function restrict(req, res, next) {
    if (req.user) {
        console.log('permitted');
    } else {
        //req.session.error = 'Access denied!';
        //res.redirect('/login');
        console.log('denied');
    }
}

module.exports = function (app, Product, passport) {

    app.get("/session", function(req, res) {
        if (req.user) {
            return res.send({'user': req.user.email});
        } else {
            return res.send();
        }
    });

    app.post("/login", function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                return res.send(info);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(info);
            });
        })(req, res, next);
    });

    app.get("/logout", function(req, res) {
        req.logOut();
        res.send();
    });

    app.post("/signup", function(req, res, next) {
       passport.authenticate('local-signup', function(err, user, info) {
           if (err) { return next(err) }
           if (!user) {
               return res.send(info);
           }
           req.logIn(user, function(err) {
               if (err) {return next(err)}
               return res.send(info);
           });
        })(req, res, next);
    });

    app.get("/products", function (req, res) {
        restrict(req, res);
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