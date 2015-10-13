/*
Shreyansh Nahata 

*/

(function () {
    'use strict'

    angular.module('ubmkuser')
        .factory('Booking', function ($http) {
            return {
              getVehicles: function () {
                return $http.get('/vehicles');
              },
              getProblems: function(){
                return $http.get('/problems');
              },
              getVendor: function( vendor ){ 
              	return $http.get('/vendors');
              },
              do_booking: function(data){
                return $http.post('/bookings', data)
                  .then(function(response){
                    console.log(response);
                    return response;
                  })
              },
              getBookingType : function(){
                return $http.get('/booking_type');
              } 

            }
        })
})();
