/*
Created By : Shreyansh Nahata 

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
              getVendor: function(locations){ 
              	return $http.get('/vendors/'+locations);
              },
              getVendor_lat_long: function(lat, lon){ 
                return $http.get("/vendors/lat_lng/?lat="+lat+"/?lng="+lon);
              },
              getSlots: function( vendorid,datesel ){ 
                /*return $http({
                   url: "/slots", 
                   method: "GET",
                   params: {vendor_id: vendorid}
                });*/
                return $http.get('/slots/'+vendorid+"/?slot_day="+datesel);
              },
              do_booking: function(data){
                return $http.post('/bookings', data)
                  .then(function(response){
                    console.log(response);
                    return response;
                  })
              },
             getDates : function (){
                var itr = moment.twix(moment((moment().date()+1).toString(),"DD"),
                  moment().add(15, 'days')).iterate("days");
                var range=[];
                while(itr.hasNext()){
                  range.push(itr.next().toString().replace(" 00:00:00 GMT+0530" , ""))
                }
                return range;
              },
              getBookingType : function(){
                return $http.get('/booking_type');
              } 

            }
        })
})();
