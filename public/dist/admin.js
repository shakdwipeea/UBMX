!function () {
    "use strict";
    angular.module("ubmk", ["ui.router", "toaster", "ngAnimate"]).config(["$stateProvider", "$urlRouterProvider", function (o, e) {
        e.otherwise("/login"), o.state("main", {
            url: "/login",
            templateUrl: "/src/admin/login/login.tpl",
            controller: "LoginController as login"
        }).state("dash", {
            url: "/dash",
            templateUrl: "/src/admin/dash/dash.tpl",
            controller: "DashController as dash1"
        }).state("dash.infoBoard", {
            url: "/info",
            templateUrl: "/src/admin/dash/infoBoard/infoBoard.tpl",
            controller: "InfoBoardController as info"
        }).state("dash.user", {
            url: "/user",
            templateUrl: "/src/admin/dash/user/user.tpl",
            controller: "UserController as user"
        }).state("dash.booking", {
            url: "/booking",
            templateUrl: "/src/admin/dash/booking/booking.tpl",
            controller: "BookingController as booking"
        }).state("dash.vendor", {
            url: "/vendor",
            templateUrl: "/src/admin/dash/vendor/vendor.tpl",
            controller: "VendorController as vendor"
        }).state("dash.vendor.add", {
            url: "/add",
            templateUrl: "/src/admin/dash/vendor/addVendor/addVendor.tpl",
            controller: "AddVendorController as addVendor"
        }).state("dash.vehicle", {
            url: "/vehicle",
            templateUrl: "/src/admin/dash/vehicle/vehicle.tpl",
            controller: "VehicleController as vehicle"
        }).state("dash.vehicle.add", {
            url: "/add",
            templateUrl: "/src/admin/dash/vehicle/add/add.tpl",
            controller: "AddVehicleController as addVehicle"
        }).state("dash.problem", {
            url: "/problem",
            templateUrl: "/src/admin/dash/problem/problem.tpl",
            controller: "ProblemController as problem"
        }).state("dash.problem.add", {
            url: "/add",
            templateUrl: "/src/admin/dash/problem/add/add.tpl",
            controller: "AddProblemController as addProblem"
        }).state("dash.booking_type", {
            url: "/booking_type",
            templateUrl: "/src/admin/dash/booking_type/booking_type.tpl",
            controller: "BookingTypeController as bookingType"
        }).state("dash.booking_type.add", {
            url: "/add",
            templateUrl: "/src/admin/dash/booking_type/add/add.tpl",
            controller: "AddBookingTypeController as add"
        })
    }])
}(), angular.module("ubmk").constant("Host", {add: ""}).factory("User", ["$http", "Host", function (o, e) {
    function n() {
        return i ? i : o({method: "GET", url: e.add + "/secure/question", params: {token: s}}).then(function (o) {
            return i = o.data.questions, o
        })
    }

    function t() {
        return s
    }

    function r(o, e, n) {
        c.name = o, c.ids = n, c.group = e
    }

    function l() {
        return c
    }

    function a() {
        var n = [];
        return c.ids.forEach(function (o) {
            n.push(i[o].Id)
        }), o.post(e.add + "/secure/test", {token: s, ids: n, name: c.name, group: c.group})
    }

    var s = null, d = null, i = null, c = {ids: [], name: null, group: null}, u = function (n) {
        return console.log(n), o.post(e.add + "/admin", n).then(function (o) {
            return console.log(o), s = o.data.token, o
        })["catch"](function (o) {
            return console.log("ww", o), o
        })
    }, g = function (n, t, r) {
        if (console.log("Q in addQues factory", n), s && r && d) {
            var l = {
                questionText: n.questionText,
                option1: n.option1,
                option2: n.option2,
                option3: n.option3,
                option4: n.option4,
                token: s,
                subject: r,
                correct: n.correct,
                tags: t
            };
            return console.log(l), o.post(e.add + "/secure/question", l)
        }
        return console.log("This should not be happening"), new Error("Go to hell")
    }, h = function (n) {
        return s && n.name ? o.post(e.add + "/secure/tags", {
            name: n.name,
            token: s
        }) : new Error("Not signed in or no tag")
    }, m = function () {
        return o.get(e.add + "/tags")
    }, p = function (n) {
        return s && n.name ? o.post(e.add + "/subject", {
            name: n.name,
            token: s
        }) : (console.log("Throw"), new Error("Not signed in or no tag"))
    }, f = function () {
        return o.get(e.add + "/subject")
    }, b = function () {
        return !!s
    };
    return {
        login: u,
        add: g,
        newTag: h,
        getTags: m,
        newSubject: p,
        getSubject: f,
        isLoggedIn: b,
        getQuestions: n,
        setTest: r,
        getTest: l,
        createTest: a,
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
    var n = {users: [], bookings: [], vendors: [], vehicles: [], problems: [], booking_type: []};
    return {
        getUsers: function (t) {
            return n.users.length > 0 && !t ? n.users : o.get("/users", {params: {token: e.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), n.users = o.data.users, o.data.users
            })["catch"](function (o) {
                return console.log(o), n.users
            })
        }, getBookings: function (t) {
            return n.bookings.length > 0 && !t ? n.bookings : o.get("/bookings", {params: {token: e.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), n.bookings = o.data.bookings, o.data.bookings
            })["catch"](function (o) {
                return console.log(o), n.bookings
            })
        }, getVendors: function (e) {
            return n.vendors.length > 0 && !e ? n.vendors : o.get("/vendors").then(function (o) {
                return n.vendors = o.data.vendors, o.data.vendors
            })["catch"](function (o) {
                return console.log(o), n.vendors
            })
        }, getVehicles: function (e) {
            return n.vehicles.length > 0 && !e ? n.vehicles : o.get("/vehicles").then(function (o) {
                return n.vehicles = o.data.vehicles, o.data.vehicles
            })["catch"](function (o) {
                return console.log(o), n.vehicles
            })
        }, getProblems: function (e) {
            return n.problems.length > 0 && !e ? n.problems : o.get("/problems").then(function (o) {
                return n.problems = o.data.problems, o.data.problems
            })["catch"](function (o) {
                return console.log(o), n.problems
            })
        }, getBookingType: function (e) {
            return n.booking_type.length > 0 && !e ? n.booking_type : o.get("/booking_type").then(function (o) {
                return n.booking_type = o.data.types, o.data.types
            })["catch"](function (o) {
                return console.log(o), n.booking_type
            })
        }, addBookingType: function (n) {
            return o.post("/booking_type", {name: n, token: e.getToken()})
        }, addProblem: function (n) {
            return o.post("/problems", {name: n, token: e.getToken()})
        }, addVendor: function (n) {
            return n.token = e.getToken(), o.post("/vendors", n)
        }, addVehicle: function (n) {
            return o.post("/vehicles", {token: e.getToken(), vehicle: n})
        }, theData: n
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
}]), angular.module("ubmk").controller("BookingController", ["Dash", function (o) {
    console.log("Booking COntroller");
    var e = this, n = o.getBookings();
    Array.isArray(n) ? e.bookings = n : n.then(function (o) {
        e.bookings = o
    })
}]), angular.module("ubmk").controller("BookingTypeController", ["Dash", "$state", function (o, e) {
    var n = this;
    o.getBookingType();
    n.adding = !1, n.data = o.theData, n.showAdd = function () {
        n.adding = !0, e.go("dash.booking_type.add")
    }
}]), angular.module("ubmk").controller("InfoBoardController", ["$state", "User", "Dash", function (o, e, n) {
    console.log("infoBoard Controller");
    var t = this, r = n.getUsers();
    Array.isArray(r) ? t.no_users = r.length : r.then(function (o) {
        t.no_users = o.length
    });
    var l = n.getBookings();
    Array.isArray(l) ? t.no_bookings = l.length : l.then(function (o) {
        t.no_bookings = o.length
    })
}]), angular.module("ubmk").controller("ProblemController", ["Dash", "$state", function (o, e) {
    var n = this;
    o.getProblems();
    n.adding = !1, console.log("Provlem Controller"), n.data = o.theData, n.showAdd = function () {
        n.adding = !0, e.go("dash.problem.add")
    }
}]), angular.module("ubmk").controller("UserController", ["Dash", function (o) {
    console.log("Usr COntroller");
    var e = this, n = o.getUsers();
    Array.isArray(n) ? e.users = n : n.then(function (o) {
        e.users = o
    })
}]), angular.module("ubmk").controller("VehicleController", ["Dash", "$state", function (o, e) {
    console.log("Vehicle Controller");
    var n = this;
    o.getVehicles();
    n.data = o.theData, n.addingVehicle = !1, n.addVehicle = function () {
        n.addingVehicle = !0, e.go("dash.vehicle.add")
    }
}]), angular.module("ubmk").controller("VendorController", ["Dash", "$state", function (o, e) {
    console.log("Vendor Controller");
    var n = this;
    o.getVendors();
    n.addingVendor = !1, n.data = o.theData, n.addVendor = function () {
        n.addingVendor = !0, e.go("dash.vendor.add")
    }
}]), angular.module("ubmk").controller("AddBookingTypeController", ["Dash", function (o) {
    var e = this;
    e.submit = function () {
        console.log(e.name), o.addBookingType(e.name).then(function (n) {
            o.getBookingType(!0), e.name = ""
        })["catch"](function (o) {
            console.log("Error", o.data.error)
        })
    }
}]), angular.module("ubmk").controller("AddProblemController", ["Dash", function (o) {
    var e = this;
    e.submit = function () {
        console.log(e.name), o.addProblem(e.name).then(function (n) {
            o.getProblems(!0), e.name = ""
        })["catch"](function (o) {
            console.log("Error", o.data.error)
        })
    }
}]), angular.module("ubmk").controller("AddVehicleController", ["Dash", function (o) {
    var e = this;
    e.add = function () {
        o.addVehicle(e.vehicle).then(function (n) {
            o.getVehicles(!0), e.vehicle = null
        })["catch"](function (o) {
            console.log(o.data.error)
        })
    }
}]), angular.module("ubmk").controller("AddVendorController", ["Dash", function (o) {
    var e = this;
    o.getBookingType(), o.getProblems(), e.data = o.theData, e.add = function () {
        console.log(e.vendor);
        var n = {
            name: e.vendor.username,
            password: e.vendor.password,
            email: e.vendor.email,
            capacity_per_slot: e.vendor.capacity_per_slot,
            timings: e.vendor.timings,
            location: e.vendor.location,
            lat: e.vendor.lat,
            lng: e.vendor.lng
        };
        n.problem_ids = Object.keys(e.vendor.problems).filter(function (o) {
            return !!e.vendor.problems[o]
        }), n.booking_type_ids = Object.keys(e.vendor.booking_type).filter(function (o) {
            return !!e.vendor.booking_type[o]
        }), console.log("Add thos vendor", n), o.addVendor(n).then(function (n) {
            o.getVendors(!0), e.vendor = null
        })["catch"](function (o) {
            console.log(o.data.error)
        })
    }
}]);