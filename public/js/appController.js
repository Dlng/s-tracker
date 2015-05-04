var appController = angular.module('appController', ['ipCookie']);

appController.controller('loginCtrl', function ($http, $location, $rootScope) {

    this.login = function (email, password) {
        $http.post("/login", {email: email, password: password}).success(function(response) {
            console.log(response.message + " " + email + password);
            if (response.message === "sign in successful") {
                $rootScope.currentUser = email;
                $location.path("/project");
            }
        });
    };

});

appController.controller('signupCtrl', function($http, $location, $rootScope) {

    this.signup = function (email, password) {
        $http.post("/signup", {email: email, password: password}).success(function(response) {
            console.log(response.message);
            if (response.message === "no user found") {
                $rootScope.currentUser = email;
                $location.path("/project");
            }
        });
    }

});

appController.controller('AppCtrl', function ($http, ipCookie, $rootScope, $location) {

    var socket = io.connect();
    var app = this;

    this.currentUser = $rootScope.currentUser;
    this.isCollapsed = true;

    this.saveProduct = function (newProduct) {
        $http.post("/add", {name: newProduct}).success(function() {
            loadProducts();
        });
    };

    this.removeProduct = function (oldProduct) {
        $http.post("/remove", {name: oldProduct}).success(function() {
            loadProducts();
        });
    };

    this.emitSend = function () {
        socket.emit('send', { message: "sent from client" });
        console.log("emitSend");
    };

    this.saveCookie = function () {
        ipCookie('name', 'my-name', { expires: 30 });
        this.cookie = ipCookie();
    };

    this.logout = function () {
        $http.get("/logout").success(function() {
            $rootScope.currentUser = '';
            $location.path("/");
        });
    };

    this.cookie = ipCookie();

    function loadProducts() {
        $http.get("/products").success(function (products) {
            app.products = products;
        })
    }


    loadProducts();
});