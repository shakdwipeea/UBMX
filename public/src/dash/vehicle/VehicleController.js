/**
 * Created by Akash on 01-10-2015.
 */
angular.module('ubmk')
    .controller('VehicleController', function (Dash) {
       console.log("Vehicle Controller");

        var self = this;
        var vehicles = Dash.getVehicles();

        if (Array.isArray(vehicles)) {
            self.vehicles = vehicles;
        } else {
            vehicles.then(function (vehicles) {
                self.vehicles = vehicles;
            });
        }

    });