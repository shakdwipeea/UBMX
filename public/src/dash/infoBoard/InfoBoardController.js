/**
 * Created by akash on 24/7/15.
 */

angular.module('ubmk')
    .controller('InfoBoardController', function ($state, User, Dash) {
        console.log("infoBoard Controller");
        var self = this;

        var users = Dash.getUsers();

        if (Array.isArray(users)) {
            self.no_users = users.length;
        } else {
            users.then(function (users) {
                self.no_users = users.length;
            });
        }


        var bookings = Dash.getBookings();

        if (Array.isArray(bookings)) {
            self.no_bookings = bookings.length;
        } else {
            bookings.then(function (bookings) {
                self.no_bookings = bookings.length;
            });
        }
    });
