/**
 * Created by Akash on 17-10-2015.
 */
angular.module('ubmk')
    .controller('AddVendorController', function (Dash) {
        var self = this;

        Dash.getBookingType();
        Dash.getProblems();

        self.data = Dash.theData;

        self.add = function () {
            console.log(self.vendor);

            var vendorDetails = {
                name: self.vendor.username,
                password: self.vendor.password,
                email: self.vendor.email,
                capacity_per_slot: self.vendor.capacity_per_slot,
                timings: self.vendor.timings,
                location: self.vendor.location,
                lat: self.vendor.lat,
                lng: self.vendor.lng
            };

            vendorDetails.problem_ids = Object.keys(self.vendor.problems)
                .filter(function (id) {
                    return !!self.vendor.problems[id];
                });

            vendorDetails.booking_type_ids = Object.keys(self.vendor.booking_type)
                .filter(function (id) {
                    return !!self.vendor.booking_type[id];
                });

            console.log("Add thos vendor", vendorDetails);

            Dash.addVendor(vendorDetails)
                .then(function (response) {
                    Dash.getVendors(true);
                    self.vendor = null;
                })
                .catch(function (reason) {
                    console.log(reason.data.error);
                })

        }
    });