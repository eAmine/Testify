/*
 * IIFE to avoid polution of the global namespace.
 */
(function(){
    /*
     * Creating List controller and attaching it to the main turtleFacts module
     */
    angular
        .module("testifyApp")
        .controller("listCtrl", ListController);

    /*
     * Dependency injection. This allows the script to be minified and uglified
     * without breaking the code. This is acheived by passing the dependencies
     * as strings in an array through the $inject method to the controller.
     */
    ListController.$inject = ['quizMetrics', 'DataService'];

    /*
     * Definition for the List controller. quizMetrics and dataService are two
     * services that are created in js/factory/quiz.js and js/factory/dataService.js
     * respectively.
     */
    function ListController(quizMetrics, DataService){
        var vm = this;

        /*
         * The interface for the controller. The below code shows all the
         * variables that are available from inside the view. References to
         * named functions are used instead of inline anon functions. This
         * increases readability of the code.
         *
         * The interface is at the top to provide a quick overview of what is
         * available in the controller while the implementation remains at the
         * bottom.
         */
        vm.quizMetrics = quizMetrics; // Controllers reference to the quiz data from factory
         // Controller reference to the turtle info created in the factory
        vm.activeTurtle = {}; // will be used in the view to hold the data of currently active turtle
        vm.changeActiveTurtle = changeActiveTurtle; // reference to a named function below
        vm.activateQuiz = activateQuiz; // reference to named function below
        vm.search = ""; // will hold the search query when user uses search bar in view

        function changeActiveTurtle(index){
            // simple function to attach the data of the turtle clicked on to
            // the active turtle object
            vm.activeTurtle = index;

        }

        function activateQuiz(){
            /*
             * changeState is a function attached onto the quizMetrics object
             * returned from the factory It takes two arguments. 1. what to
             * change state of (quiz or results) 2. what new state should be.
             */
            quizMetrics.changeState("quiz", true);
        }
    }


        /*
         * Call the angular module called turtleFacts that was created in js/app.js
         * then attach the controller quizCtrl to it.
         *
         * The quiz controller is added as a named function instead of an anon func
         * to keep the code clean and readable.
         */
        angular
            .module("testifyApp")
            .controller("QuizController", QuizController);

        /*
         * Angular dependency injection to avoid issues when uglifying the code
         * Passing the dependencies as strings avoids them being changed when
         * uglified.
         */
        QuizController.$inject = ['quizMetrics', 'DataService'];

        /*
         * function defintion of the quiz controller with quizMetrics as args.
         *
         * quizMetrics is a service we created that
         * is defined in js/factory/quiz.js
         */
        function QuizController(quizMetrics, DataService){

            var vm = this;

            /*
             * All the properties and methods that will be exposed to the view are
             * declared below. Declaring them like this allows you to take a quick
             * look at the code and be able to see what this controller does
             * without having to scroll through all the code.
             *
             * Any methods declared below are done so by using named functions.
             * These functions are then defined further down the page
             */
            vm.quizMetrics = quizMetrics; // Attaching the quizMetrics object to the view model
            vm.dataService = DataService;
            vm.questionAnswered = questionAnswered; // also a named function defined below
            vm.setActiveQuestion = setActiveQuestion; // setActiveQuestion is a named function below
            vm.selectAnswer = selectAnswer; // also a named function
            vm.finaliseAnswers = finaliseAnswers; //also a named function
            vm.activeQuestion = 0; // currently active question in the quiz
            vm.error = false; // error flag. Will be set when user tries to finish quiz with
            vm.finalise = false; // finalise flag. Will be set to show prompt to end quiz with
                                 // all questions answered

            var numQuestionsAnswered = 0; // This is not needed by the view so is only declared using var

            /*
             * setActiveQuestion takes one optional argument.
             *
             * If no argument is passed it will set the active question in the quiz
             * to the next question that has yet to be answered. This allows the
             * user to skip questions and come back to them later, even by clicking
             * the "continue" button. It will still take them to the unanswered
             * question.
             *
             * If an argument is passed into the function then it will simply set
             * the activeQuestion to the number that was passed in as an argument
             */
            function setActiveQuestion(index){
                // no argument passed, data = undefined.
                if(index === undefined){
                    var breakOut = false;

                    /*
                     * quizLength is set to 1 less than the length of the quiz as it
                     * is always referenced against the variable activeQuestion
                     * which is 0 index. Therefore the length needs to be one less.
                     */
                    var quizLength = DataService.quizQuestions.length - 1;

                    /*
                     * This while loop will loop continuously until an unanswered
                     * question is found. Going back to the first question if the
                     * last question is reached witout finding an unanswered question
                     */
                    while(!breakOut){
                        // check if last question is reach, if not increment. If it
                        // has go back to start.
                        vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                        /*
                         * activeQuestion has looped back to start. Meaning user has
                         * skipped past questions without answering them. Therefore
                         * show a warning. This is done by setting the error flag to
                         * true.
                         */
                        if(vm.activeQuestion === 0){
                            vm.error = true;
                        }

                        // if current active question has not been selected, break
                        // out the while loop
                        if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                            breakOut = true;
                        }
                    }
                }else{
                    // Data was passed into the function therefore
                    // Set activeQuestion to the index of the button pressed
                    vm.activeQuestion = index;
                }

            }

            /*
             * This method will be triggered everytime the user clicks continue in
             * the quiz.
             *
             * It will then check if the current question as been answered, if it
             * has it will increment the local numQuestionsAnswered variable. Then
             * it checks if the numQuestionsAnswered is equal to the total number
             * of questions in the quiz, meaning the user has complected the quiz.
             *
             * If the quiz has been completed then it sets the finalise flag to
             * true, which removes the quiz from the view and displays a prompt to
             * ensure the user is finished. Then returns from the function
             *
             * If all the questions have not been answered or the current question
             * has not been selected the setActiveQuestion method is called to
             * increment the active question to the next unanswered question. If
             * the current question is the only unanswered question then it will
             * remain on that question
             */
            function questionAnswered(){
                // set quizLength variable to keep code clean
                var quizLength = DataService.quizQuestions.length;

                numQuestionsAnswered = 0;
                //For loop added to loop through all questions and recount questions
                //that have been answered. This avoids infinite loops.
                for(var x = 0; x < quizLength; x++){
                    if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
                        numQuestionsAnswered++;
                        if(numQuestionsAnswered >= quizLength){
                            // final check to ensure all questions are actuall answered
                            for(var i = 0; i < quizLength; i++){
                                /*
                                 * if find a question that is not answered, set it to
                                 * active question then return from this function
                                 * to ensure finalise flag is not set
                                 */
                                if(DataService.quizQuestions[i].selected === null){
                                    setActiveQuestion(i);
                                    return;
                                }
                            }
                            // set finalise flag and remove any existing warnings
                            vm.error = false;
                            vm.finalise = true;
                            return;
                        }
                    }
                }

                /*
                 * There are still questions to answer so increment to next
                 * unanswered question using the setActiveQuestion method
                 */
                vm.setActiveQuestion();
            }

            /*
             * When a user clicks an answer, this method will set that answer as
             * their selection for that question on the quizMetrics object. This
             * then allows the view to add classes to the answer to indicate it is
             * the current selection
             */
            function selectAnswer(index){
                DataService.quizQuestions[vm.activeQuestion].selected = index;
            }

            /*
             * When the final prompt is shown to the user, if they decide they are
             * finished and click yes, this method is called.
             *
             * This method:
             *          -removes the finalise flag, which will remove the prompt
             *              from the screen.
             *          -Resets the local numQuestionsAnswered variable
             *          -Sets the active question back to 0 (for future use)
             *          -Calls the markQuiz method from the quizMetrics Object
             *              created in the factory
             *          -removes quiz from the view by changing quiz state to false
             *          -displays the results in the view by setting the results
             *              state to true
             */
            function finaliseAnswers(){
                vm.finalise = false;
                numQuestionsAnswered = 0;
                vm.activeQuestion = 0;
                quizMetrics.markQuiz();
                quizMetrics.changeState("quiz", false);
                quizMetrics.changeState("results", true);
            }
        }



    /*
     * attaching results controller function to the turtleFacts module
     */
    angular
        .module("testifyApp")
        .controller("resultsCtrl", ResultsController);

    /*
     * injecting the custom service quizMetrics into the results controller
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when
     * uglifying the code. Function arguments will get shortened during the
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular
     * still knows what we want to do.
     */
    ResultsController.$inject = ['quizMetrics', 'DataService'];

    /*
     * definition of the results controller function itself. Taking
     * quizMetrics as an argument
     */
    function ResultsController(quizMetrics, DataService){
        var vm = this;

        /*
         * The pattern used in the controllers in this app puts all the
         * properties and methods available to the view at the top of the
         * function. Any methods are referenced as named functions which are
         * defined at the bottom.
         *
         * This allows the interface of the controller to be seen at a glance.
         * Which is not usually the case when defining methods as anon
         * functions inline.
         */
        vm.quizMetrics = quizMetrics; // binding the object from factory to vm
        vm.dataService = DataService;
        vm.getAnswerClass = getAnswerClass; // named function defined below
        vm.setActiveQuestion = setActiveQuestion; // named function defined below
        vm.reset = reset; // named function defined below
        vm.calculatePerc = calculatePerc; // named function defined below
        vm.activeQuestion = 0;

        function calculatePerc(){
            /*
             * simply calculating the percentage of correct answers and returning the number
             */
            return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }

        function setActiveQuestion(index){
            /*
             * setting active question on the results page
             */
            vm.activeQuestion = index;
        }

        function getAnswerClass(index){
            /*
             * returning the class to style the answer depending on whether it
             * is right or wrong. quizMetrics can be referenced here without
             * vm. as the object is passed by reference. We can manipulate
             * the object directly here. vm. is only needed when it is being
             * manipulated by the view as the view does not have direct access
             * to the quizMetrics service. But as we are in the controller
             * we can directly manipulate it
             */
            if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            }else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
                return "bg-danger";
            }
        }

        function reset(){
            /*
             * reseting all the data. This includes reverting the results state
             * back to false which will return the view to the lists.
             *
             * Also all the variables on each question object is returned to
             * the default state using the for loop to iterate through all
             * questions.
             */
            quizMetrics.changeState("results", false);
            quizMetrics.numCorrect = 0;

            for(var i = 0; i < DataService.quizQuestions.length; i++){
                var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean

                data.selected = null;
                data.correct = null;
            }
        }

    }

})();