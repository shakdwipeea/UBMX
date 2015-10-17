angular.module('ubmk')
    .controller('ProblemController', function (Dash, $state) {
        var self = this;

        var problems = Dash.getProblems();

        self.adding = false;
        console.log("Provlem Controller");

        self.data = Dash.theData;

        self.showAdd = function () {
            self.adding = true;
            $state.go('dash.problem.add');
        }


    });
