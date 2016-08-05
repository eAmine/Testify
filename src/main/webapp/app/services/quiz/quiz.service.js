/*
 * IIFE to keep code safe and outside the global namespace
 */
(function(){

    /*
     * Declaring a factory service as part of the existing turtleFacts Module.
     */
    angular
        .module("testifyApp")
        .factory("DataService", DataService);

    /*
     * Actual definition of the function used for this factory
     */
    function DataService(){
        /*
         * dataObj is used to simulate getting the data from a backend server
         * The object will hold data which will then be returned to the other
         * factory declared in js/factory/quiz.js which has this factory
         * as a dependency
         */

        var dataObj = {

            quizQuestions: quizQuestions,
            correctAnswers: correctAnswers
        };

        // returning the dataObj to anything that uses this factory as a
        // dependency
        return dataObj;
    }

    /*
     * all of the below variables are simulating data that would typically be
     * retrieved using an HTTP call to an API endpoint.
     *
     * For simplicity sake this data is hardcoded into the app as this tutorial
     * is about building the angular app, not the backend.
     *
     * The correctAnswers variable would be retrieved when the user has
     * finished the quiz and would be used to mark the users answers against
     * the correct answers
     *
     * the quizQuestions is an array of objects, each containing data
     * pertaining to a single question. This includes:
     *                          - The type of question: image or text
     *                          - Text of the question (aka the actual question)
     *                          - A set of 4 possible answers, either text or
     *                              images as indicated above
     *                          - a selected flag which will be used to know if
     *                              the user has selected
     *                          an answer yet.
     *                          - Whether the user got the question correct or
     *                              not
     *
     * The final turtleData variable hold the information that will be
     * displayed in the list view when the app loads. This includes the name
     * and an image of each turtle as well as other information such as the
     * location and the size of the turtles
     *
     */

    var correctAnswers = [1, 2, 3, 0, 2, 0, 3, 2, 0, 3];

    var quizQuestions  = [
        {
            type: "text",
            text: "laquelle de ces affirmations est vraie ?",
            possibilities: [
                {
                    answer: "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe"
                },
                {
                    answer: "les attributs déclarés dans une classe sont visibles seulement dans les méthodes déclarées après l'attribut"
                },
                {
                    answer: "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe seulement si leur visibilité est public"
                }

            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Un attribut static est un attribut",
            possibilities: [
                {
                    answer: "qui a une valeur unique dans toutes les instances de la classe"
                },
                {
                    answer: "dont la valeur ne peut pas être modifiée"
                },
                {
                    answer: "qui a une valeur unique dans toutes les instances de la classe et dont la valeur ne peut pas être modifiée"
                }

            ],
            selected: null,
            correct: null
        },

        {
            type: "text",
            text: "Que va afficher le programme suivant à la console ?",
            possibilities: [
                {
                    answer: "ABCDE"
                },
                {
                    answer: "ACD"
                },
                {
                    answer: "A0CDE"
                }

            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            text: "Lequel n'a pas sa place parmi ces choix :",
            possibilities: [
                {
                    answer: "Tinstanceof"
                },
                {
                    answer: "select"
                },
                {
                    answer: "for"
                },
                {
                    answer: "volatile"
                }
            ],
            selected: null,
            correct: null
        }

    ];

})();