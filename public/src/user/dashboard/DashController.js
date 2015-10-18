(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('DashController', function (Account, $stateParams, Dashboard) {
          var self = this;
          var uidno = Account.getUserId();
          console.log(uidno);
          Dashboard.getBookings(uidno)
            .then(function (response) {
              console.log(response);
              self.results = response.data.bookings;
            })
            .catch(function (reason) {
              console.log(reason);
            })
        })
})();
