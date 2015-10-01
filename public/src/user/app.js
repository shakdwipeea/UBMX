/*(function () {*/
    'use strict';
angular.module('user', ['userRoutes','accctrl' , 'userService']);


/*        .config(function ( $stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            var dir = '/public/src/user/';

            $stateProvider

                .state('user', {
                    url: '/',
                    templateUrl: dir + 'account/account.tpl',
                    controller: 'AccountController as account'
                })

                .state('users.login', {
                    url: '/users/login',
                    templateUrl: dir + 'account/login/login.tpl',
                    controller: 'LoginController as login'
                })

                .state('users.signup', {
                    url: '/users',
                    templateUrl: dir + 'account/signup/signup.tpl',
                    controller: 'SignUpController as signup'
                })


            ;
        });

*//*})();*/
