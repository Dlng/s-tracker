var app = angular.module('app', ['appController', 'ui.router', 'ipCookie']);


console.log("beforehello");

app.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise("/project");

    console.log("hello");

    $stateProvider.state('project', {
        url: "/project",
        templateUrl: "partials/project.html",
        data: {
            requireLogin: false
        }
    }).state('project.new', {
        url: "/new",
        templateUrl: "partials/a.html",
        data: {
            requireLogin: true
        }
    }).state('user', {
        url: "/user",
        templateUrl: "partials/user.html",
        data: {
            requireLogin: true
        }
    })

});

app.run(function ($rootScope) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        console.log("stateChangeStart");
        //var requireLogin = toState.data.requireLogin;
        //
        //if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        //    event.preventDefault();
        //    console.log("hello");
        //}
    });

});