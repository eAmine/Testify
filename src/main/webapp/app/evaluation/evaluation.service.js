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
                                                    "description": "Interprété"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Compilé"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Les deux"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Ni l'un ni l'autre"
                                                }
                                            ]
                                        ,
                                        "description": "Java est un langage…",

                                    },
                                    {

                                            "reponses": [
                                                {
                                                    score: -1,
                                                    "description": "Que la valeur de cet attribut est constante"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Que cet attribut n'est visible que dans la classe où il est défini"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Que cet attribut sera toujours passé par valeur"
                                                },
                                                {
                                                    score: 1,
                                                    "description": "Que cet attribut a une valeur unique pour toutes les instances de la classe"
                                                }

                                            ]
                                        ,
                                        "description": "Que signifie le mot clef 'static' associé à un attribut ?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Une classe abstraite ne peut être instanciée"
                                            },
                                            {
                                                score: -1,
                                                "description": "Une méthode abstraite n'a pas d'implémentation"
                                            },
                                            {
                                                score: 1,
                                                "description": "Une classe abstraite n'a pas forcément de classe fille"
                                            },
                                            {
                                                score: -1,
                                                "description": "Une classe abstraite doit contenir au moins une méthode abstraite"
                                            }

                                        ]
                                        ,
                                        "description": "Au sujet du mot clef 'abstract', quelle assertion est fausse ?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Parent p = new Child();"
                                            },
                                            {
                                                score: -1,
                                                "description": "myParent = myChild;"
                                            },
                                            {
                                                score: -1,
                                                "description": "myChild = myParent;"
                                            },
                                            {
                                                score: 1,
                                                "description": "myChild = (MyChild)myParent;"
                                            }

                                        ]
                                        ,
                                        "description": "Child est une classe héritant de la classe Parent. myChild et myParent sont des instances respectivement de Child et Parent. Quel code ne compile pas ?",

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

        dataFactory.getQuestionnairesForTheme=function(){
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++){
                if(dataFactory.allData.evaluation.questionnaires[i].score!=null){
                    dataFactory.allData.evaluation.questionnaires[i].disabled=true;
                }
                else{
                    dataFactory.allData.evaluation.questionnaires[i].disabled=false;
                }
                dataFactory.allData.evaluation.questionnaires[i].totalScore=dataFactory.allData.evaluation.questionnaires[i].questions[i].reponses.length;


            }
            return dataFactory.allData.evaluation.questionnaires;
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