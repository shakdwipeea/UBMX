(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('DashboardController', function ($stateParams, Dashboard) {
          var self = this;

          Dashboard.getVehicles()
            .then(function (response) {
              console.log(response);
              self.results = response.data.results;
            })
            .catch(function (reason) {
              console.log(reason);
            })
        })
})();
