/**
 * Created by Akash on 29-09-2015.
 */
angular.module("ubmk")
    .factory('Dash', function ($http, User) {
        var users = [],
            bookings = [],
            vendors = [],
            vehicles = [],
            problems = [],
            booking_type = [];


        return {
            getUsers: function () {
                if (users.length > 0) {
                    return users;
                } else {
                    return $http.get('/users', {
                        params: {
                            token: User.getToken()
                        }
                    }).then(function (response) {
                        console.log('GetUsers', response);
                        users = response.data.users;
                        return response.data.users;
                    }).catch(function (reason) {
                        console.log(reason);
                        return users;
                    });
                }
            },

            getBookings: function () {
                if (bookings.length > 0) {
                    return bookings;
                } else {
                    return $http.get('/bookings', {
                        params: {
                            token: User.getToken()
                        }
                    }).then(function (response) {
                        console.log('GetUsers', response);
                        bookings = response.data.bookings;
                        return response.data.bookings;
                    }).catch(function (reason) {
                        console.log(reason);
                        return bookings;
                    });
                }
            },

            getVendors: function () {
                if (vendors.length > 0) {
                    return vendors;
                } else {
                    return $http.get('/vendors')
                        .then(function (response) {
                            vendors = response.data.vendors;
                            return response.data.vendors;
                        }).catch(function (reason) {
                            console.log(reason);
                            return vendors;
                        })

                }
            },

            getVehicles: function () {
                if (vehicles.length > 0) {
                    return vehicles;
                } else {
                    return $http.get('/vehicles')
                        .then(function (response) {
                            vehicles = response.data.vehicles;
                            return response.data.vehicles;
                        }).catch(function (reason) {
                            console.log(reason);
                            return vehicles;
                        })

                }
            },

            getProblems: function () {
                if (problems.length > 0) {
                    return problems;
                } else {
                    return $http.get('/problems')
                        .then(function (response) {
                            problems = response.data.problems;
                            console.log("Problems", problems);
                            return response.data.problems;
                        }).catch(function (reason) {
                            console.log(reason);
                            return problems;
                        })

                }
            },

            getBookingType: function () {
                if (booking_type.length > 0) {
                    return booking_type;
                } else {
                    return $http.get('/booking_type')
                        .then(function (response) {
                            booking_type = response.data.types;
                            return response.data.types;
                        }).catch(function (reason) {
                            console.log(reason);
                            return booking_type;
                        })

                }
            }
        }
    });