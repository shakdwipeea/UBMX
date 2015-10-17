/**
 * Created by Akash on 17-10-2015.
 */
angular.module('ubmk')
    .controller('AddVehicleController', function (Dash) {
        var self = this;

        self.add = function () {
            Dash.addVehicle(self.vehicle)
                .then(function (response) {
                    Dash.getVehicles(true);
                    self.vehicle = null;
                })
                .catch(function (reason) {
                    console.log(reason.data.error);
                })
        }

    });