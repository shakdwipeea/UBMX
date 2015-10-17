/**
 * Created by Akash on 29-09-2015.
 */
angular.module("ubmk")
    .controller('BookingController', function (Dash) {
        console.log("Booking COntroller");
        var self = this;

        var bookings = Dash.getBookings();

        if (Array.isArray(bookings)) {
            self.bookings = bookings;
        } else {
            bookings.then(function (bookings) {
                self.bookings = bookings;
            })
        }
    });