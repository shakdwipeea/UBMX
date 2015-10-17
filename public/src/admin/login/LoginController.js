/**
 * Created by akash on 22/7/15.
 */

angular.module('ubmk')
    .controller('LoginController', function (User, $state, toaster) {
        console.log("main Controller");

        var self = this;
        self.loginText = "Submit";
        self.doLogin = function () {
            self.loginText = "Please Wait.......";
            console.log("Username & Password", self.user);
            User.login(self.user)
                .then(function (response) {
                    console.log('Toast');

                    if (response.data.error) {
                        toaster.pop('error', 'Error', 'Damn Boy Damn!!');
                    } else {
                        toaster.pop('success', 'Success', 'Verified');
                    }

                    $state.go('dash');
                })
                .catch(function (error) {
                    console.log(error.data.error);
                    toaster.pop('error', 'Error', 'Damn Boy Damn!!');
                    self.loginText = "Submit";
                });
        };
    });
