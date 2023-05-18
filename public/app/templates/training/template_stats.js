var TemplateViewStats = {

    renderUser: ` 

    <div class="container-login100">
    <div class="wrap-login100 p-t-50 p-b-90"> 
    <span class="login100-form-title p-b-51">
        Select User
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
    </div>
    </div>

`,

    renderTableUserStatsFinalQuiz: ` 

<%

_.each(evs,function(item3,key3, list ){  
    %>
    <tr> 
       <td><%-item3.UserName %></td>
       <td><%-item3.Score %>%</td>
       <td><%-item3.DtQuizStr %></td>
       <td><%-item3.Cont %></td>
       <td><a class="btn btn-primary btn-see-more-stats-final2" href="/stats/user/<%-item3.UserId %>/mod/<%-item3.ModuloId %>">See More</a></td>
 
    </tr> 
    
    <%
    });
    %>

`,


    renderTableUserStatsLearning: ` 

<%

_.each(evs,function(item1,key1, list ){  
    %>
    <tr> 
       <td><%-item1.UserName %></td>
       <td><%-item1.Score %>%</td>
       <td><%-item1.DtQuizStr %></td>
       <td><%-item1.Cont %></td>
       <td><a class="btn btn-primary btn-see-more-stats-final2" href="/stats/user/<%-item1.UserId %>/mod/<%-item1.ModuloId %>">See More</a></td>
 
    </tr> 
    
    <%
    });
    %>

`,




    renderTableAvgStatsGroups: `
<%
_.each(evs,function(item4,key4, list ){  
 %>
 <tr> 
    <td><%-item4.GroupName %></td>
    <td><%-item4.Score %>%</td> 
 </tr>  
 <%
 });
 %>
`,




    renderTableAvgStatsPages: `
<%
_.each(evs,function(item4,key4, list ){  
%>
<tr> 
    <td><%-item4.GroupName %></td>
    <td><%-item4.PageName %></td>
    <td><%-item4.Score %>%</td> 
</tr>  
<%
});
%>

`,


    renderTableAvgStatsQuizFinal: `
<%
_.each(evs,function(item7,key7, list ){  
 %>
 <tr> 

 <td><%-item7.QuizName %></td>
 <td><%-item7.Score %>%</td> 
 </tr> 
 
 <%
 });
 %>
`,



    renderTableAvgStatsQuizLearning: `
<%
_.each(evs,function(item5,key5, list ){  
 %>
 <tr> 
    <td><%-item5.GroupName %></td>
    <td><%-item5.PageName %></td>
    <td><%-item5.QuizName %></td>
    <td><%-item5.Score %>%</td> 
 </tr>  
 <%
 });
 %>
`,



    renderTableModuleStats: `  
 
 


     <div class="block-title">
     <a href="#" class="bg-gray-100">
         <button class="clear-button-styles">
             <img width="24" height="24" src="/public/images/jump.svg">
         </button>
        Final Quiz 
     </a>
     </div>
      
     
     <table class="table" id="tbl-final-quiz">
     <thead>
     <tr>
         <th scope="col">Name</th>
         <th scope="col">Score</th>
         <th scope="col">Date</th> 
         <th scope="col">#</th> 
     </tr>
     </thead>
     <tbody>
     <%

        



     _.each(modulo.UserStatsFinalQuiz,function(item3,key3, list ){  
      %>
      <tr> 
         <td><%-item3.UserName %></td>
         <td><%-item3.Score %>%</td>
         <td><%-item3.DtQuizStr %></td>
         <td><%-item3.Cont %></td>
      </tr> 
      
      <%
      });
      %>
     
     </tbody>
     </table>
     
   
     <div class="col-12">
     <nav class="Page navigation col-12" id="tbl-final-quiz-nav">
       <ul class="pagination">
         <li class="page-item disabled" id="page-prev-tbl-final-quiz-nav"><a class="page-link" href="#">Previous</a></li>
         <li class="page-item" id="page-next-tbl-final-quiz-nav"><a class="page-link" href="#">Next</a></li>
       </ul>
     </nav>
   </div>















     <div class="block-title">
     <a href="#" class="bg-gray-100">
         <button class="clear-button-styles">
             <img width="24" height="24" src="/public/images/jump.svg">
         </button>
        Final Quiz : Questions
     </a>
     </div>
      
     
     <table class="table" id="tbl-final-quiz">
     <thead>
     <tr> 
     <th scope="col">Quiz</th>
     <th scope="col">Avg. Score</th> 
     </tr>
     </thead>
     <tbody>
     <%
     _.each(modulo.AvgStatsQuizFinal,function(item7,key7, list ){  
      %>
      <tr> 
 
      <td><%-item7.QuizName %></td>
      <td><%-item7.Score %>%</td> 
      </tr> 
      
      <%
      });
      %>
     
     </tbody>
     </table>
     




 



    <div class="block-title">
        <a href="#" class="bg-gray-100">
            <button class="clear-button-styles">
                <img width="24" height="24" src="/public/images/jump.svg">
            </button>
            Learning Module
        </a>
    </div>
  
<table class="table" id="tbl-learning">
<thead>
<tr>
    <th scope="col">Name</th>
    <th scope="col">Score</th>
    <th scope="col">Date</th> 
    <th scope="col">#</th> 
</tr>
</thead>
<tbody>
<%
_.each(modulo.UserStatsLearning,function(item1,key1, list ){  
 %>
 <tr> 
    <td><%-item1.UserName %></td>
    <td><%-item1.Score %>%</td>
    <td><%-item1.DtQuizStr %></td>
    <td><%-item1.Cont %></td>
 </tr> 
 
 <%
 });
 %>

</tbody>
</table>






<div class="block-title">
<a href="#" class="bg-gray-100">
    <button class="clear-button-styles">
        <img width="24" height="24" src="/public/images/jump.svg">
    </button>
   Learning Module: Groups
</a>
</div>
 

<table class="table" id="tbl-learning-groups">
<thead>
<tr>
    <th scope="col">Group</th>
    <th scope="col">Avg. Score</th> 
</tr>
</thead>
<tbody>
<%
_.each(modulo.AvgStatsGroups,function(item4,key4, list ){  
 %>
 <tr> 
    <td><%-item4.GroupName %></td>
    <td><%-item4.Score %>%</td> 
 </tr>  
 <%
 });
 %>

</tbody>
</table>



   




<div class="block-title">
<a href="#" class="bg-gray-100">
    <button class="clear-button-styles">
        <img width="24" height="24" src="/public/images/jump.svg">
    </button>
   Learning Module: Pages
</a>
</div>
 

<table class="table" id="tbl-learning-pages">
<thead>
<tr>
    <th scope="col">Group</th>
    <th scope="col">Page</th>
    <th scope="col">Avg. Score</th> 
</tr>
</thead>
<tbody>
<%
_.each(modulo.AvgStatsPages,function(item4,key4, list ){  
 %>
 <tr> 
    <td><%-item4.GroupName %></td>
    <td><%-item4.PageName %></td>
    <td><%-item4.Score %>%</td> 
 </tr>  
 <%
 });
 %>

</tbody>
</table>




<div class="block-title">
<a href="#" class="bg-gray-100">
    <button class="clear-button-styles">
        <img width="24" height="24" src="/public/images/jump.svg">
    </button>
   Learning Module: Questions 
</a>
</div>
 

<table class="table" id="tbl-learning-quizs">
<thead>
<tr>
    <th scope="col">Group</th>
    <th scope="col">Page</th>
    <th scope="col">Quiz</th>
    <th scope="col">Avg. Score</th> 
</tr>
</thead>
<tbody>
<%
_.each(modulo.AvgStatsQuizLearning,function(item5,key5, list ){  
 %>
 <tr> 
    <td><%-item5.GroupName %></td>
    <td><%-item5.PageName %></td>
    <td><%-item5.QuizName %></td>
    <td><%-item5.Score %>%</td> 
 </tr>  
 <%
 });
 %>

</tbody>
</table>



    
    `

}