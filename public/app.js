var module = angular.module("mean", []);

module.controller("AppCtrl", function ($http) {

    //var url = "http://localhost:3000";
    var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

    var app = this;

    app.saveProduct = function (newProduct) {
        $http.post(url + "/add", {name: newProduct}).success(function() {
            loadProducts();
        });
    };

    app.removeProduct = function (oldProduct) {
        $http.post(url + "/remove", {name: oldProduct}).success(function() {
           loadProducts();
        });
    };

    function loadProducts() {
        $http.get(url + "/products").success(function (products) {
            app.products = products;
        })
    }
    loadProducts();
})