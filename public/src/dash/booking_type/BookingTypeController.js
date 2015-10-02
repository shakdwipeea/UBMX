/**
 * Created by Akash on 01-10-2015.
 */
angular.module('ubmk')
    .controller('BookingTypeController', function (Dash) {
        var self = this;
        var booking_type = Dash.getBookingType();

        if (Array.isArray(booking_type)) {
            self.booking_type = booking_type;
        } else {
            booking_type.then(function (booking_type) {
                self.booking_type = booking_type;
            });
        }
    });