(function () {
	'use strict';

	angular.module('ubmk',['ui.router', 'toaster', 'ngAnimate'])
			.config( function  ($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/login');

				$stateProvider
						.state('main', {
							url:'/login',
							templateUrl: '/src/login/login.tpl',
							controller:'LoginController as login'
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
			;

			});

})();

/**

git rm -r --cached .

**/
