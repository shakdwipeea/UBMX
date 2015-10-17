/**
 * Created by Akash on 29-09-2015.
 */
angular.module("ubmk")
    .factory('Dash', function ($http, User) {
        var coreData = {
            users: [],
            bookings: [],
            vendors: [],
            vehicles: [],
            problems: [],
            booking_type: []
        };


        return {
            getUsers: function (refresh) {
                if (coreData.users.length > 0 && !refresh) {
                    return coreData.users;
                } else {
                    return $http.get('/users', {
                        params: {
                            token: User.getToken()
                        }
                    }).then(function (response) {
                        console.log('GetUsers', response);
                        coreData.users = response.data.users;
                        return response.data.users;
                    }).catch(function (reason) {
                        console.log(reason);
                        return coreData.users;
                    });
                }
            },

            getBookings: function (refresh) {
                if (coreData.bookings.length > 0 && !refresh) {
                    return coreData.bookings;
                } else {
                    return $http.get('/bookings', {
                        params: {
                            token: User.getToken()
                        }
                    }).then(function (response) {
                        console.log('GetUsers', response);
                        coreData.bookings = response.data.bookings;
                        return response.data.bookings;
                    }).catch(function (reason) {
                        console.log(reason);
                        return coreData.bookings;
                    });
                }
            },

            getVendors: function (refresh) {
                if (coreData.vendors.length > 0 && !refresh) {
                    return coreData.vendors;
                } else {
                    return $http.get('/vendors')
                        .then(function (response) {
                            coreData.vendors = response.data.vendors;
                            return response.data.vendors;
                        }).catch(function (reason) {
                            console.log(reason);
                            return coreData.vendors;
                        })

                }
            },

            getVehicles: function (refresh) {
                if (coreData.vehicles.length > 0 && !refresh) {
                    return coreData.vehicles;
                } else {
                    return $http.get('/vehicles')
                        .then(function (response) {
                            coreData.vehicles = response.data.vehicles;
                            return response.data.vehicles;
                        }).catch(function (reason) {
                            console.log(reason);
                            return coreData.vehicles;
                        })

                }
            },

            getProblems: function (refresh) {
                if (coreData.problems.length > 0 && !refresh) {
                    return coreData.problems;
                } else {
                    return $http.get('/problems')
                        .then(function (response) {
                            coreData.problems = response.data.problems;
                            return response.data.problems;
                        }).catch(function (reason) {
                            console.log(reason);
                            return coreData.problems;
                        })

                }
            },

            getBookingType: function (refresh) {
                if (coreData.booking_type.length > 0 && !refresh) {
                    return coreData.booking_type;
                } else {
                    return $http.get('/booking_type')
                        .then(function (response) {
                            coreData.booking_type = response.data.types;
                            return response.data.types;
                        }).catch(function (reason) {
                            console.log(reason);
                            return coreData.booking_type;
                        })

                }
            },

            addBookingType: function (name) {
                return $http.post('/booking_type', {
                    name: name,
                    token: User.getToken()
                });
            },

            addProblem: function (name) {
                return $http.post('/problems', {
                    name: name,
                    token: User.getToken()
                });
            },

            addVendor: function (vendor) {
                vendor.token = User.getToken();
                return $http.post('/vendors', vendor);
            },

            addVehicle: function (vehicle) {
                return $http.post('/vehicles', {
                    token: User.getToken(),
                    vehicle: vehicle
                });
            },


            theData: coreData
        }
    });