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
    
    function answerQuestion(questionId, selectedAnswer) {
      Meteor.call('answerQuestion', questionId, selectedAnswer, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
        else if (result)
        {
          alert('Answer submitted successfully');
        }
      });
    }
  }
})();