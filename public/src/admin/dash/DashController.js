/**
 * Created by akash on 22/7/15.
 */

angular.module('ubmk')
    .controller('DashController', function ($state, User, $scope) {
        console.log("dash Controller");

        if (!User.isLoggedIn()) {
            $state.go('main');
            return
        }

        $scope.select = 'dashboard';
        $state.go('dash.infoBoard');

        var dash = this;
        dash.add = function () {
            console.log('Trying to go');
            $state.go('dash.info');
        };

        dash.questionTemp = false;
        dash.testTemp = false;

    });
