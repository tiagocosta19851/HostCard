var PageQuiz = (function (context, $) {
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

        init: function (modId,userId=null) {

            let self = obj;
            self.Elements.PageLayout = GenericPage;
            self.ModId=parseInt(modId);
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
             this.Elements.body.on('click', 'label.radio-button-label', $.proxy(this.eventClickOption));  
             this.Elements.body.on('click', '.btn-finish.btn', $.proxy(this.eventSendQuiz));
             this.Elements.body.on('click', '.btn-finish-modal.btn', $.proxy(this.eventSendQuizModal));
            
             this.Elements.body.on('click', '.btn-finish-user .btn', $.proxy(this.eventRenderUsers));

        },

        initVendors: function () {

            self = obj;
            $("#file").hide();


        },

        initTemplates: function () {


          this.Templates.templateRenderBuildResults = _.template(TemplateViewQuiz.renderBuildResults);
          this.Templates.templateRenderUser = _.template(TemplateViewQuiz.renderUser); 
          this.Templates.templateRenderModalUsers =_.template(TemplateViewQuiz.renderModalUsers);

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
            self.eventPushQuiz(self.ModId);
            //============================================================================


        },

        eventPushQuiz:function(moduleId){

            self=obj;

           
            self.ajaxPushQuizNoAnswer(moduleId).then(function (res) {
              
                self.Data.Quiz=res.data; 
                self.ajaxPushActiveUsers().then(function (res2) { 
                    self.Data.Users=res2.data;  
                });
            
            });  

        },

       
        eventClickOption:function(){
            self = obj; 
            var selectionId=$(this).data("selectionid");
            var groupId=$(this).closest("fieldset").data("groupid");
            var glagMult=$(this).closest("fieldset").data("multoption");

            if(glagMult==false){
                $("fieldset[data-groupId='"+groupId+"']").find(".radio-button-label.checked").not("[data-selectionid='"+selectionId+"']").removeClass("checked"); 

                if( $(this).hasClass("checked")){
 
                    $(this).removeClass("checked"); 
                }else{
                    $(this).addClass("checked"); 
                }
            }else{
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
            // let html_table = self.Templates.templateRenderBuildPage({
            //     module: self.Data.Quiz,
            //     pageID: pageId
            // });
            // $('main').html('');
            // $('main').html(html_table);
        },


        //-----------------------------------------------------
        //-----------------------------------------------------

        ajaxPushQuizNoAnswer: function (moduleId) {
            let self = obj;

            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(moduleId),
                },
                url: "/learning/module/push-quiz-module-no-answer/",
                contentType: 'application/json',
            });

        },
        ajaxPushActiveUsers: function (moduleId) {
            let self = obj;

            return $.ajax({
                type: "GET", 
                url: "/learning/module/push-active-users/",
                contentType: 'application/json',
            });

        },

        ajaxSendQuizModule2: function () {
            let self = obj;
            
            let lst=[]
            for(var key in  self.SavedAnswers) {

                let b=self.SavedAnswers[key];

                let a={"id":parseInt(key),"answers":b};
                lst.push(a);
            }

            let modId=self.ModId;
            let aux1={"moduleId":modId,"quiz":lst,"flagAnswer":false};
 
            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(aux1),
                },
                url: "/learning/module/send-quiz/",
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
            let modId=self.ModId;
            let userId=parseInt(self.Data.UserId);
            let aux1={"moduleId":modId,"quiz":lst,"flagAnswer":false,"type":"module-final-quiz","userId":userId};


           
            return $.ajax({
                type: "GET",
                data: {
                    Data: JSON.stringify(aux1),
                },
                url: "/learning/module/send-quiz/",
                contentType: 'application/json',
            });

        },


        eventRenderUsers:function(){
            self=obj;
            var flag=self.eventSaveQuiz();
            if(flag==true){
                if(self.Data.UserId==null){
                    // let html_table = self.Templates.templateRenderUser({ 
                    //     users:self.Data.Users
                    // });
                    let html_table = self.Templates.templateRenderModalUsers({ 
                        users:self.Data.Users
                    });
                   

                    $('#modalQuizUsers').html('');
                    $('#modalQuizUsers').html(html_table);
                    $('#modalQuizUsers').modal('show');
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
            }else{
                alert("Please, select an answers for all questions.");
            }
           
        
        },

        //envia por ajax as respostas
        eventSendQuiz:function(){


            self=obj;
           
            self.ajaxSendQuizModule().then(function (res) {
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

         //envia por ajax as respostas
         eventSendQuizModal:function(){


            self=obj;
            self.Data.UserId=$('#select-user').val();
            $('#modalQuizUsers').modal('hide');
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
              

            delay(500).then(() => {
                self.ajaxSendQuizModule().then(function (res) {
                    console.log(res);
                    $('#modalQuizUsers').modal('hide');
    
    
                    let html_table = self.Templates.templateRenderBuildResults({
                        quizTotal: res.data 
                    });
                    
                    $('main').html('');
                    $('main').html(html_table);
    
                    // self.Data.Module=res.data; 
                    // var page=self.Data.Module.Pages[0]; 
                    // self.renderPage(page.Id); 
                });  
              });  
                
                

          
        },


        //guarda as respostas em json object 
        eventSaveQuiz:function(){

            self = obj;
       
           
            var dict = {};
            var flagContinue=true;
            $( ".question-fieldset" ).each(function() {

                let groupid=$(this).data("groupid"); 

                if( self.SavedAnswers[groupid] === undefined ) {
                    self.SavedAnswers[groupid] =[];
                }


                var s=[];
                $(this).find("label.checked").each(function() {

                    let selectionid=$(this).data("selectionid"); 
                    var  q={"selectionId":selectionid}

                    s.push(q);
                });

                if(s.length>0){
                     
                    var flag=false;
                    for(var key in  self.SavedAnswers) {
                       
                        if(key==groupid){
                            self.SavedAnswers[key]=s;
                            flag=true;
                            break;
                        }  
                    } 
                    if(flag==false){
                        self.SavedAnswers[groupid]=s;
                    }
                }else{
                    flagContinue=false;
                    for(var key in  self.SavedAnswers) {
                       
                        if(key==groupid){
                            self.SavedAnswers[key]=[]; 
                            break;
                        }  
                    } 
                } 
               
             });

             console.log(self.SavedAnswers); 
             return flagContinue;
        },
    };


    return {
        Init: obj.init
    };
})(this, jQuery);