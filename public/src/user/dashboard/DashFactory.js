/*
Shreyansh Nahata 

*/

(function () {
    'use strict'

    angular.module('ubmkuser')
        .factory('Dashboard', function ($http) {
            return {
              getBookings: function (uidno) {
                return $http.get('/bookings/'+uidno);
              }
            }
        })
})();
