/**
 * Created by akash on 22/7/15.
 */
angular.module('ubmk')
    .constant('Host', {
        add: '' // 'http://127.0.0.1:3000'
    })
    .factory('User', function ($http, Host) {
        var token = null,
            subject = null,
            username = null,
            questions = null,
            checkedQuestion = {
                ids: [],
                name: null,
                group: null
            };

        var login = function (userData) {
            console.log(userData);
            return $http.post(Host.add + '/admin', userData)
                .then(function (response) {
                    console.log(response);
                    token = response.data.token;
                    return response;
                })
                .catch(function (error) {
                    console.log('ww', error);
                    return error;
                });
        };

        var addQuestion = function (questionData, selectedTags, subjectSel) {
            console.log('Q in addQues factory', questionData);

            if (token && subjectSel && username) {
                var requestBody = {
                    questionText: questionData.questionText,
                    option1: questionData.option1,
                    option2: questionData.option2,
                    option3: questionData.option3,
                    option4: questionData.option4,
                    token: token,
                    subject: subjectSel,
                    correct: questionData.correct,
                    tags: selectedTags
                };

                console.log(requestBody);
                return $http.post(Host.add + '/secure/question', requestBody);
            } else {
                console.log('This should not be happening');
                return new Error("Go to hell");
            }

        };

        function getQuestions() {
            if (questions) {
                return questions;
            } else {
                return $http({
                    method: 'GET',
                    url: Host.add + '/secure/question',
                    params: {
                        token: token
                    }
                }).then(function (response) {
                    questions = response.data.questions;
                    return response;
                });
            }
        }

        var addTag = function (tag) {
            if (token && tag.name) {
                return $http.post(Host.add + '/secure/tags', {
                    name: tag.name,
                    token: token
                })
            } else {
                return new Error("Not signed in or no tag")
            }
        };

        var getTags = function () {
            return $http.get(Host.add + '/tags');
        };

        var addSubject = function (subject) {
            if (token && subject.name) {
                return $http.post(Host.add + '/subject', {
                    name: subject.name,
                    token: token
                })
            } else {
                console.log("Throw")
                return new Error("Not signed in or no tag")
            }
        };

        var getSubject = function () {
            return $http.get(Host.add + '/subject');
        };


        var isToken = function () {
            return !!token;
        };

        function getToken() {
            return token;
        }

        function setTestQuestionDetails(name, group, ids) {
            checkedQuestion.name = name;
            checkedQuestion.ids = ids;
            checkedQuestion.group = group;
        }

        function getQuestionDetails() {
            return checkedQuestion;
        }

        /**
         * post TO /TEST returns a promise after creating a test
         */
        function createTest() {
            //get id from indexes
            var ids = [];

            checkedQuestion.ids.forEach(function (id) {
                ids.push(questions[id].Id);
            });

            return $http.post(Host.add + '/secure/test', {
                token: token,
                ids: ids,
                name: checkedQuestion.name,
                group: checkedQuestion.group
            })
        }

        return {
            login: login,
            add: addQuestion,
            newTag: addTag,
            getTags: getTags,
            newSubject: addSubject,
            getSubject: getSubject,
            isLoggedIn: isToken,
            getQuestions: getQuestions,
            setTest: setTestQuestionDetails,
            getTest: getQuestionDetails,
            createTest: createTest,
            getToken: getToken
        }
    });
