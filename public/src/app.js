(function () {
	'use strict';

	angular.module('ubmk',['ui.router', 'toaster', 'ngAnimate'])
			.config( function  ($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/login');

				$stateProvider
                    .state('main', {
                        url: '/login',
                        templateUrl: '/src/login/login.tpl',
                        controller: 'LoginController as login'
                    })
                    .state('dash', {
                        url: '/dash',
                        templateUrl: '/src/dash/dash.tpl',
                        controller: 'DashController as dash1'
                    })
                    .state('dash.infoBoard', {
                        url: '/info',
                        templateUrl: '/src/dash/infoBoard/infoBoard.tpl',
                        controller: 'InfoBoardController as info'
                    })
                    .state('dash.user', {
                        url: '/user',
                        templateUrl: '/src/dash/user/user.tpl',
                        controller: 'UserController as user'
                    })
                    .state('dash.booking', {
                        url: '/booking',
                        templateUrl: '/src/dash/booking/booking.tpl',
                        controller: 'BookingController as booking'
                    })
                    .state('dash.vendor', {
                        url: '/vendor',
                        templateUrl: '/src/dash/vendor/vendor.tpl',
                        controller: 'VendorController as vendor'
                    })
                    .state('dash.vehicle', {
                        url: '/vehicle',
                        templateUrl: '/src/dash/vehicle/vehicle.tpl',
                        controller: 'VehicleController as vehicle'
                    })
                    .state('dash.problem', {
                        url: '/problem',
                        templateUrl: '/src/dash/problem/problem.tpl',
                        controller: 'ProblemController as problem'
                    })
                    .state('dash.booking_type', {
                        url: '/booking_type',
                        templateUrl: '/src/dash/booking_type/booking_type.tpl',
                        controller: 'BookingTypeController as bookingType'
                    })

			;

			});

})();

/**

git rm -r --cached .

**/
