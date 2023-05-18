var TemplateViewModule = {



    renderModalUsers:`
    <!-- Modal -->
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="modalLearningUsersLabel">Select Staff Member</h5>            
        </div>
        <div class="modal-body">
       
        
        <select class="selectpicker2 col-12" id="select-user">
        <%
            _.each(users,function(item1,key1, list ){  
        %> 
            <option  value="<%-item1.Id %>"><%-item1.Name %></option> 
        <%
        });
        %>   
        </select>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-primary btn-finish-modal btn">Save</button>
        </div>
        </div>
    </div>
    
    `,


    renderUser: ` 
<div class="container-login100 container">
    <div class="wrap-login100 row"> 
    <span class="login100-form-title col-12">
        Select Staff Member
    </span> 
    <select class="selectpicker col-12">
    <%
        _.each(users,function(item1,key1, list ){  
    %> 
            <option  value="<%-item1.Id %>"><%-item1.Name %></option> 
        <%
        });
        %>   
    </select>
    <div class="col-12 row justify-content-center">
    <div class="btn-finish btn btn-outline-secondary btn-lg col-5 ">Finish</div>     
    </div>
    </div>
    </div>
`,


    renderBuildPage: ` 
 
 <div class="container text-center">  
    <div class="row align-items-center ">
    <%          
    var currentPageId=-1;
    var nextPageId=-1;
    var prevPageId=-1;
  
    var page;

     
        
    for(var i=0;i<module.Pages.length;i++){
  
        if(module.Pages[i].Id==pageID){
            currentPageId=module.Pages[i].Id;
            console.log("i:"+i); 
            console.log("page:"+module.Pages[i].Id); 
            page=module.Pages[i]; 
            if((i+1)<module.Pages.length){
                nextPageId=module.Pages[i+1].Id; 
            }
            if(i>0){
                prevPageId=module.Pages[i-1].Id; 
            } 
        }
    }

    console.log(currentPageId);
    console.log(nextPageId);
    console.log(prevPageId);

    
    %> 
    </div>
 </div>
 
    <h1 class="sub-module-title"><%-page.Title %></h1>
 
    <iframe allow="autoplay; fullscreen" allowfullscreen="" frameborder="0" height="360" id="vid" src="<%-page.VideoURL %>" width="760"></iframe>
 
 
 
    <div class="container container-btns">
    <div class="row">
        <div class="col-6 container-prev">
        
        <%  
        if(prevPageId>-1){
        %>  
                <div class="btn-prev btn btn-outline-secondary btn-lg col-5" data-current=<%-currentPageId %>   data-prev=<%-prevPageId %>>Previous</div>  
            <%  
        }  
            %> 
        </div>
        <div class="col-6 container-next">
            <%  
        if(nextPageId>-1){
            %>  
                <div class="btn-next btn btn-outline-secondary btn-lg col-5"  data-current=<%-currentPageId %>  data-next=<%-nextPageId %> data-quiz=<%-flagQuiz %>>Next</div>  
        
            <%  
            }  else if(nextPageId==-1){ 
            
            %>
                <div class="btn-finish-user btn btn-outline-secondary btn-lg col-5 "  data-current=<%-currentPageId %>   data-prev=<%-prevPageId %>>Finish</div>          
            <%  
            }   
                
            %>
        </div>

    </div>
 </div>
 
     
`,

renderBuildQuiz: ` 



<div class="container survey-page">
    <div class="row">
        <div  class="question-single-choice-radio qn question vertical_two_col">
            <h3 class="screenreader-only"><%-title %></h3>
            <%
            _.each(quizs,function(item1,key1, list ){  
               var sel=savedAnswers[item1.Id];
             %>  
            <fieldset class="question-fieldset" data-quizid="<%-item1.Id %>" data-type="<%-item1.Type %>" data-groupid="<%-groupID %>">
                <legend class="question-legend">
                    <h4  class="question-title-container">  
                        <span class="question-number notranslate"><%-key1+1 %><span class="question-dot">.</span> </span>
                         
                        <span class=" notranslate"> <%-item1.Question %></span>
                    </h4>
                </legend>
                <div class="question-body clearfix notranslate">

                    <%
                    _.each(item1.Answers,function(item2,key2, list ){   
                    %> 

                        <div class="answer-option-cell">
                            <div data-sm-radio-button="" class="radio-button-container">


                            <%
                            if(sel==undefined ){   
                            %>   
                                <label class="answer-label radio-button-label " data-selectionid="<%-item2.Id %>">
                                    <span class="radio-button-display"> </span>
                                    <span class="radio-button-label-text question-body-font-theme ">
                                    <%-item2.Name %>
                                    </span>
                                </label> 

                            <%  
                            }else {
 
                                var flagEnter=false;
                                _.each(sel,function(selId,key4, list ){   
                                
                                    if(selId==item2.Id){
                                        flagEnter=true;
                            %> 


                            <label class="answer-label radio-button-label checked" data-selectionid="<%-item2.Id %>">
                                <span class="radio-button-display"> </span>
                                <span class="radio-button-label-text question-body-font-theme ">
                                <%-item2.Name %>
                                </span>
                            </label> 



                            <%  
                                    }
                                });
                                if(flagEnter==false){
                           
                            %> 




                            <label class="answer-label radio-button-label " data-selectionid="<%-item2.Id %>">
                            <span class="radio-button-display"> </span>
                            <span class="radio-button-label-text question-body-font-theme ">
                            <%-item2.Name %>
                            </span>
                        </label> 






                            <%  
                             }
                               
                            }
                            %> 
                            </div>
                        </div>
                    <%  
                    });
                    %> 
                     
                </div>
            </fieldset> 
            <%  
            });
            %> 
        </div> 

        <div   class="container container-btns">

        <div class="row">
        <div class="col-12 btn-save">
            <div class="btn btn-outline-secondary btn-lg col-5"  data-current=<%-currentId %>  data-next=<%-nextPageId %> data-page=<%-flagIsPage %> >Save</div> 
            </div>
        </div>
        </div>

    </div>
</div>




`,







//<i class="bi bi-x-lg"></i>
//<i class="bi bi-check2"></i>


renderBuildResults: ` 

<div class="container survey-score"> 
        <div class="row">
        
        <div class="col-12 score">
            Final Score:  <%-quizTotal.PercentScore %>  %
         </div>
            
        <div/>
</div>

<div class="container survey-page survey-page-score">
    <div class="row">
        <div  class="question-single-choice-radio qn question vertical_two_col">
           
            <%
            _.each(quizTotal.QuizReplay,function(item1,key1, list ){  
             %>  
            <fieldset class="question-fieldset" data-groupid="<%-item1.Id %>">
                <legend class="question-legend">
                    <h4  class="question-title-container">  
                        <span class="question-number notranslate"><%-key1+1 %><span class="question-dot">.</span> </span>
                         
                        <span class=" notranslate"> <%-item1.Question %></span>
                    </h4>
                </legend>
                <div class="question-body clearfix notranslate">
 
                    <%
                    _.each(item1.Answers,function(item2,key2, list ){   
                    %> 

                        <div class="answer-option-cell">
                            <div data-sm-radio-button="" class="radio-button-container">
 
                                <%
                                 if(item2.Flag==true){
                                %> 
                                <label class="answer-label radio-button-label alert alert-success" data-selectionid="<%-item2.Id %>">
                           
                                <i class="bi bi-check2"></i>
                                <span class="radio-button-label-text question-body-font-theme ">
                                    <%-item2.Name %>
                                </span>
                                </label>   
                                <%
                                 } else{
                                %> 

                                <label class="answer-label radio-button-label alert alert-danger" data-selectionid="<%-item2.Id %>"> 
                                    <i class="bi bi-x-lg"></i>
                                    <span class="radio-button-label-text question-body-font-theme ">
                                        <%-item2.Name %>
                                    </span> 
                                </label>  
                                
                                <%
                                  }    
                                %> 
                               
                            
                            </div>
                        </div>
                    
                    <%  
                    });
                    %>  

                            <span class="explanation"><%= item1.Explaination %></span> 

                        
                </div>
            </fieldset> 
            <%  
            });
            %> 
        </div>  
        <div class="col-12 go-home"><a href="/learning/<%= ModuleId %>" class="btn btn-outline-secondary btn-lg col-3">Home</a></div>
    </div>
</div>




`,



}