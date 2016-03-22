(function () {
    'use strict';

    angular
        .module('openClicker')
        .factory('QuizService', QuizService);

    QuizService.$inject = [];

    function QuizService() {
        var service = {
            editQuiz: editQuiz,
            deleteQuiz: deleteQuiz,
            createQuiz: createQuiz,
            getQuestionName: getQuestionName
        }

        return service;

        function editQuiz(quizId, questions, userId, name) {
            Meteor.call('editQuiz', quizId, questions, userId, name, function (error, result) {
                if (error)
                {
                    console.log(error.message);
                }
                else if (result)
                {
                    alert('Quiz edited successfully');
                }
            });
        }

        function createQuiz(quizName, success, failure) {
            Meteor.call('createQuiz', quizName, function (error, result) {
                if (error)
                {
                    console.log(error.message);
                    if (failure && typeof(failure) == 'function')
                    {
                        failure();
                    }
                }
                else if (result)
                {
                    if (success && typeof(success) == 'function')
                    {
                        success();
                    }
                }
                else
                {
                    if (failure && typeof(failure) == 'function')
                    {
                        failure();
                    }
                }
            });
        }

        function deleteQuiz(quizId) {
            Meteor.call('deleteQuiz', quizId, function (error, result) {
                if (error)
                {
                    console.log(error.message);
                }
            });
        }
        function getQuestionName(questionId){
            Meteor.call('getQuestionName', questionId, function (error, result) {
                if (error)
                {
                    console.log(error.message);
                }
            });
        }
    }
})();