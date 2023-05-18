var TemplateViewQuiz = {


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

    renderModalUsers:`
    <!-- Modal -->
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="modalQuizUsersLabel">Select Staff Member</h5>            
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
            <div class="col-12 go-home"><a href="/" class="btn btn-outline-secondary btn-lg col-3">Home</a></div>
        </div>
    </div>
    
    
    
    
    `,
}