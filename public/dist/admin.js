!function () {
    "use strict";
    angular.module("ubmk", ["ui.router", "toaster", "ngAnimate"]).config(["$stateProvider", "$urlRouterProvider", function (o, n) {
        n.otherwise("/login"), o.state("main", {
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
        })
    }])
}(), angular.module("ubmk").constant("Host", {add: ""}).factory("User", ["$http", "Host", function (o, n) {
    function t() {
        return i ? i : o({method: "GET", url: n.add + "/secure/question", params: {token: l}}).then(function (o) {
            return i = o.data.questions, o
        })
    }

    function e() {
        return l
    }

    function r(o, n, t) {
        c.name = o, c.ids = t, c.group = n
    }

    function s() {
        return c
    }

    function a() {
        var t = [];
        return c.ids.forEach(function (o) {
            t.push(i[o].Id)
        }), o.post(n.add + "/secure/test", {token: l, ids: t, name: c.name, group: c.group})
    }

    var l = null, u = null, i = null, c = {ids: [], name: null, group: null}, g = function (t) {
        return console.log(t), o.post(n.add + "/admin", t).then(function (o) {
            return console.log(o), l = o.data.token, o
        })["catch"](function (o) {
            return console.log("ww", o), o
        })
    }, d = function (t, e, r) {
        if (console.log("Q in addQues factory", t), l && r && u) {
            var s = {
                questionText: t.questionText,
                option1: t.option1,
                option2: t.option2,
                option3: t.option3,
                option4: t.option4,
                token: l,
                subject: r,
                correct: t.correct,
                tags: e
            };
            return console.log(s), o.post(n.add + "/secure/question", s)
        }
        return console.log("This hould not be happening"), new Error("Go to hell")
    }, f = function (t) {
        return l && t.name ? o.post(n.add + "/secure/tags", {
            name: t.name,
            token: l
        }) : new Error("Not signed in or no tag")
    }, h = function () {
        return o.get(n.add + "/tags")
    }, m = function (t) {
        return l && t.name ? o.post(n.add + "/subject", {
            name: t.name,
            token: l
        }) : (console.log("Throw"), new Error("Not signed in or no tag"))
    }, p = function () {
        return o.get(n.add + "/subject")
    }, k = function () {
        return !!l
    };
    return {
        login: g,
        add: d,
        newTag: f,
        getTags: h,
        newSubject: m,
        getSubject: p,
        isLoggedIn: k,
        getQuestions: t,
        setTest: r,
        getTest: s,
        createTest: a,
        getToken: e
    }
}]), angular.module("ubmk").controller("DashController", ["$state", "User", "$scope", function (o, n, t) {
    if (console.log("dash Controller"), !n.isLoggedIn())return void o.go("main");
    t.select = "dashboard", o.go("dash.infoBoard");
    var e = this;
    e.add = function () {
        console.log("Trying to go"), o.go("dash.info")
    }, e.questionTemp = !1, e.testTemp = !1
}]), angular.module("ubmk").factory("Dash", ["$http", "User", function (o, n) {
    var t = [], e = [];
    return {
        getUsers: function () {
            return t.length > 0 ? t : o.get("/users", {params: {token: n.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), t = o.data.users, o.data.users
            })["catch"](function (o) {
                console.log(o)
            })
        }, getBookings: function () {
            return e.length > 0 ? e : o.get("/bookings", {params: {token: n.getToken()}}).then(function (o) {
                return console.log("GetUsers", o), e = o.data.bookings, o.data.bookings
            })["catch"](function (o) {
                console.log(o)
            })
        }
    }
}]), angular.module("ubmk").controller("LoginController", ["User", "$state", "toaster", function (o, n, t) {
    console.log("main Controller");
    var e = this;
    e.loginText = "Submit", e.doLogin = function () {
        e.loginText = "Please Wait.......", console.log("Username & Password", e.user), o.login(e.user).then(function (o) {
            console.log("Toast"), o.data.error ? t.pop("error", "Error", "Damn Boy Damn!!") : t.pop("success", "Success", "Verified"), n.go("dash")
        })["catch"](function (o) {
            console.log(o.data.error), t.pop("error", "Error", "Damn Boy Damn!!"), e.loginText = "Submit"
        })
    }
}]), angular.module("ubmk").controller("BookingController", ["Dash", function (o) {
    console.log("Booking COntroller");
    var n = this, t = o.getBookings();
    Array.isArray(t) ? n.bookings = t : t.then(function (o) {
        n.bookings = o
    })
}]), angular.module("ubmk").controller("InfoBoardController", ["$state", "User", "Dash", function (o, n, t) {
    console.log("infoBoard Controller");
    var e = this, r = t.getUsers();
    Array.isArray(r) ? e.no_users = r.length : r.then(function (o) {
        e.no_users = o.length
    });
    var s = t.getBookings();
    Array.isArray(s) ? e.no_bookings = s.length : s.then(function (o) {
        e.no_bookings = o.length
    })
}]), angular.module("ubmk").controller("UserController", ["Dash", function (o) {
    console.log("Usr COntroller");
    var n = this, t = o.getUsers();
    Array.isArray(t) ? n.users = t : t.then(function (o) {
        n.users = o
    })
}]);