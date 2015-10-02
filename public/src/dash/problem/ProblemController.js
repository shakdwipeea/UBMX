angular.module('ubmk')
    .controller('ProblemController', function (Dash) {
        var self = this;

        var problems = Dash.getProblems();
        console.log("Provlem Controller");
        if (Array.isArray(problems)) {
            console.log("HHUH");
            self.problems = problems;
        } else {
            problems.then(function (problems) {
                console.log("Gor Problemsd", problems);
                self.problems = problems;
            });
        }
    });
