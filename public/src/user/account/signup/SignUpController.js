/*(function  () {
	'use strict'

	angular.module('user')
		.controller('SignUpController', function  (Account, $state) {
			var self = this;
			self.message = "";
			self.checkUserName = function () {
				console.log("Function called");
				Account.getUserNames()
						.then(function (response) {

							if (!response.data) {
								self.enable = true;
							} else {

								var index = response.data.indexOf(self.username);

								if (index !== -1) {
									self.message = "Username taken";
									self.enable = false;
								} else {
									self.message = "";
									self.enable = true;
								}
							}

						})
			};

			self.submit =function() {
				console.log(self);

				var data = {
					username: self.username,
					password: self.password,
					email: self.email
					phone: self.phone
				};

				Account.signUp(data)
					.then(function  (response) {

						Account.login({
							email: data.email,
							password: data.password
						}).then(function () {
							$state.go('/');
						}).catch(function (reason) {
							console.log(reason);
						})
					})
					.catch(function  (reason) {
						console.log(reason);
						//toaster.pop('error', 'Error', reason.data.err);
					});
			}
		});
})();*/