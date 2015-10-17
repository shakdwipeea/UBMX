/**
 * Created by Akash on 17-10-2015.
 */
angular.module('ubmk')
    .controller('AddBookingTypeController', function (Dash) {
        var self = this;

        self.submit = function () {
            console.log(self.name);
            Dash.addBookingType(self.name)
                .then(function (response) {
                    Dash.getBookingType(true);
                    self.name = "";
                })
                .catch(function (reason) {
                    console.log("Error", reason.data.error);
                })
        }
    });