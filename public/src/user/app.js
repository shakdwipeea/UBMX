(function () {
    'use strict';

    angular.module('ubmkuser', ['ui.router', 'toaster', 'ngAnimate','scDateTime'])
        .config(function ($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise('/customer');

            var dir = 'src/user/';

            $stateProvider

                .state('account', {
                    url: '/customer',
                    templateUrl: dir + 'account/account.tpl',
                    controller: 'AccountController as account'
                })

                .state('account.login', {
                    url: '/login',
                    templateUrl: dir + 'account/login/login.tpl',
                    controller: 'LoginController as login'
                })

                .state('account.signup', {
                    url: '/signup',
                    templateUrl: dir + 'account/signup/signup.tpl',
                    controller: 'SignUpController as signup'
                })
                .state('account.logout',{
                    url: '/customer',
                    templateUrl: dir + 'account/account.tpl',
                    controller: 'AccountController as account'
                })
                .state('dash',{
                    url: '/dashboard',
                    templateUrl: dir + 'dashboard/dash.tpl',
                    controller: 'DashController as dash'
                })
                .state('booking' , {
                    url: '/booking',
                    templateUrl: dir + 'booking/booking.tpl' ,
                    controller : 'BookingController as book'
                })

                .state('booking.login', {
                    url: '/login',
                    templateUrl: dir + 'account/login/login.tpl',
                    controller: 'LoginController as login'
                })
            ;
        });

})();
