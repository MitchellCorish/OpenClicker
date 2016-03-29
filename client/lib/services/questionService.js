(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('QuestionService', QuestionService);
  
  QuestionService.$inject = [];
  
  function QuestionService() {
    var service = {
      createQuestion: createQuestion,
      updateQuestionStartTime: updateQuestionStartTime,
      updateQuestionEndTime: updateQuestionEndTime,
      deleteQuestion: deleteQuestion
    }
    
    return service;
    
    function createQuestion(groupId, question, answers, correctAnswer) {
      Meteor.call('createQuestion', groupId, question, answers, correctAnswer, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function updateQuestionStartTime(questionId, startTime) {
      Meteor.call('updateQuestionStartTime', questionId, startTime, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function updateQuestionEndTime(questionId, endTime) {
      Meteor.call('updateQuestionEndTime', questionId, endTime, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function deleteQuestion(questionId) {
      Meteor.call('deleteQuestion', questionId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
  }
})();