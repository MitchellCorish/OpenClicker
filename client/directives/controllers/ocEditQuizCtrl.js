(function () {
  'use-strict';

  angular
    .module('openClicker')
    .controller('ocEditQuizCtrl', ocEditQuizCtrl);

  ocEditQuizCtrl.$inject = ['$scope', '$reactive', 'QuizService'];

  function ocEditQuizCtrl($scope, $reactive, QuizService) {
    var vm = this;
    $reactive(vm).attach($scope);

    vm.subscribe('ownedQuizzes');
    vm.subscribe('ownedQuestions');

    vm.update = update;
    vm.up = up;
    vm.down = down;
    vm.removeQuestion = removeQuestion;
    vm.addQuestion = addQuestion;
    vm.questionName = questionName;
    vm.test = test;
    
    vm.helpers({
      quiz: () => Quizes.findOne({
        _id: vm.quizId
      }),
      questions: () => Questions.find({})
    });

    function update()
    {
      QuizService.editQuiz(vm.quiz._id, vm.quiz.questions, vm.quiz.userId, vm.quiz.name);
    }

    function questionName(questionId){
      QuizService.getQuestionName(questionId);
    }

    function test(){
      console.log(vm.questions);
    }

    function up(i)
    {
      if(i > 0){
        t = vm.quiz.questions[i];
        vm.quiz.questions[i] = vm.quiz.questions[i-1];
        vm.quiz.questions[i-1] = t;
      }
    }

    function down(i)
    {
      if(i < vm.quiz.questions.length-1){
        t = vm.quiz.questions[i];
        vm.quiz.questions[i] = vm.quiz.questions[i+1];
        vm.quiz.questions[i+1] = t;
      }
    }

    function removeQuestion(i)
    {
      console.log(vm.quiz.questions[i]);

      vm.quiz.questions.splice(i,1);
    }

    function addQuestion(question)
    {
      vm.quiz.questions.push(question);
    }
  }
})();