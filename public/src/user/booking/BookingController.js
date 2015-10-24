/*
Created By : Shreyansh Nahata 

*/
(function () {
    'use strict'

    angular.module('ubmkuser')
        .controller('BookingController', function (Booking, Account, $state, $rootScope, $window) {
            

            var self = this;
            self.message="";
            self.slot = 11; /*default slot value*/
            self.location = "";
            self.latit = null;
            self.longi = null;
            self.vendor_value = false;
            self.remaining_body = false;
            self.problem_specific = false;
            self.vendor_value = true;
            self.remaining_body = true;
            self.t_id = 0;                  /*Used type_id = 0 for general services and type_id = 1 for problem_specific services*/
            self.problem_specific = true;

            self.submit = function () {

              var uidno = Account.getUserId();
              self.userid = uidno;
              console.log(uidno);
              
              Booking.do_booking({
                user_id : uidno,
                type_id : self.t_id,
                vendor_id :self.ven_id,
                problem_id : self.p_id,
                pickup_addr : self.paddr,
                drop_addr : self.daddr,     /*ToDo implement change of address thing in v 2*/
                vehicle_id : self.v_id,      /*vehicle_id to be added*/
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
            
            self.ven_locations = function(){
              console.log('location');
              if(self.t_id == 1){
                self.problem_specific = false;
              }
              self.vendor_value = false;
              Booking.getVendor(self.locations)
              .then(function(response){
                console.log(response);
                self.vendors = response.data.vendors;
              }).catch(function(reason){
                console.log(reason);
              })
            }

             self.ven_lat_long = function(){
              console.log('lat_long');
              self.vendor_value = false;
              self.latit = $window.localStorage.getItem('lat_pickup').toString();
              self.longi = $window.localStorage.getItem('lon_pickup').toString();
              Booking.getVendor_lat_long(self.latit,self.longi)
              .then(function(response){
                console.log(response);
                self.vendors = response.data.vendors;
              }).catch(function(reason){
                console.log(reason);
              })
            }
            self.slotsmatter = function(){
              console.log("slotsmatter");
                self.problem_specific = false;
                self.remaining_body = false;    
                Booking.getSlots(self.ven_id, self.date)
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