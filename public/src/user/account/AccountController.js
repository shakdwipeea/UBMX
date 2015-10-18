(function  () {
	'use strict'

	angular.module('ubmkuser')
		.controller('AccountController', function  ( Account, $state ) {
			var self = this;
			
			/*self.loggedIn = Account.isLoggedIn();*/

			self.logout = function(){
				Account.logout()
				.then(function(response){
					$state.go('main')
				}).catch(function(reason){
					console.log(reason);
				})
			};
		});
})();