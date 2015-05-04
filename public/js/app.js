var app = angular.module('app', ['appController', 'ui.router', 'ipCookie']);


console.log("beforehello");

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$urlRouterProvider.otherwise("/project");

    console.log("hello");

    $stateProvider.state('anno', {
        url: "",
        templateUrl: "partials/anno.html",
        data: {
            requireLogin: false
        }
    }).state('anno1', {
        url: "/",
        templateUrl: "partials/anno.html",
        data: {
            requireLogin: false
        }
    }).state('login', {
        url: "/login",
        templateUrl: "partials/login.html",
        controller: "loginCtrl as loginCtrl",
        data: {
            requireLogin: false
        }
    }).state('signup', {
        url: "/signup",
        templateUrl: "partials/signup.html",
        controller: "signupCtrl as signupCtrl",
        data: {
            requireLogin: false
        }
    }).state('auth', {
        templateUrl: "partials/auth.html",
        controller: "AppCtrl as app",
        data: {
            requireLogin: true
        }
    }).state('auth.project', {
        url: "/project",
        templateUrl: "partials/auth/project.html",
        data: {
            requireLogin: true
        }
    }).state('auth.project.test', {
        url: "/new",
        templateUrl: "partials/auth/test.html",
        data: {
            requireLogin: true
        }
    }).state('auth.project.home', {
        url: "/new",
        templateUrl: "partials/auth/home.html",
        data: {
            requireLogin: true
        }
    }).state('auth.project.notes', {
        url: "/new",
        templateUrl: "partials/auth/a.html",
        data: {
            requireLogin: true
        }
    }).state('auth.project.new', {
        url: "/new",
        templateUrl: "partials/auth/a.html",
        data: {
            requireLogin: true
        }
    }).state('auth.profile', {
        url: "/profile",
        templateUrl: "partials/auth/profile.html",
        data: {
            requireLogin: true
        }
    });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);

});

app.run(function ($rootScope, $http, $state) {

    $http.get("/session").success(function (result) {
        if (result !== '') {
            $rootScope.currentUser = result.user;
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            console.log("stateChangeStart");
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                console.log("restricted");
                $state.go('login');
            }
        });
    });

});

var socket = io.connect();

socket.on('message', function (data) {
    if(data.message) {
        console.log(data.message);
    } else {
        console.log("There is a problem:", data);
    }
});