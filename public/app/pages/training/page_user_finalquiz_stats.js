var PageUserFinalQuizStats = (function (context, $) {
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
            self.Options.CurrentPageUserStatsFinalQuiz = 1;
            self.Options.CurrentPageUserStatsFinalQuizTotal = 0;
            self.Options.LastPageUserStatsFinalQuiz = 0;
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

            this.Elements.body.on('click', '#page-next-tbl-final-quiz-nav', $.proxy(this.eventNextBtnTableUserStatsFinalQuiz));
            this.Elements.body.on('click', '#page-prev-tbl-final-quiz-nav', $.proxy(this.eventPrevBtnTableUserStatsFinalQuiz));
            this.Elements.body.on('click', '#btn-confirm-delete', $.proxy(this.eventBtnConfirmDelete));
 
        
            

        },

        initVendors: function () {

            self = obj;
            $("#file").hide();


        },

        initTemplates: function () {


            this.Templates.templateRenderTableUserStatsFinalQuiz = _.template(TemplateViewUserFinalQuizStats.renderTableUserStatsFinalQuiz); 
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
                    self.Options.CurrentPageUserStatsFinalQuiz = 1;
                    self.Options.CurrentPageUserStatsFinalQuizTotal = self.Data.Stats.length;
                    self.Options.LastPageUserStatsFinalQuiz = Math.ceil(self.Data.Stats.length / self.Options.DefaultPageSize);

                    //disable Next Btn
                    if (self.Options.LastPageUserStatsFinalQuiz == 1) {
                        $('#page-next-tbl-final-quiz-nav').addClass("disabled");
                    } else {
                        $('#page-next-tbl-final-quiz-nav').removeClass("disabled");
                    }
                
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
            let prev = (((self.Options.CurrentPageUserStatsFinalQuiz) - 1) * self.Options.DefaultPageSize) + 1;
            let next = ((self.Options.CurrentPageUserStatsFinalQuiz) * self.Options.DefaultPageSize);
            let evs = self.Data.Stats.slice(prev - 1, next);

            let html_table = self.Templates.templateRenderTableUserStatsFinalQuiz({
                evs: evs
            });
            $('#tbl-final-quiz tbody').html('');
            $('#tbl-final-quiz tbody').html(html_table);
        },
        //==================================================================
  
        eventBtnConfirmDelete:function(){
            self = obj;
            $('#deleteSessionModal').modal('hide');
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
          
            self.reloadTableUserStatsFinalQuiz();
        
        },
        
 


        //-----------------------------------------------------
        //-----------------------------------------------------

        renderPage: function (pageId) {
            self = obj;
        
        },


        //-----------------------------------------------------
        //-----------------------------------------------------
 
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



    };


    return {
        Init: obj.init
    };
})(this, jQuery);