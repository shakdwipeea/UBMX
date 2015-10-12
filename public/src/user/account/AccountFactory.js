(function  () {
	'use strict'

	angular.module('ubmkuser')
		.factory('Account', function  ($http, $window) {
			var token = null;
			var id = null;
			function signUp (data) {
				return $http.post('/users', data);
			}

			function login (data) {
				return $http.post('/users/login', data)
						.then(function (response) {
							console.log(response);
							token = response.data.token;
							id = response.data.id;
							$window.localStorage.setItem('token' , token);
							return response;
						})
			}
			function logout(){
				token = null;
				id = null;
				$window.localStorage.removeItem('token');
			}
			function isloggedIn(){
				if(token && id)
					return true;
				else
					return false;
			}
			
			function usernames () {
				return $http.get('/users');
			}
			function getUserId () {
				return id;
			}
			function getToken () {
				return token;
			}

			return {
				signUp: signUp,
				login: login,
				getUserNames: usernames,
				getToken: getToken
			}
		});
})();