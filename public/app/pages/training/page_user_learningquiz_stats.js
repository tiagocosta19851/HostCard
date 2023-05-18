var PageUserLearningQuizStats = (function (context, $) {
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

        init: function (session) {

            let self = obj;
            self.Elements.PageLayout = GenericPage; 
            self.Data.Session =session;


            self.Options.DefaultPageSize = 10;
            
            //-------------------------------------
            self.Options.CurrentPageUserStatsLearningQuiz = 1;
            self.Options.CurrentPageUserStatsLearningQuizTotal = 0;
            self.Options.LastPageUserStatsLearningQuiz = 0;
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

            this.Elements.body.on('click', '#page-next-tbl-learning-quiz-nav', $.proxy(this.eventNextBtnTableUserStatsLearningQuiz));
            this.Elements.body.on('click', '#page-prev-tbl-learning-quiz-nav', $.proxy(this.eventPrevBtnTableUserStatsLearningQuiz)); 
            this.Elements.body.on('click', '#btn-confirm-delete', $.proxy(this.eventBtnConfirmDelete));
 

        },

        initVendors: function () {

            self = obj;
            $("#file").hide();


        },

        initTemplates: function () {


            this.Templates.templateRenderTableUserStatsLearningQuiz = _.template(TemplateViewUserLearningQuizStats.renderTableUserStatsLearningQuiz); 
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
            self.ajaxPushSession(self.Data.Session).then(function (res) {

                
                self.Data.Stats = res.data;
                self.buildTableModules();
                self.resetPagination();
            });

        },

        resetPagination: function () {
            self = obj;
            if (self.Data.Stats != null) {
                
                    //history bets 
                    self.Options.CurrentPageUserStatsLearningQuiz = 1;
                    self.Options.CurrentPageUserStatsLearningQuizTotal = self.Data.Stats.length;
                    self.Options.LastPageUserStatsLearningQuiz = Math.ceil(self.Data.Stats.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageUserStatsLearningQuiz == 1) {
                        $('#page-next-tbl-learning-quiz-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-learning-quiz-nav').removeClass("disabled");
                    }
                
            }
        },
       
        //==================================================================


        eventNextBtnTableUserStatsLearningQuiz: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let nextPage = self.Options.CurrentPageUserStatsLearningQuiz + 1;
            if (self.Options.CurrentPageUserStatsLearningQuiz == self.Options.LastPageUserStatsLearningQuiz && self.Options.CurrentPageUserStatsLearningQuiz == 1) {
                $('#page-next-tbl-learning-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quiz-nav').addClass("disabled");

            } else if (nextPage > self.Options.LastPageUserStatsLearningQuiz) {
                $('#page-next-tbl-learning-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quiz-nav').removeClass("disabled");

            } else if (nextPage == self.Options.LastPageUserStatsLearningQuiz) {

                $('#page-next-tbl-learning-quiz-nav').addClass("disabled");
                $('#page-prev-tbl-learning-quiz-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsLearningQuiz += 1;
                self.reloadTableUserStatsLearningQuiz();
            } else if (nextPage < self.Options.LastPageUserStatsLearningQuiz) {
                $('#page-next-tbl-learning-quiz-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-quiz-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsLearningQuiz += 1;
                self.reloadTableUserStatsLearningQuiz();

            }
        },
        eventPrevBtnTableUserStatsLearningQuiz: function (e) {

            e.preventDefault();
            self = obj;
            //self.Data.pastEvents
            let prevPage = self.Options.CurrentPageUserStatsLearningQuiz - 1;
            if (prevPage == 1) {

                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').addClass("disabled");
                self.Options.CurrentPageUserStatsLearningQuiz = 1;
                self.reloadTableUserStatsLearningQuiz();
            } else if (prevPage > 1) {
                $('#page-next-tbl-learning-nav').removeClass("disabled");
                $('#page-prev-tbl-learning-nav').removeClass("disabled");
                self.Options.CurrentPageUserStatsLearningQuiz -= 1;
                self.reloadTableUserStatsLearningQuiz();

            }

        },
        reloadTableUserStatsLearningQuiz: function () {
            self = obj;
            let prev = (((self.Options.CurrentPageUserStatsLearningQuiz) - 1) * self.Options.DefaultPageSize) + 1;
            let next = ((self.Options.CurrentPageUserStatsLearningQuiz) * self.Options.DefaultPageSize);
            let evs = self.Data.Stats.slice(prev - 1, next);

            let html_table = self.Templates.templateRenderTableUserStatsLearningQuiz({
                evs: evs
            });
            $('#tbl-learning-quiz tbody').html('');
            $('#tbl-learning-quiz tbody').html(html_table);
        },
        //==================================================================
        eventBtnConfirmDelete:function(){
            self = obj;
           
            self.ajaxDeleteSession(self.Data.Session).then(function (res) {  
                $('#deleteSessionModal').modal('hide');
                if(res.data==true){
                    $(".cantainer-delete-session .btn-danger").hide();
                    alert("success!");
                }
                 
            });
        },
      
        buildTableModules: function () {
            self = obj;
          
            self.reloadTableUserStatsLearningQuiz();
        
        },
        
 


        //-----------------------------------------------------
        //-----------------------------------------------------

        renderPage: function (pageId) {
            self = obj;
        
        },


        //-----------------------------------------------------
        //-----------------------------------------------------
        ajaxDeleteSession: function (session) {
            let self = obj;
            return $.ajax({
                type: "GET",
                data: {
                    Data: session,
                },
                url: "/stats/delete-session/",
                contentType: 'application/json',
            });

        },
        ajaxPushSession: function (session) {
            let self = obj;
            return $.ajax({
                type: "GET",
                data: {
                    Data: session,
                },
                url: "/stats/push-session/",
                contentType: 'application/json',
            });

        },





    };


    return {
        Init: obj.init
    };
})(this, jQuery);