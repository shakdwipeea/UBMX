/*(function  () {*/
	'use strict'

angular.module('userService' , [])

	.factory('Account', function($http, userToken){
			var token = null;
			userAuth = {}
			function signUp(data) {
				return $http.post('/users', data);
			}

			userAuth.login = function(data) {
				return $http.post('/users/login', data)
						.then(function (response) {
							console.log(response);
							userToken.setToken(response.data.token);
							return response;
						})
			}

			userAuth.getUserNames = function(){
				return $http.get('/');
			}

			userAuth.logout = function(){
				/*token = null;
				return token;*/
				userToken.setToken();
			}
			/*userAuth.getToken = function () {
				return token;
			}*/
			userAuth.isLoggedIn = function(){
				if(userToken.getToken())
					return true;
				else 
					return false;
			}
			return userAuth;
			/*return {
				signUp: signUp,
				login: login,
				getUserNames: usernames,
				getToken: getToken
			}*/
		})

	.factory('userToken' , function($window){
		var userTokenFactory = {};

		userTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');
		}
		userTokenFactory.setToken = function (token){
			if(token){
				$window.localStorage.setItem('token' , token);
			}
			else
				$window.localStorage.removeItem('token');
		}
		return userTokenFactory;
	})


	.factory('userCheck',function($q , $location , userToken){
		var checkFactory  = {};
		checkFactory.request = function(config){
			if(token){
				config.headers['x-access-token'] = token;
			}
			return config;
		};

		checkFactory.responseError = function(response){
			if(response.status == 403)
				$location.path('/users/login');
			$q.reject(response);
		}
		return checkFactory;
	});