(function () {
    'use strict';

    angular.module('ubmk', ['ui.router', 'toaster', 'ngAnimate'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('main', {
                    url: '/login',
                    templateUrl: '/src/admin/login/login.tpl',
                    controller: 'LoginController as login'
                })
                .state('dash', {
                    url: '/dash',
                    templateUrl: '/src/admin/dash/dash.tpl',
                    controller: 'DashController as dash1'
                })
                .state('dash.infoBoard', {
                    url: '/info',
                    templateUrl: '/src/admin/dash/infoBoard/infoBoard.tpl',
                    controller: 'InfoBoardController as info'
                })
                .state('dash.user', {
                    url: '/user',
                    templateUrl: '/src/admin/dash/user/user.tpl',
                    controller: 'UserController as user'
                })
                .state('dash.booking', {
                    url: '/booking',
                    templateUrl: '/src/admin/dash/booking/booking.tpl',
                    controller: 'BookingController as booking'
                })
                .state('dash.vendor', {
                    url: '/vendor',
                    templateUrl: '/src/admin/dash/vendor/vendor.tpl',
                    controller: 'VendorController as vendor'
                })
                .state('dash.vendor.add', {
                    url: '/add',
                    templateUrl: '/src/admin/dash/vendor/addVendor/addVendor.tpl',
                    controller: 'AddVendorController as addVendor'
                })
                .state('dash.vehicle', {
                    url: '/vehicle',
                    templateUrl: '/src/admin/dash/vehicle/vehicle.tpl',
                    controller: 'VehicleController as vehicle'
                })
                .state('dash.vehicle.add', {
                    url: '/add',
                    templateUrl: '/src/admin/dash/vehicle/add/add.tpl',
                    controller: 'AddVehicleController as addVehicle'
                })
                .state('dash.problem', {
                    url: '/problem',
                    templateUrl: '/src/admin/dash/problem/problem.tpl',
                    controller: 'ProblemController as problem'
                })
                .state('dash.problem.add', {
                    url: '/add',
                    templateUrl: '/src/admin/dash/problem/add/add.tpl',
                    controller: 'AddProblemController as addProblem'
                })
                .state('dash.booking_type', {
                    url: '/booking_type',
                    templateUrl: '/src/admin/dash/booking_type/booking_type.tpl',
                    controller: 'BookingTypeController as bookingType'
                })
                .state('dash.booking_type.add', {
                    url: '/add',
                    templateUrl: '/src/admin/dash/booking_type/add/add.tpl',
                    controller: 'AddBookingTypeController as add'
                })

            ;

        });

})();

/**

 git rm -r --cached .

 **/
