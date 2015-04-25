var appController = angular.module('appController', ['ipCookie']);

appController.controller('AppCtrl', function ($http, ipCookie) {

    var app = this;
    var socket = io.connect();

    app.isCollapsed = true;

    app.saveProduct = function (newProduct) {
        $http.post("/add", {name: newProduct}).success(function() {
            loadProducts();
        });
    };

    app.removeProduct = function (oldProduct) {
        $http.post("/remove", {name: oldProduct}).success(function() {
            loadProducts();
        });
    };

    app.emitSend = function () {
        socket.emit('send', { message: "sent from client" });
    };

    app.saveCookie = function () {
        ipCookie('name', 'my-name', { expires: 30 });
        app.cookie = ipCookie();
    };

    app.cookie = ipCookie();

    function loadProducts() {
        $http.get("/products").success(function (products) {
            app.products = products;
        })
    }

    loadProducts();

    socket.on('message', function (data) {
        if(data.message) {
            console.log(data.message);
        } else {
            console.log("There is a problem:", data);
        }
    });
});