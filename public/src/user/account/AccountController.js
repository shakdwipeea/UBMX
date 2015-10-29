/*
Created By : Shreyansh Nahata 

*/
(function  () {
	'use strict'

	angular.module('ubmkuser')
		.controller('AccountController', function  ( Account, $state, $window ) {
			var self = this;
			
			self.loggedin = Account.isloggedIn();
			console.log(Account.isloggedIn());

			self.logout = function(){
				//self.loggedin = false;
				Account.logout();
			};
		});
})();