var PageModule = (function (context, $) {
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
        SavedAnswers:{},
        ModId:0,

        init: function (mod,page,userId=null) {

            let self = obj;
            self.Elements.PageLayout = GenericPage;

            self.Data.ModuleId=parseInt(mod);
            self.Data.PageId=parseInt(page);
            self.Data.UserId=null;
         
            if(userId==""){
                self.Data.UserId=null;
            }else if(userId!=null){
                self.Data.UserId=parseInt(userId);
            }
        

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
             this.Elements.body.on('click', '.btn-prev.btn', $.proxy(this.eventBtnPrev));
             this.Elements.body.on('click', '.btn-next.btn', $.proxy(this.eventBtnNext));
             this.Elements.body.on('click', '.btn-save .btn', $.proxy(this.eventBtnSaveQuiz)); 
             this.Elements.body.on('click', '.btn-finish-user', $.proxy(this.eventRenderUsers)); 
             this.Elements.body.on('click', '.btn-finish', $.proxy(this.eventSendQuiz));

             this.Elements.body.on('click', '.btn-finish-modal.btn', $.proxy(this.eventSendQuizModal));
          
             this.Elements.body.on('click', 'label.radio-button-label', $.proxy(this.eventClickOption));
           

           
            // this.Elements.body.on('click', '#menu1 .nav-item', $.proxy(this.eventChangeRulesMenu1));
            // this.Elements.body.on('click', '#menu2 .nav-item', $.proxy(this.eventChangeRulesMenu2));
            // this.Elements.body.on('click', '#menu3 .nav-item:not(.title)', $.proxy(this.eventChangeRulesMenu3));

        },

        initVendors: function () {

            self = obj;



        },

        initTemplates: function () {


           this.Templates.templateRenderBuildPage = _.template(TemplateViewModule.renderBuildPage);
           this.Templates.templateRenderBuildQuiz = _.template(TemplateViewModule.renderBuildQuiz);
           this.Templates.templateRenderBuildResults = _.template(TemplateViewModule.renderBuildResults);
           this.Templates.templateRenderUser = _.template(TemplateViewModule.renderUser); 
           this.Templates.templateRenderModalUsers = _.template(TemplateViewModule.renderModalUsers); 
           
          
           
           

        },

        initPage: function () {

            self = obj;

            // let code = "0-0-0-0";
            // let html_table = self.Templates.templateRenderBuildMenuAddRules({
            //     objMenu: dummyData.menuRules1,
            //     code: code,
            //     mode: "desktop"
            // });
            // $('#model-add-filter-automated-bets .modal-body').html('');
            // $('#model-add-filter-automated-bets .modal-body').html(html_table);


        },


        loadData: function () {
            self = obj;
           // self.Data.portfolioList = dummyData.portfolioList;
            self.eventPushModule(self.Data.ModuleId);
            //============================================================================


        },

        eventPushModule:function(moduleId){
            
            self=obj;
            self.ajaxPushModule(moduleId).then(function (res) {
             
                self.Data.Module=res.data; 
                self.ajaxPushUsers().then(function (res2) { 
                    self.Data.Users=res2.data; 
                    self.renderPage(self.Data.PageId);
                });
  
                //var page=self.Data.Module.Pages[0];
                 
              


            });
 
        },

        eventRenderUsers:function(){
            self=obj;
            if(self.Data.UserId==null){
                // let html_table = self.Templates.templateRenderUser({ 
                //     users:self.Data.Users
                // });
                // $('main').html('');
                // $('main').html(html_table);
                let html_table = self.Templates.templateRenderModalUsers({ 
                    users:self.Data.Users
                });
               

                $('#modalLearningUsers').html('');
                $('#modalLearningUsers').html(html_table);
                $('#modalLearningUsers').modal('show');
            }else{
                self.ajaxSendQuizModule().then(function (res) {
                 
                    let html_table = self.Templates.templateRenderBuildResults({
                        quizTotal: res.data ,
                        ModuleId:self.Data.ModuleId
                    });
                    
                    $('main').html('');
                    $('main').html(html_table); 
                });  
            }
        
        },


           //envia por ajax as respostas
           eventSendQuizModal:function(){


            self=obj;
            self.Data.UserId=$('#select-user').val();
           
            self.ajaxSendQuizModule().then(function (res) {
                console.log(res);
                $('#modalLearningUsers').modal('hide');

                let html_table = self.Templates.templateRenderBuildResults({
                    quizTotal: res.data ,
                    ModuleId:self.Data.ModuleId
                });
                
                $('main').html('');
                $('main').html(html_table);

                // self.Data.Module=res.data; 
                // var page=self.Data.Module.Pages[0]; 
                // self.renderPage(page.Id); 
            });  
        },


        eventSendQuiz:function(){


            self=obj;

            let userID= $(".selectpicker").val();
            self.Data.UserId=userID;


            self.ajaxSendQuizModule().then(function (res) {
                console.log(res);
                

                let html_table = self.Templates.templateRenderBuildResults({
                    quizTotal: res.data ,
                    ModuleId:self.Data.ModuleId
                });
                
                $('main').html('');
                $('main').html(html_table);
                // self.Data.Module=res.data; 
                // var page=self.Data.Module.Pages[0]; 
                // self.renderPage(page.Id); 
            });  
        },


       
        eventBtnPrev:function(){
            self = obj; 
            let pageId = $(this).data("prev");
            self.renderPage(pageId);

        },
        eventBtnNext:function(){
            self = obj;
            let currentPageId = $(this).data("current");
            let nextPageId = $(this).data("next");
            let flagQuiz= $(this).data("quiz");
            if(flagQuiz){
                self.renderQuiz(currentPageId,nextPageId);
            }else{
                self.renderPage(nextPageId);
            }

        },

        eventBtnSaveQuiz:function(){

            self = obj;
            let currentPageId = $(this).data("current");
            let nextPageId = $(this).data("next");
            let flagIsPage= $(this).data("page");


           let flagContinue=true;
            var dict = {};
            $( ".question-fieldset" ).each(function() {

                let groupid=$(this).data("groupid"); 
                let quizid=$(this).data("quizid"); 

                if( self.SavedAnswers[quizid] === undefined ) {
                    self.SavedAnswers[quizid] =[];
                }


                var s=[];
                $(this).find("label.checked").each(function() {

                   let selectionid=$(this).data("selectionid"); 
                   var  q={"selectionId":selectionid,"pageId":currentPageId,"groupId":groupid}
                    s.push(q);
                });

                if(s.length>0){
                     
                    var flag=false;
                    for(var key in  self.SavedAnswers) {
                       
                        if(key==quizid){
                            self.SavedAnswers[key]=s;
                            flag=true;
                            break;
                        }  
                    } 
                    if(flag==false){
                        self.SavedAnswers[quizid]=s;
                    }
                }else{
                    flagContinue=false;
                    for(var key in  self.SavedAnswers) {
                       
                        if(key==quizid){
                            self.SavedAnswers[key]=[]; 
                            break;
                        }  
                    } 
                }               
             });

             console.log(self.SavedAnswers);

            if(flagContinue){
                if(flagIsPage){
                    self.renderPage(nextPageId);
                }

            }else{

                alert("Please, select an answers for all questions.");
            }

           

        },



        eventClickOption:function(){
            self = obj; 
            var selectionId=$(this).data("selectionid");
            var quizId=$(this).closest("fieldset").data("quizid");
            var type=$(this).closest("fieldset").data("type");

            if(type=="single"){
                $("fieldset[data-quizId='"+quizId+"']").find(".radio-button-label.checked").not("[data-selectionid='"+selectionId+"']").removeClass("checked"); 

                if( $(this).hasClass("checked")){
 
                    $(this).removeClass("checked"); 
                }else{
                    $(this).addClass("checked"); 
                }
            }else if(type=="mult"){
                if( $(this).hasClass("checked")){
 
                    $(this).removeClass("checked"); 
                }else{
                    $(this).addClass("checked"); 
                }
            }
            
              
        },
         

        //-----------------------------------------------------
        //-----------------------------------------------------

        renderPage:function(pageId){
            self = obj; 
            var flagQuiz=false;

            for(var z=0;z<self.Data.Module.Groups.length;z++){
                for(var t=0;t<self.Data.Module.Groups[z].Pages.length;t++){
                    if(self.Data.Module.Groups[z].Pages[t].Id==pageId){
                        if(self.Data.Module.Groups[z].Pages[t].Quiz!=null){
                            flagQuiz=true;
                        }
                        break;                   
                    }
                }
            }
          

            for(var z=0;z<self.Data.Module.Pages.length;z++){
            
                if(self.Data.Module.Pages[z].Id==pageId){
                     
                    $('#file').attr("value",self.Data.Module.Pages[z].Percent.toString());
                }

            }


            let html_table = self.Templates.templateRenderBuildPage({
                module: self.Data.Module,
                pageID: pageId,
                flagQuiz:flagQuiz
            });
            $('main').html('');
            $('main').html(html_table);
        },

        renderQuiz:function(currentPageId,nextPrevPageId){
            self = obj; 
            let quizs=null;
            let title="";
            let groupID=-1;
            for(var z=0;z<self.Data.Module.Groups.length;z++){
                for(var t=0;t<self.Data.Module.Groups[z].Pages.length;t++){
                    if(self.Data.Module.Groups[z].Pages[t].Id==currentPageId){
                        quizs=self.Data.Module.Groups[z].Pages[t].Quiz;
                        title=self.Data.Module.Groups[z].Pages[t].Title;
                        groupID=self.Data.Module.Groups[z].Id;
                    }
                }
            }
           

            let html_table = self.Templates.templateRenderBuildQuiz({
                quizs: quizs,
                title: title,
                nextPageId:nextPrevPageId,
                currentId:currentPageId,
                groupID:groupID,
                flagIsPage:true,
                savedAnswers:self.SavedAnswers
            });
            $('main').html('');
            $('main').html(html_table);
        },


        

        //-----------------------------------------------------
        //-----------------------------------------------------

        ajaxPushModule: function (moduleId) {
            let self = obj;

            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(moduleId),
                },
                url: "/learning/module/push-module/",
                contentType: 'application/json',
            });

        },

        ajaxPushUsers: function (moduleId) {
            let self = obj;

            return $.ajax({
                type: "GET", 
                url: "/learning/module/push-users/",
                contentType: 'application/json',
            });

        },

        ajaxSendQuizModule: function () {
            let self = obj;
            
            let lst=[]
            for(var key in  self.SavedAnswers) {

                let b=self.SavedAnswers[key];

                let a={"id":parseInt(key),"answers":b};
                lst.push(a);
            }

            let modId=self.Data.Module.Id;
            let aux1={"moduleId":modId,"quiz":lst,"flagAnswer":true,"type":"module-learning","userId": parseInt(self.Data.UserId)};

 
            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(aux1),
                },
                url: "/learning/module/send-quiz/",
                contentType: 'application/json',
            });

        },

 
    };


    return {
        Init: obj.init
    };
})(this, jQuery);