/**
 * Created by Akash on 29-09-2015.
 */
angular.module("ubmk")
    .controller('UserController', function (Dash) {
        console.log("Usr COntroller");
        var self = this;

        /**
         * todo add edit
         */
        var users = Dash.getUsers();

        if (Array.isArray(users)) {
            self.users = users;
        } else {
            users.then(function (users) {
                self.users = users;
            })
        }
    });