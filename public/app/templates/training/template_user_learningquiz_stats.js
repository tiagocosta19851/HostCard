var TemplateViewUserLearningQuizStats = {

   
    renderTableUserStatsLearningQuiz: ` 

<%

_.each(evs,function(item3,key3, list ){  
    let icon="bi bi-check-circle-fill";
    if(item3.Score<100){
        icon="bi bi-x-circle-fill";
    }
    %>
    <tr> 
        <td><%-item3.QuizName %></td>
       <td><%-item3.AnswerName %></td>
       <td><%-item3.Score %>%</td>
       <td><i class="<%- icon %>"></i></td>
    </tr>     
    <%
    });
    %>

`,
 
 
}