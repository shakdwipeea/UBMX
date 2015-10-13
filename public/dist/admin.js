!function () {
    "use strict";
    angular.module("ubmk", ["ui.router", "toaster", "ngAnimate"]).config(["$stateProvider", "$urlRouterProvider", function (o, e) {
        e.otherwise("/login"), o.state("main", {
            url: "/login",
            templateUrl: "/src/login/login.tpl",
            controller: "LoginController as login"
        }).state("dash", {
            url: "/dash",
            templateUrl: "/src/dash/dash.tpl",
            controller: "DashController as dash1"
        }).state("dash.infoBoard", {
            url: "/info",
            templateUrl: "/src/dash/infoBoard/infoBoard.tpl",
            controller: "InfoBoardController as info"
        }).state("dash.user", {
            url: "/user",
            templateUrl: "/src/dash/user/user.tpl",
            controller: "UserController as user"
        }).state("dash.booking", {
            url: "/booking",
            templateUrl: "/src/dash/booking/booking.tpl",
            controller: "BookingController as booking"
        }).state("dash.vendor", {
            url: "/vendor",
            templateUrl: "/src/dash/vendor/vendor.tpl",
            controller: "VendorController as vendor"
        }).state("dash.vehicle", {
            url: "/vehicle",
            templateUrl: "/src/dash/vehicle/vehicle.tpl",
            controller: "VehicleController as vehicle"
        }).state("dash.problem", {
            url: "/problem",
            templateUrl: "/src/dash/problem/problem.tpl",
            controller: "ProblemController as problem"
        }).state("dash.booking_type", {
            url: "/booking_type",
            templateUrl: "/src/dash/booking_type/booking_type.tpl",
            controller: "BookingTypeController as bookingType"
        })
    }])
}(), angular.module("ubmk").constant("Host", {add: ""}).factory("User", ["$http", "Host", function (o, e) {
    function n() {
        return c ? c : o({method: "GET", url: e.add + "/secure/question", params: {token: u}}).then(function (o) {
            return c = o.data.questions, o
        })
    }

    function t() {
        return u
    }

    function r(o, e, n) {
        i.name = o, i.ids = n, i.group = e
    }

    function s() {
        return i
    }

    function l() {
        var n = [];
        return i.ids.forEach(function (o) {
            n.push(c[o].Id)
        }), o.post(e.add + "/secure/test", {token: u, ids: n, name: i.name, group: i.group})
    }

    var u = null, a = null, c = null, i = {ids: [], name: null, group: null}, g = function (n) {
        return console.log(n), o.post(e.add + "/admin", n).then(function (o) {
            return console.log(o), u = o.data.token, o
        })["catch"](function (o) {
            return console.log("ww", o), o
        })
    }, d = function (n, t, r) {
        if (console.log("Q in addQues factory", n), u && r && a) {
            var s = {
                questionText: n.questionText,
                option1: n.option1,
                option2: n.option2,
                option3: n.option3,
                option4: n.option4,
                token: u,
                subject: r,
                correct: n.correct,
                tags: t
            };
            return console.log(s), o.post(e.add + "/secure/question", s)
        }
        return console.log("This should not be happening"), new Error("Go to hell")
    }, h = function (n) {
        return u && n.name ? o.post(e.add + "/secure/tags", {
            name: n.name,
            token: u
        }) : new Error("Not signed in or no tag")
    }, f = function () {
        return o.get(e.add + "/tags")
    }, m = function (n) {
        return u && n.name ? o.post(e.add + "/subject", {
            name: n.name,
            token: u
        }) : (console.log("Throw"), new Error("Not signed in or no tag"))
    }, p = function () {
        return o.get(e.add + "/subject")
    }, k = function () {
        return !!u
    };
    return {
        login: g,
        add: d,
        newTag: h,
        getTags: f,
        newSubject: m,
        getSubject: p,
        isLoggedIn: k,
        getQuestions: n,
        setTest: r,
        getTest: s,
        createTest: l,
        getToken: t
    }
}]), angular.module("ubmk").controller("DashController", ["$state", "User", "$scope", function (o, e, n) {
    if (console.log("dash Controller"), !e.isLoggedIn())return void o.go("main");
    n.select = "dashboard", o.go("dash.infoBoard");
    var t = this;
    t.add = function () {
        console.log("Trying to go"), o.go("dash.info")
    }, t.questionTemp = !1, t.testTemp = !1
}]), angular.module("ubmk").factory("Dash", ["$http", "User", function (o, e) {
    var n = [], t = [], r = [], s = [], l = [], u = [];
    return {
        getUsers: function () {
            return n.length > 0 ? n : o.get("/users", {params: {token: e.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), n = o.data.users, o.data.users
            })["catch"](function (o) {
                return console.log(o), n
            })
        }, getBookings: function () {
            return t.length > 0 ? t : o.get("/bookings", {params: {token: e.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), t = o.data.bookings, o.data.bookings
            })["catch"](function (o) {
                return console.log(o), t
            })
        }, getVendors: function () {
            return r.length > 0 ? r : o.get("/vendors").then(function (o) {
                return r = o.data.vendors, o.data.vendors
            })["catch"](function (o) {
                return console.log(o), r
            })
        }, getVehicles: function () {
            return s.length > 0 ? s : o.get("/vehicles").then(function (o) {
                return s = o.data.vehicles, o.data.vehicles
            })["catch"](function (o) {
                return console.log(o), s
            })
        }, getProblems: function () {
            return l.length > 0 ? l : o.get("/problems").then(function (o) {
                return l = o.data.problems, console.log("Problems", l), o.data.problems
            })["catch"](function (o) {
                return console.log(o), l
            })
        }, getBookingType: function () {
            return u.length > 0 ? u : o.get("/booking_type").then(function (o) {
                return u = o.data.types, o.data.types
            })["catch"](function (o) {
                return console.log(o), u
            })
        }
    }
}]), angular.module("ubmk").controller("LoginController", ["User", "$state", "toaster", function (o, e, n) {
    console.log("main Controller");
    var t = this;
    t.loginText = "Submit", t.doLogin = function () {
        t.loginText = "Please Wait.......", console.log("Username & Password", t.user), o.login(t.user).then(function (o) {
            console.log("Toast"), o.data.error ? n.pop("error", "Error", "Damn Boy Damn!!") : n.pop("success", "Success", "Verified"), e.go("dash")
        })["catch"](function (o) {
            console.log(o.data.error), n.pop("error", "Error", "Damn Boy Damn!!"), t.loginText = "Submit"
        })
    }
}]), angular.module("user", ["userRoutes", "accctrl", "userService"]), angular.module("userRoutes", ["ngRoute"]).config(["$routeProvider", "$locationProvider", function (o, e) {
    o.when("/", {templateUrl: "app/src/user/index.ejs"})
}]), angular.module("vendor", ["userRoutes", "accctrl", "userService"]), angular.module("userRoutes", ["ngRoute"]).config(["$routeProvider", "$locationProvider", function (o, e) {
    o.when("/", {templateUrl: "app/src/user/index.ejs"})
}]), angular.module("ubmk").controller("BookingController", ["Dash", function (o) {
    console.log("Booking COntroller");
    var e = this, n = o.getBookings();
    Array.isArray(n) ? e.bookings = n : n.then(function (o) {
        e.bookings = o
    })
}]), angular.module("ubmk").controller("BookingTypeController", ["Dash", function (o) {
    var e = this, n = o.getBookingType();
    Array.isArray(n) ? e.booking_type = n : n.then(function (o) {
        e.booking_type = o
    })
}]), angular.module("ubmk").controller("InfoBoardController", ["$state", "User", "Dash", function (o, e, n) {
    console.log("infoBoard Controller");
    var t = this, r = n.getUsers();
    Array.isArray(r) ? t.no_users = r.length : r.then(function (o) {
        t.no_users = o.length
    });
    var s = n.getBookings();
    Array.isArray(s) ? t.no_bookings = s.length : s.then(function (o) {
        t.no_bookings = o.length
    })
}]), angular.module("ubmk").controller("ProblemController", ["Dash", function (o) {
    var e = this, n = o.getProblems();
    console.log("Provlem Controller"), Array.isArray(n) ? (console.log("HHUH"), e.problems = n) : n.then(function (o) {
        console.log("Gor Problemsd", o), e.problems = o
    })
}]), angular.module("ubmk").controller("UserController", ["Dash", function (o) {
    console.log("Usr COntroller");
    var e = this, n = o.getUsers();
    Array.isArray(n) ? e.users = n : n.then(function (o) {
        e.users = o
    })
}]), angular.module("ubmk").controller("VehicleController", ["Dash", function (o) {
    console.log("Vehicle Controller");
    var e = this, n = o.getVehicles();
    Array.isArray(n) ? e.vehicles = n : n.then(function (o) {
        e.vehicles = o
    })
}]), angular.module("ubmk").controller("VendorController", ["Dash", function (o) {
    console.log("Vendor Controller");
    var e = this, n = o.getVendors();
    Array.isArray(n) ? e.vendors = n : n.then(function (o) {
        e.vendors = o
    })
}]), angular.module("userService", []).factory("Account", ["$http", "userToken", function (o, e) {
    return userAuth = {}, userAuth.login = function (n) {
        return o.post("/users/login", n).then(function (o) {
            return console.log(o), e.setToken(o.data.token), o
        })
    }, userAuth.getUserNames = function () {
        return o.get("/")
    }, userAuth.logout = function () {
        e.setToken()
    }, userAuth.isLoggedIn = function () {
        return e.getToken() ? !0 : !1
    }, userAuth
}]).factory("userToken", ["$window", function (o) {
    var e = {};
    return e.getToken = function () {
        return o.localStorage.getItem("token")
    }, e.setToken = function (e) {
        e ? o.localStorage.setItem("token", e) : o.localStorage.removeItem("token")
    }, e
}]).factory("userCheck", ["$q", "$location", "userToken", function (o, e, n) {
    var t = {};
    return t.request = function (o) {
        return token && (o.headers["x-access-token"] = token), o
    }, t.responseError = function (n) {
        403 == n.status && e.path("/users/login"), o.reject(n)
    }, t
}]), angular.module("accctrl", []).controller("AccountController", ["$rootScope", "$location", "Account", function (o, e, n) {
    var t = this;
    t.loggedIn = n.isLoggedIn(), o.$on("$routeChangeStart", function () {
        t.loggedIn = n.isLoggedIn(), n.getUserNames().then(function (o) {
            t.user = o.data
        })
    }), t.doLogin = function () {
        t.processing = !0, t.error = "", n.login({
            email: t.loginData.username,
            password: t.loginData.password
        }).success(function (o) {
            t.processing = !1, n.getUserNames().then(function (o) {
                t.user = o.data
            }), o.success ? e.path("/") : t.error = o.message
        })
    }, t.doLogout = function () {
        n.logout(), e.path("/logout")
    }
}]), angular.module("userService", []).factory("Account", ["$http", "userToken", function (o, e) {
    return userAuth = {}, userAuth.login = function (n) {
        return o.post("/vendors/login", n).then(function (o) {
            return console.log(o), e.setToken(o.data.token), o
        })
    }, userAuth.getUserNames = function () {
        return o.get("/")
    }, userAuth.logout = function () {
        e.setToken()
    }, userAuth.isLoggedIn = function () {
        return e.getToken() ? !0 : !1
    }, userAuth
}]).factory("userToken", ["$window", function (o) {
    var e = {};
    return e.getToken = function () {
        return o.localStorage.getItem("token")
    }, e.setToken = function (e) {
        e ? o.localStorage.setItem("token", e) : o.localStorage.removeItem("token")
    }, e
}]).factory("userCheck", ["$q", "$location", "userToken", function (o, e, n) {
    var t = {};
    return t.request = function (o) {
        return token && (o.headers["x-access-token"] = token), o
    }, t.responseError = function (n) {
        403 == n.status && e.path("/vendors/login"), o.reject(n)
    }, t
}]), angular.module("accctrl", []).controller("AccountController", ["$rootScope", "$location", "Account", function (o, e, n) {
    var t = this;
    t.loggedIn = n.isLoggedIn(), o.$on("$routeChangeStart", function () {
        t.loggedIn = n.isLoggedIn(), n.getUserNames().then(function (o) {
            t.user = o.data
        })
    }), t.doLogin = function () {
        t.processing = !0, t.error = "", n.login({
            email: t.loginData.username,
            password: t.loginData.password
        }).success(function (o) {
            t.processing = !1, n.getUserNames().then(function (o) {
                t.user = o.data
            }), o.success ? e.path("/") : t.error = o.message
        })
    }, t.doLogout = function () {
        n.logout(), e.path("/logout")
    }
}]);