/**
 * Created by Akash on 01-10-2015.
 */
angular.module('ubmk')
    .controller('BookingTypeController', function (Dash, $state) {
        var self = this;
        var booking_type = Dash.getBookingType();

        self.adding = false;

        /*        if (Array.isArray(booking_type)) {
         self.booking_type = booking_type;
         } else {
         booking_type.then(function (booking_type) {
         self.booking_type = booking_type;
         });
         }*/

        self.data = Dash.theData;

        self.showAdd = function () {
            self.adding = true;
            $state.go('dash.booking_type.add');
        }
    });