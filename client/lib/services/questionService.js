(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('QuestionService', QuestionService);
  
  QuestionService.$inject = [];
  
  function QuestionService() {
    var service = {
      updateQuestionStartTime: updateQuestionStartTime,
      updateQuestionEndTime: updateQuestionEndTime
    }
    
    return service;
    
    function updateQuestionStartTime(questionId) {
      Meteor.call('updateQuestionStartTime', questionId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function updateQuestionEndTime(questionId) {
      Meteor.call('updateQuestionEndTime', questionId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
  }
})();