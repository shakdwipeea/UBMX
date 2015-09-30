angular.module('userRoutes' , ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'app/src/user/test1.ejs'
			
		})
})