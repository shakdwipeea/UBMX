/*
Shreyansh Nahata 

*/
(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('BookingController', function (Booking, Account, $state, $rootScope) {
            var self = this;

            self.submit = function () {
            	Booking.do_booking({
            		user_id : Account.getUserId,
            		vehicle_id : self.v_id,
            		vendor_id :self.ven_id,
            		type_id : self.t_id,
            		problem_id : self.p_id,
            		status : "Processing",
            		slot_id : null,
            		feedback : null,
            		rating : null
            		}).then(function(){
            			$state.go('dash')
            		}).catch(function(reason){
            			console.log(reason);
            			self.message = "Their is a problem in booking !!";
            		})
            
            };

            console.log("Booking");
            Booking.getVehicles()
	           	.then(function(response){
		             console.log(response);
		             self.vehicles = response.data.vehicles;

		            /* $("select").material_select();*/
	              })
	           	.catch(function(reason){
	              	console.log(reason);
	              })

            Booking.getVendor()
           	.then(function(response){
             console.log(response);
             self.vendors = response.data.vendors;
              }).catch(function(reason){
              	console.log(reason);
             })
            /*slot_id = vendor_list.capacity_per_slot;*/
            Booking.getBookingType()
           	.then(function(response){
             console.log(response);
             self.b_types = response.data.booking_type;
             
              }).catch(function(reason){
              	console.log(reason);
             })

              
            Booking.getProblems()
           	.then(function(response){
             console.log(response);
             self.problems = response.data.problems;

              }).catch(function(reason){
              	console.log(reason);
             })
            

            
            			            
        });
})();