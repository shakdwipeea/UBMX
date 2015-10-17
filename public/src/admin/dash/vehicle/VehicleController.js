/**
 * Created by Akash on 01-10-2015.
 */
angular.module('ubmk')
    .controller('VehicleController', function (Dash, $state) {
        console.log("Vehicle Controller");

        var self = this;
        var vehicles = Dash.getVehicles();

        self.data = Dash.theData;

        self.addingVehicle = false;

        self.addVehicle = function () {
            self.addingVehicle = true;
            $state.go('dash.vehicle.add');
        }
    });