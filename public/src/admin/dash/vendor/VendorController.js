/**
 * Created by Akash on 01-10-2015.
 */

angular.module('ubmk')
    .controller('VendorController', function (Dash, $state) {
        console.log('Vendor Controller');

        var self = this;
        var vendors = Dash.getVendors();

        self.addingVendor = false;

        self.data = Dash.theData;

        self.addVendor = function () {
            self.addingVendor = true;
            $state.go('dash.vendor.add');
        }

    });