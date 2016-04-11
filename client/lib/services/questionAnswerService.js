(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('QuestionAnswerService', QuestionAnswerService);
  
  QuestionAnswerService.$inject = [];
  
  function QuestionAnswerService() {
    var service = {
      answerQuestion: answerQuestion
    }
    
    return service;
    
    function answerQuestion(questionId, selectedAnswer, timestamp) {
      Meteor.call('answerQuestion', questionId, selectedAnswer, timestamp, function (error, result) {
        if (error)
        {
          alert('Answer submitted unsuccessfully , please try again');
        }
        else if (result)
        {
          alert('Answer submitted successfully');
        }
      });
    }
  }
})();