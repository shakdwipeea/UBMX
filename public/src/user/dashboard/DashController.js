(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('DashController', function ($stateParams, Dashboard) {
          var self = this;

          Dashboard.getBookings()
            .then(function (response) {
              console.log(response);
              self.results = response.data.bookings;
            })
            .catch(function (reason) {
              console.log(reason);
            })
        })
})();
