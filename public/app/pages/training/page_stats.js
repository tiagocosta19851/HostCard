var PageStats = (function (context, $) {
    'use strict';




    let obj = {
        Elements: {},
        Templates: {},
        Options: {},
        LstUrl: {},
        Data: {},
        Rules: [],
        FilterLeagues: [],
        FilterTeams: [],
        SavedAnswers: {},
        ModId: 0,

        init: function (modId) {

            let self = obj;
            self.Elements.PageLayout = GenericPage;
            self.Data.ModuloId = parseInt(modId);


            self.Options.DefaultPageSize = 30;
            //-------------------------------------
            self.Options.CurrentPageUserLearningModule = 1;
            self.Options.CurrentPageUserLearningModuleTotal = 0;
            self.Options.LastPageUserLearningModule = 0;
            //-------------------------------------
            self.Options.CurrentPageUserStatsFinalQuiz = 1;
            self.Options.CurrentPageUserStatsFinalQuizTotal = 0;
            self.Options.LastPageUserStatsFinalQuiz = 0;
            //-------------------------------------
            self.Options.CurrentPageAvgStatsGroups = 1;
            self.Options.CurrentPageAvgStatsGroupsTotal = 0;
            self.Options.LastPageAvgStatsGroups = 0;
            //-------------------------------------
            self.Options.CurrentPageAvgStatsPages = 1;
            self.Options.CurrentPageAvgStatsPagesTotal = 0;
            self.Options.LastPageAvgStatsPages = 0;
            //-------------------------------------
            self.Options.CurrentPageAvgStatsFinalQuizQuestions = 1;
            self.Options.CurrentPageAvgStatsFinalQuizQuestionsTotal = 0;
            self.Options.LastPageAvgStatsFinalQuizQuestions = 0;
            //-------------------------------------
            self.Options.CurrentPageAvgStatsQuizLearning = 1;
            self.Options.CurrentPageAvgStatsQuizLearningTotal = 0;
            self.Options.LastPageAvgStatsQuizLearning = 0;
            //-------------------------------------







            self.Elements.PageLayout.Init().then(function () {

                self.cache();
                self.loadData();
                self.initVendors();
                self.bindEvents();
                self.initTemplates();
                self.initPage();
                self.Elements.PageLayout.HidePreLoader();
            });
            self.Elements.PageLayout.HidePreLoader();



        },


        cache: function () {

            this.Elements.body = $('body');
            this.Elements.preloader = $('#preload');
        },

        bindEvents: function () {


            //Filters
            this.Elements.body.on('click', 'label.radio-button-label', $.proxy(this.eventClickOption));
            this.Elements.body.on('click', '.btn-finish .btn', $.proxy(this.eventSendStats));
            this.Elements.body.on('click', '#page-next-tbl-learning-nav', $.proxy(this.eventNextBtnLearningModule));
            this.Elements.body.on('click', '#page-prev-tbl-learning-nav', $.proxy(this.eventPrevBtnLearningModule));

            this.Elements.body.on('click', '#page-next-tbl-final-quiz-nav', $.proxy(this.eventNextBtnTableUserStatsFinalQuiz));
            this.Elements.body.on('click', '#page-prev-tbl-final-quiz-nav', $.proxy(this.eventPrevBtnTableUserStatsFinalQuiz));

            this.Elements.body.on('click', '#page-next-tbl-learning-pages-nav', $.proxy(this.eventNextBtnTableAvgStatsPages));
            this.Elements.body.on('click', '#page-prev-tbl-learning-pages-nav', $.proxy(this.eventPrevBtnTableAvgStatsPages));

            this.Elements.body.on('click', '#page-next-tbl-learning-groups-nav', $.proxy(this.eventNextBtnTableAvgStatsGroups));
            this.Elements.body.on('click', '#page-prev-tbl-learning-groups-nav', $.proxy(this.eventPrevBtnTableAvgStatsGroups));


            this.Elements.body.on('click', '#page-next-tbl-final-quiz-questions-nav', $.proxy(this.eventNextBtnTableAvgStatsFinalQuizQuestions));
            this.Elements.body.on('click', '#page-prev-tbl-final-quiz-questions-nav', $.proxy(this.eventPrevBtnTableAvgStatsFinalQuizQuestions));

            this.Elements.body.on('click', '#page-next-tbl-learning-quizs-nav', $.proxy(this.eventNextBtnTableAvgStatsQuizLearning));
            this.Elements.body.on('click', '#page-prev-tbl-learning-quizs-nav', $.proxy(this.eventPrevBtnTableAvgStatsQuizLearning));



        },

        initVendors: function () {

            self = obj;
            $("#file").hide();


        },

        initTemplates: function () {


            this.Templates.templateRenderTableModuleStats = _.template(TemplateViewStats.renderTableModuleStats);
            this.Templates.templateRenderTableUserStatsFinalQuiz = _.template(TemplateViewStats.renderTableUserStatsFinalQuiz);
            this.Templates.templateRenderTableUserStatsLearning = _.template(TemplateViewStats.renderTableUserStatsLearning);
            this.Templates.templateRenderTableAvgStatsPages = _.template(TemplateViewStats.renderTableAvgStatsPages);
            this.Templates.templateRenderTableAvgStatsGroups = _.template(TemplateViewStats.renderTableAvgStatsGroups);
            this.Templates.templateRenderTableAvgStatsFinalQuiz = _.template(TemplateViewStats.renderTableAvgStatsQuizFinal);
            this.Templates.templateRenderTableAvgStatsQuizLearning = _.template(TemplateViewStats.renderTableAvgStatsQuizLearning);

        },

        initPage: function () {

            self = obj;

        },

        loadData: function () {
            self = obj;
            // self.Data.portfolioList = dummyData.portfolioList;
            self.eventPushStats(self.Data.ModuloId);
            //============================================================================


        },

        eventPushStats: function (moduleId) {

            self = obj;


            self.ajaxPushGlobalStats(moduleId).then(function (res) {

                self.Data.Stats = res.data;
                self.buildTableModules();
                self.resetPagination();
            });

        },

        resetPagination: function () {
            self = obj;
            if (self.Data.Stats != null) {
                if (self.Data.Stats.UserStatsFinalQuiz != null) {

                    //history bets 
                    self.Options.CurrentPageUserStatsFinalQuiz = 1;
                    self.Options.CurrentPageUserStatsFinalQuizTotal = self.Data.Stats.UserStatsFinalQuiz.length;
                    self.Options.LastPageUserStatsFinalQuiz = Math.ceil(self.Data.Stats.UserStatsFinalQuiz.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageUserStatsFinalQuiz == 1) {
                        $('#page-next-tbl-final-quiz-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-final-quiz-nav').removeClass("disabled");
                    }
                }
                if (self.Data.Stats.UserStatsLearning != null) {

                    //history bets 
                    self.Options.CurrentPageUserLearningModule = 1;
                    self.Options.CurrentPageUserLearningModuleTotal = self.Data.Stats.UserStatsLearning.length;
                    self.Options.LastPageUserLearningModule = Math.ceil(self.Data.Stats.UserStatsLearning.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageUserLearningModule == 1) {
                        $('#page-next-tbl-learning-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-learning-nav').removeClass("disabled");
                    }
                }
                if (self.Data.Stats.AvgStatsGroups != null) {

                    //history bets 
                    self.Options.CurrentPageAvgStatsGroups = 1;
                    self.Options.CurrentPageAvgStatsGroupsTotal = self.Data.Stats.AvgStatsGroups.length;
                    self.Options.LastPageAvgStatsGroups = Math.ceil(self.Data.Stats.AvgStatsGroups.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageAvgStatsGroups == 1) {
                        $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                    }
                }
                if (self.Data.Stats.AvgStatsPages != null) {

                    //history bets 
                    self.Options.CurrentPageAvgStatsPages = 1;
                    self.Options.CurrentPageAvgStatsPagesTotal = self.Data.Stats.AvgStatsPages.length;
                    self.Options.LastPageAvgStatsPages = Math.ceil(self.Data.Stats.AvgStatsPages.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageAvgStatsPages == 1) {
                        $('#page-next-tbl-learning-pages-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-learning-pages-nav').removeClass("disabled");
                    }
                }
                if (self.Data.Stats.AvgStatsQuizFinal != null) {

                    //history bets 
                    self.Options.CurrentPageAvgStatsFinalQuizQuestions = 1;
                    self.Options.CurrentPageAvgStatsFinalQuizQuestionsTotal = self.Data.Stats.AvgStatsQuizFinal.length;
                    self.Options.LastPageAvgStatsFinalQuizQuestions = Math.ceil(self.Data.Stats.AvgStatsQuizFinal.length / self.Options.DefaultPageSize);



                    //disable Next Btn
                    if (self.Options.LastPageAvgStatsFinalQuizQuestions == 1) {
                        $('#page-next-tbl-learning-quizs-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-learning-quizs-nav').removeClass("disabled");
                    }
                }


                if (self.Data.Stats.AvgStatsQuizLearning != null) {

                    //history bets 
                    self.Options.CurrentPageAvgStatsQuizLearning = 1;
                    self.Options.CurrentPageAvgStatsQuizLearningTotal = self.Data.Stats.AvgStatsQuizLearning.length;
                    self.Options.LastPageAvgStatsQuizLearning = Math.ceil(self.Data.Stats.AvgStatsQuizLearning.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageAvgStatsQuizLearning == 1) {
                        $('#page-next-tbl-final-quiz-questions-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-final-quiz-questions-nav').removeClass("disabled");
                    }
                }


            }
        },
        eventNextBtnLearningModule: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageUserLearningModule + 1;
            if (self.Options.CurrentPageUserLearningModule == self.Options.LastPageUserLearningModule && self.Options.CurrentPageUserLearningModule == 1) {
                $('#page-next-tbl-learning-nav').addClass("disabled");
                $('#page-prev-tbl-learning-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageUserLearningModule) {
                $('#page-next-tbl-learning-nav').addClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageUserLearningModule) {

                $('#page-next-tbl-learning-nav').addClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");
                self.Options.CurrentPageUserLearningModule += 1;
                self.reloadTableLearningModule();
            } else if (nextPage < self.Options.LastPageUserLearningModule) {
                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");
                self.Options.CurrentPageUserLearningModule += 1;
                self.reloadTableLearningModule();

            }
        },
        eventPrevBtnLearningModule: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let prevPage = self.Options.CurrentPageUserLearningModule - 1;
            if (prevPage == 1) {

                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').addClass("disabled");
                self.Options.CurrentPageUserLearningModule = 1;
                self.reloadTableLearningModule();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");
                self.Options.CurrentPageUserLearningModule -= 1;
                self.reloadTableLearningModule();

            }

        },
        reloadTableLearningModule: function () {
            self = obj;
            if (self.Data.Stats.UserStatsLearning != null) {
                let prev = (((self.Options.CurrentPageUserLearningModule) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageUserLearningModule) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.UserStatsLearning.slice(prev - 1, next);


                let html_table = self.Templates.templateRenderTableUserStatsLearning({
                    evs: evs
                });
                $('#tbl-learning tbody').html('');
                $('#tbl-learning tbody').html(html_table);
            }
        },
        //==================================================================


        eventNextBtnTableUserStatsFinalQuiz: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageUserStatsFinalQuiz + 1;
            if (self.Options.CurrentPageUserStatsFinalQuiz == self.Options.LastPageUserStatsFinalQuiz && self.Options.CurrentPageUserStatsFinalQuiz == 1) {
                $('#page-next-tbl-final-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageUserStatsFinalQuiz) {
                $('#page-next-tbl-final-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageUserStatsFinalQuiz) {

                $('#page-next-tbl-final-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsFinalQuiz += 1;
                self.reloadTableUserStatsFinalQuiz();
            } else if (nextPage < self.Options.LastPageUserStatsFinalQuiz) {
                $('#page-next-tbl-final-quiz-nav').removeClass("disabled");
                $('#page-prev-tbl-final-quiz-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsFinalQuiz += 1;
                self.reloadTableUserStatsFinalQuiz();

            }
        },
        eventPrevBtnTableUserStatsFinalQuiz: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let prevPage = self.Options.CurrentPageUserStatsFinalQuiz - 1;
            if (prevPage == 1) {

                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').addClass("disabled");
                self.Options.CurrentPageUserStatsFinalQuiz = 1;
                self.reloadTableUserStatsFinalQuiz();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsFinalQuiz -= 1;
                self.reloadTableUserStatsFinalQuiz();

            }

        },
        reloadTableUserStatsFinalQuiz: function () {
            self = obj;
            if (self.Data.Stats.UserStatsFinalQuiz != null) {
                let prev = (((self.Options.CurrentPageUserStatsFinalQuiz) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageUserStatsFinalQuiz) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.UserStatsFinalQuiz.slice(prev - 1, next);

                let html_table = self.Templates.templateRenderTableUserStatsFinalQuiz({
                    evs: evs
                });
                $('#tbl-final-quiz tbody').html('');
                $('#tbl-final-quiz tbody').html(html_table);
            }

        },
        //==================================================================

        eventNextBtnTableAvgStatsPages: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageAvgStatsPages + 1;
            if (self.Options.CurrentPageAvgStatsPages == self.Options.LastPageAvgStatsPages && self.Options.CurrentPageAvgStatsPages == 1) {
                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageAvgStatsPages) {
                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageAvgStatsPages) {

                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsPages += 1;
                self.reloadTableUserStatsFinalQuiz();
            } else if (nextPage < self.Options.LastPageAvgStatsPages) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsPages += 1;
                self.reloadTableUserStatsFinalQuiz();

            }
        },
        eventPrevBtnTableAvgStatsPages: function (e) {

            e.preventDefault();
            self = obj;
            let prevPage = self.Options.CurrentPageAvgStatsPages - 1;
            if (prevPage == 1) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').addClass("disabled");
                self.Options.CurrentPageAvgStatsPages = 1;
                self.reloadTableAvgStatsPages();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsPages -= 1;
                self.reloadTableAvgStatsPages();
            }
        },
        reloadTableAvgStatsPages: function () {
            self = obj;
            if (self.Data.Stats.AvgStatsPages != null) {
                let prev = (((self.Options.CurrentPageAvgStatsPages) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageAvgStatsPages) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.AvgStatsPages.slice(prev - 1, next);

                let html_table = self.Templates.templateRenderTableAvgStatsPages({
                    evs: evs
                });
                $('#tbl-learning-pages tbody').html('');
                $('#tbl-learning-pages tbody').html(html_table);
            }
        },

        //================================================================== 

        eventNextBtnTableAvgStatsGroups: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageAvgStatsGroups + 1;
            if (self.Options.CurrentPageAvgStatsGroups == self.Options.LastPageAvgStatsGroups && self.Options.CurrentPageAvgStatsGroups == 1) {
                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageAvgStatsGroups) {
                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageAvgStatsGroups) {

                $('#page-next-tbl-learning-groups-nav').addClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsGroups += 1;
                self.reloadTableUserStatsFinalQuiz();
            } else if (nextPage < self.Options.LastPageAvgStatsGroups) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsGroups += 1;
                self.reloadTableUserStatsFinalQuiz();
            }
        },
        eventPrevBtnTableAvgStatsGroups: function (e) {

            e.preventDefault();
            self = obj;
            let prevPage = self.Options.CurrentPageAvgStatsGroups - 1;
            if (prevPage == 1) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').addClass("disabled");
                self.Options.CurrentPageAvgStatsGroups = 1;
                self.reloadTableAvgStatsGroups();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-groups-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-groups-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsGroups -= 1;
                self.reloadTableAvgStatsGroups();
            }
        },
        reloadTableAvgStatsGroups: function () {
            self = obj;
            if (self.Data.Stats.AvgStatsGroups != null) {
                let prev = (((self.Options.CurrentPageAvgStatsGroups) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageAvgStatsGroups) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.AvgStatsGroups.slice(prev - 1, next);

                let html_table = self.Templates.templateRenderTableAvgStatsGroups({
                    evs: evs
                });
                $('#tbl-learning-groups tbody').html('');
                $('#tbl-learning-groups tbody').html(html_table);
            }
        },


        //==================================================================
        reloadTableAvgStatsQuizLearning: function () {
            self = obj;
            if (self.Data.Stats.AvgStatsQuizLearning != null) {
                let prev = (((self.Options.CurrentPageAvgStatsQuizLearning) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageAvgStatsQuizLearning) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.AvgStatsQuizLearning.slice(prev - 1, next);

                let html_table = self.Templates.templateRenderTableAvgStatsQuizLearning({
                    evs: evs
                });
                $('#tbl-learning-quizs tbody').html('');
                $('#tbl-learning-quizs tbody').html(html_table);
            }
        },
        eventNextBtnTableAvgStatsQuizLearning: function (e) {
            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageAvgStatsQuizLearning + 1;
            if (self.Options.CurrentPageAvgStatsQuizLearning == self.Options.LastPageAvgStatsQuizLearning && self.Options.CurrentPageAvgStatsQuizLearning == 1) {
                $('#page-next-tbl-learning-quizs-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageAvgStatsQuizLearning) {
                $('#page-next-tbl-learning-quizs-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageAvgStatsQuizLearning) {

                $('#page-next-tbl-learning-quizs-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsQuizLearning += 1;
                self.reloadTableAvgStatsQuizLearning();
            } else if (nextPage < self.Options.LastPageAvgStatsQuizLearning) {
                $('#page-next-tbl-learning-quizs-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsQuizLearning += 1;
                self.reloadTableAvgStatsQuizLearning();
            }
        },
        eventPrevBtnTableAvgStatsQuizLearning: function (e) {

            e.preventDefault();
            self = obj;
            let prevPage = self.Options.CurrentPageAvgStatsQuizLearning - 1;
            if (prevPage == 1) {
                $('#page-next-tbl-learning-quizs-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').addClass("disabled");
                self.Options.CurrentPageAvgStatsQuizLearning = 1;
                self.reloadTableAvgStatsQuizLearning();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-quizs-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-quizs-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsQuizLearning -= 1;
                self.reloadTableAvgStatsQuizLearning();
            }


        },
        //==================================================================

        reloadTableAvgStatsFinalQuizQuestions: function () {
            self = obj;
            if (self.Data.Stats.AvgStatsQuizFinal != null) {

                let prev = (((self.Options.CurrentPageAvgStatsFinalQuizQuestions) - 1) * self.Options.DefaultPageSize) + 1;
                let next = ((self.Options.CurrentPageAvgStatsFinalQuizQuestions) * self.Options.DefaultPageSize);
                let evs = self.Data.Stats.AvgStatsQuizFinal.slice(prev - 1, next);

                let html_table = self.Templates.templateRenderTableAvgStatsFinalQuiz({
                    evs: evs
                });
                $('#tbl-final-quiz-questions tbody').html('');
                $('#tbl-final-quiz-questions tbody').html(html_table);
                //LastPageAvgStatsFinalQuizQuestions
            }
        },
        eventNextBtnTableAvgStatsFinalQuizQuestions: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageAvgStatsFinalQuizQuestions + 1;
            if (self.Options.CurrentPageAvgStatsFinalQuizQuestions == self.Options.LastPageAvgStatsFinalQuizQuestions && self.Options.CurrentPageAvgStatsFinalQuizQuestions == 1) {
                $('#page-next-tbl-final-quiz-questions-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageAvgStatsFinalQuizQuestions) {
                $('#page-next-tbl-final-quiz-questions-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageAvgStatsFinalQuizQuestions) {

                $('#page-next-tbl-final-quiz-questions-nav').addClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsFinalQuizQuestions += 1;
                self.reloadTableAvgStatsFinalQuizQuestions();

            } else if (nextPage < self.Options.LastPageAvgStatsFinalQuizQuestions) {
                $('#page-next-tbl-final-quiz-questions-nav').removeClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsFinalQuizQuestions += 1;
                self.reloadTableAvgStatsFinalQuizQuestions();

            }
        },
        eventPrevBtnTableAvgStatsFinalQuizQuestions: function (e) {

            e.preventDefault();
            self = obj;
            let prevPage = self.Options.CurrentPageAvgStatsFinalQuizQuestions - 1;
            if (prevPage == 1) {
                $('#page-next-tbl-final-quiz-questions-nav').removeClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').addClass("disabled");
                self.Options.CurrentPageAvgStatsFinalQuizQuestions = 1;
                self.reloadTableAvgStatsFinalQuizQuestions();
            } else if (prevPage > 1) {
                $('#page-next-tbl-final-quiz-questions-nav').removeClass("disabled");
                $('#page-prev-tbl-final-quiz-questions-nav').removeClass("disabled");
                self.Options.CurrentPageAvgStatsFinalQuizQuestions -= 1;
                self.reloadTableAvgStatsFinalQuizQuestions();
            }
        },
        //==================================================================

        buildTableModules: function () {
            self = obj;
            self.reloadTableLearningModule();
            self.reloadTableUserStatsFinalQuiz();
            self.reloadTableAvgStatsGroups();
            self.reloadTableAvgStatsPages();
            self.reloadTableAvgStatsFinalQuizQuestions();
            self.reloadTableAvgStatsQuizLearning();
        },
        eventClickOption: function () {
            self = obj;
            var selectionId = $(this).data("selectionid");
            var groupId = $(this).closest("fieldset").data("groupid");
            var glagMult = $(this).closest("fieldset").data("multoption");

            if (glagMult == false) {
                $("fieldset[data-groupId='" + groupId + "']").find(".radio-button-label.checked").not("[data-selectionid='" + selectionId + "']").removeClass("checked");

                if ($(this).hasClass("checked")) {

                    $(this).removeClass("checked");
                } else {
                    $(this).addClass("checked");
                }
            } else {
                if ($(this).hasClass("checked")) {

                    $(this).removeClass("checked");
                } else {
                    $(this).addClass("checked");
                }
            }



        },


        //-----------------------------------------------------
        //-----------------------------------------------------

        renderPage: function (pageId) {
            self = obj;
            // let html_table = self.Templates.templateRenderBuildPage({
            //     module: self.Data.Stats,
            //     pageID: pageId
            // });
            // $('main').html('');
            // $('main').html(html_table);
        },


        //-----------------------------------------------------
        //-----------------------------------------------------

        ajaxPushGlobalStats: function (moduleId) {
            let self = obj;

            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(moduleId),
                },
                url: "/stats/push-global-stats/",
                contentType: 'application/json',
            });

        },



        ajaxSendStatsModule: function () {
            let self = obj;

            let lst = []
            for (var key in self.SavedAnswers) {

                let b = self.SavedAnswers[key];

                let a = {
                    "id": parseInt(key),
                    "answers": b
                };
                lst.push(a);
            }

            let modId = self.Data.ModuloId;
            let aux1 = {
                "moduleId": modId,
                "quiz": lst,
                "flagAnswer": false
            };

            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(aux1),
                },
                url: "/learning/module/send-quiz/",
                contentType: 'application/json',
            });

        },


        eventSendStats: function () {


            self = obj;
            self.eventSaveStats();

            self.ajaxSendStatsModule().then(function (res) {
                console.log(res);


                let html_table = self.Templates.templateRenderBuildResults({
                    quizTotal: res.data
                });

                $('main').html('');
                $('main').html(html_table);
                // self.Data.Module=res.data; 
                // var page=self.Data.Module.Pages[0]; 
                // self.renderPage(page.Id); 
            });
        },



        eventSaveStats: function () {

            self = obj;


            var dict = {};
            $(".question-fieldset").each(function () {

                let groupid = $(this).data("groupid");

                if (self.SavedAnswers[groupid] === undefined) {
                    self.SavedAnswers[groupid] = [];
                }


                var s = [];
                $(this).find("label.checked").each(function () {

                    let selectionid = $(this).data("selectionid");
                    var q = {
                        "selectionId": selectionid
                    }

                    s.push(q);
                });

                if (s.length > 0) {

                    var flag = false;
                    for (var key in self.SavedAnswers) {

                        if (key == groupid) {
                            self.SavedAnswers[key] = s;
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        self.SavedAnswers[groupid] = s;
                    }
                } else {
                    for (var key in self.SavedAnswers) {

                        if (key == groupid) {
                            self.SavedAnswers[key] = [];
                            break;
                        }
                    }
                }

            });

            console.log(self.SavedAnswers);
        },
    };


    return {
        Init: obj.init
    };
})(this, jQuery);