/*(function () {
    'use strict'

    angular.module('user')
        .controller('LoginController', function (Account, $state, $rootScope) {
            var self = this;

            self.submit = function () {
                Account.login({
                    email: self.email,
                    password: self.password
                }).then(function () {
                    $state.go('/');
                }).catch(function (reason) {
                    console.log(reason);
                    self.Message = "Incorrect Username or Password";
                })
            }
        });
})();*/