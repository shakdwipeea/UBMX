/**
 * Created by Akash on 29-09-2015.
 */
angular.module("ubmk")
    .factory('Dash', function ($http, User) {
        var users = [],
            bookings = [];


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
                    });
                }
            }
        }
    });