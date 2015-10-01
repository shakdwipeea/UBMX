/*(function  () {*/
	'use strict'

angular.module('accctrl' , [])

		.controller('AccountController', function  ( $rootScope , $location , Account ) {
			var self = this;
			self.loggedIn = Account.isLoggedIn();
			$rootScope.$on('$routeChangeStart', function(){
				self.loggedIn = Account.isLoggedIn();

			Account.getUserNames()
					.then(function(data){
						self.user = data.data;
					});
		});

			self.doLogin = function(){
				self.processing = true;
				self.error = "";


				Account.login({'email' : self.loginData.username, 'password': self.loginData.password})
						.success(function(data){
							self.processing = false;

			
			Account.getUserNames()
					.then(function(data){
						self.user = data.data;
					});
						if(data.success)
							$location.path('/');
						else
							self.error = data.message;

						});

		}
			self.doLogout = function(){
				Account.logout();
				$location.path('/logout');
			}


});



