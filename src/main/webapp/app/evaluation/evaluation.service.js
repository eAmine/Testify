(function() {
    'use strict';

    angular
        .module("evaluation")
        .factory("dataFactory", dataFactory);

    function dataFactory(){

        var dataFactory={
            allData:[]
        };


        dataFactory.allData =
        {
            "evaluation": {



                    "questionnaires": [
                        {
                            id:1,
                            "theme": "Java",
                             score:null,
                             image_url:"content/images/Java_logo.png",

                                "questions": [
                                    {

                                            "reponses": [
                                                {
                                                    score: 1,
                                                    "description": "qui a une valeur unique dans toutes les instances de la classe"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "dont la valeur ne peut pas être modifiée"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe seulement si leur visibilité est public"
                                                }
                                            ]
                                        ,
                                        "description": "Un attribut static est un attribut",

                                    },
                                    {

                                            "reponses": [
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles seulement dans les méthodes déclarées après l'attribut\""
                                                },
                                                {
                                                    score: 1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe seulement si leur visibilité est public\""
                                                }
                                            ]
                                        ,
                                        "description": "laquelle de ces affirmations est vraie ?",

                                    }
                                ]
                            ,
                            "niveau": "EXPERT"
                        },
                        {
                            id:2,
                            "theme": "SQL",
                             score:null,
                             image_url:"content/images/sql.png",
                                "questions": [
                                    {

                                            "reponses": [
                                                {
                                                    score: 1,
                                                    "description": "qui a une valeur unique dans toutes les instances de la classe"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "dont la valeur ne peut pas être modifiée"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe seulement si leur visibilité est public"
                                                }
                                            ]
                                        ,
                                        "description": "Un attribut static est un attribut",

                                    },
                                    {

                                            "reponses": [
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "les attributs déclarés dans une classe sont visibles seulement dans les méthodes déclarées après l'attribut\""
                                                },
                                                {
                                                    score: 1,
                                                    "description": "les attributs déclarés dans une classe sont visibles dans toutes les méthodes de la classe seulement si leur visibilité est public\""
                                                }
                                            ]
                                    ,
                                        "description": "laquelle de ces affirmations est vraie ?",

                                    }
                                ],
                            "niveau": " Junior"
                        }
                    ]
                }

        };

        dataFactory.setQuestionnaireScore=function(questionnaire,score){
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].id===questionnaire.id){
                    dataFactory.allData.evaluation.questionnaires[i].score+=score;
                }
            }


        }

        dataFactory.findQuestionnaireByTheme=function(theme){
            var questionnaire={};
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                 if(dataFactory.allData.evaluation.questionnaires[i].theme===theme){
                     questionnaire= dataFactory.allData.evaluation.questionnaires[i];
                 }
            }
            return questionnaire;
        }
        dataFactory.findQuestionsByQuestionnaireId=function(id){
            var questions=[];
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].id===id){
                    questions[i]= dataFactory.allData.evaluation.questionnaires[i].questions;
                }
            }
            return questions;
        }
        dataFactory.findQuestionsByTheme=function(theme){
            var questions={};
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].theme===theme){
                    questions= dataFactory.allData.evaluation.questionnaires[i].questions;
                }
            }
            return questions;
        }
        dataFactory.findThemes=function(){
            var themes=[];
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++){
               themes[i]=(dataFactory.allData.evaluation.questionnaires[i].theme);
            }
            return themes;
        }



        return dataFactory;
    }
})();