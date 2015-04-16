var module = angular.module("mean", []);

module.controller("AppCtrl", function ($http) {

    //var url = "http://localhost:3000";
    var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

    var app = this;

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

    function loadProducts() {
        $http.get("/products").success(function (products) {
            app.products = products;
        })
    }
    loadProducts();
})