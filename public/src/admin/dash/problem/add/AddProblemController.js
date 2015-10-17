/**
 * Created by Akash on 17-10-2015.
 */
angular.module('ubmk')
    .controller('AddProblemController', function (Dash) {
        var self = this;

        self.submit = function () {
            console.log(self.name);
            Dash.addProblem(self.name)
                .then(function (response) {
                    Dash.getProblems(true);
                    self.name = "";
                })
                .catch(function (reason) {
                    console.log("Error", reason.data.error);
                })
        }
    });