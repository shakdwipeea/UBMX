/*
Created By : Shreyansh Nahata 

*/
(function  () {
	'use strict'

	angular.module('ubmkuser')
		.controller('AccountController', function  ( Account, $state ) {
			var self = this;
			
			self.loggedin = Account.isloggedIn();
			console.log(Account.isloggedIn());

			self.logout = function(){
				Account.logout()
				/*.then(function(response){
					$state.go('account')
				}).catch(function(reason){
					console.log(reason);
				})*/
			};
		});
})();