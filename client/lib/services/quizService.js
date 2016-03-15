(function () {
    'use strict';

    angular
        .module('openClicker')
        .factory('QuizService', QuizService);

    QuizService.$inject = [];

    function QuizService() {
        var service = {
            editQuiz: editQuiz
        }

        return service;

        function editQuiz(quizId, questions, groupId, name) {
            Meteor.call('editQuiz', quizId, questions, groupId, name, function (error, result) {
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
    }
})();