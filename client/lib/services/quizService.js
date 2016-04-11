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
        createQuiz: createQuiz
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

    function createQuiz(quizName, groupId, success, failure) {
      Meteor.call('createQuiz', quizName, groupId, function (error, result) {
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
  }
})();