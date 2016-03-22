(function () {
    'use strict';
 
    angular
        .module('openClicker')
        .factory('QuestionService', QuestionService);
 
    QuestionService.$inject = [];
 
    function QuestionService() {
        var service = {
            editQuestion: editQuestion
        }
 
        return service;
 
        function editQuestion(questionId, groupId, questionAsked, possibleAnswers, answer) {
            Meteor.call('editQuestion', questionId, groupId, questionAsked, possibleAnswers, answer, function (error, result) {
                if (error)
                {
                    console.log(error.message);
                }
                else if (result)
                {
                    alert('Question edited successfully');
                }
            });
        }

    }
})();