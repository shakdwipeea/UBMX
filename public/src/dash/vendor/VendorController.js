/**
 * Created by Akash on 01-10-2015.
 */

angular.module('ubmk')
    .controller('VendorController', function (Dash) {
       console.log('Vendor Controller');

        var self = this;
        var vendors = Dash.getVendors();

        if (Array.isArray(vendors)) {
            self.vendors = vendors;
        } else {
            vendors.then(function (vendors) {
                self.vendors = vendors;
            });
        }

    });