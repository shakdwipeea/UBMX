/*
Shreyansh Nahata 

*/

(function () {
    'use strict'

    angular.module('ubmkuser')
        .factory('Dashboard', function ($http) {
            return {
              getVehicles: function () {
                return $http.get('/vehicles');
              }
            }
        })
})();
