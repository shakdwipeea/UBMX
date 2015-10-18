/*
Shreyansh Nahata 

*/
(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('BookingController', function (Booking, Account, $state, $rootScope, $window) {
            

            var self = this;
            self.message="";
            self.slot = 11; /*default slot value*/
            

            self.submit = function () {

              var uidno = Account.getUserId();
              /*var paddr = self.pa1 + self.pa2 + self.pa3 + self.pa4;
              var daddr = self.da1 + self.da2 + self.da3 + self.da4;*/
              console.log(uidno);
              
            	Booking.do_booking({
                    
                user_id : uidno,
                type_id : self.t_id,
                vendor_id :self.ven_id,
                problem_id : self.p_id,
                /*pickup_addr : paddr,
                drop_addr : daddr,  */   /*ToDo implement change of address thing in v 2*/
                /*vehicle_id : self.v_id,   */   /*vehicle_id to be added*/
                slot : self.slot,
                date : self.date

                }).then(function(){
                        $state.go('dash')
            		}).catch(function(reason){
            			console.log(reason);
                  self.message = reason.data.error;
            			/*self.message = "Their is a problem in booking !!";*/
            		})
            };
            
            self.slotsmatter = function(){
              console.log("slotsmatter");
                
                Booking.getSlots(self.ven_id)
                  .then(function(response){
                     console.log(response);
                     self.slots = response.data.times;
                  })
                  .catch(function(reason){
                    console.log(reason);
                  })
              
            }

            console.log("Booking");
            
            Booking.getVehicles()
	           	.then(function(response){
		             console.log(response);
		             self.vehicles = response.data.vehicles;
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


            self.alldates = Booking.getDates();  
            /*console.log(Booking.getDates());  */

            Booking.getBookingType()
           	.then(function(response){
             console.log(response);
             self.b_types = response.data.types;
             
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