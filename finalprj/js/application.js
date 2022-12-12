$(document).ready(function(){
    $("#select_project_state").hide();
    $("#display_task_info_state").hide();
    $("#add_modify_task_state").hide();
    $("#display_project_info_state").hide();
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '551739683458605',
          version: 'v2.7'
        });
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
    });
    $("#login_button").click(function(){
        validateUser();
        return false;    
    });
    $("#login_fb").click(function(){
       FB.login(function(response){
           statusChangeCallback(response);
       });
    })
    $("#modify_button").click(function(){
       
       modifyTasks();
        return false;  

    });

    $("#add_button").click(function(){
        addTasks();
        return false;   
    });
    
    $("#project_button").click(function(){
        getTasks();
        return false;   
    });
    
    $("p").mouseover(function(){
        $("p").css("background-color", "yellow");
      });
      $("p").mouseout(function(){
        $("p").css("background-color", "lightgray");
      });
      
});
//transition functions 
function myFunction() {
    document.getElementById("select_project_state").style.transition = "all 2s";}
function myFunction() {
   document.getElementById("display_task_info_state").style.transition = "all 4s";}
function over(){
   document.getElementById("midify_button").innerHTML="Edit Project Tasks"; }

//End transitions 
//End document ready functionality
//Begin validUser function
function validateUser()
{
   var form_username = $("#login_username").val();
   var form_passwd = $("#login_password").val();
   var retriever_command = "validate_user";
   
   $.post('dataretriever.php', {command: retriever_command, username: form_username, passwd: form_passwd}, function(data){
    if(parseInt(data)>0){
            alert("Login successful");
            $("#login_form").hide();
            $("#login_fb").hide();
            $("#select_project_state").show();
            $("#display_task_info_state").show();
            $("#add_modify_task_state").show();
            $("#display_project_info_state").hide();
            getProjects();
           }
           else
           {
            $( "#login_form" ).effect( "shake" );
           }

    
   }).fail(function(){alert("Unable to authenticate. Please try again later");});
/*
   if (form_username == "a")
   {
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").show();
    $("#display_task_info_state").show();
    $("#add_modify_task_state").show();
    $("#display_project_info_state").hide();
    getProjects();
   }
   else
   {
    $( "#login_form" ).effect( "shake" );
   }*/

}

//Begin getProject function
function getProjects()
{
   var retriever_command = "get_projects";
   $.post('dataretriever.php', {command: retriever_command}, function(data){
    
       var count = 0;
       $("#project_selector").empty();
       while(count < data.list_of_projects.length)
       {
           $("#project_selector").append("<option value='" + data.list_of_projects[count].project_number+"'>" + data.list_of_projects[count].project_full_name +"</option>");
           
           count++;
       }// end while loop
       $("#project_selector").prepend("<option value='projs'>----SELECT PROJECT----</option>");
       $("#project_selector")[0].selectedIndex = 0

       
   }, "json").fail(function(){alert("Web Service Call Failed");});
}
//End getProject
//Begin getTasks function
function  getTasks()
{
    var elem = document.getElementById("project_selector");
    var val2 = elem.options[elem.selectedIndex].value;
    var text2 = elem.options[elem.selectedIndex].text;
    //alert("GETTING TASKS");
    //alert(text2);
   
    var retriever_command = "get_tasks";

   $.post('dataretriever.php', {command: retriever_command,project_name: text2 }, function(data){
    
       var count = 0;
       
       //$("#tsk_num").empty();
       //$("#tsk_desc").empty();
       var t = "";
       /*while(count < data.list_of_tasks.length)
       {
           $("#task_selector").append("<option value='" + data.list_of_tasks[count].task_status+ "</option>");
           $("#tsk_num").text(data.list_of_tasks[count].task_num);
           $("#tsk_desc").text(data.list_of_tasks[count].task_description);
            error_log(data.list_of_tasks[count].task_description);

            
            for (var i = 0; i < posts_array.length; i++){

                var tr = "<tr>";
                    tr += "<td>"+posts_array[i][0]+"</td>";
                    tr += "<td>"+posts_array[i][1]+"</td>";
                    tr += "<td>"+posts_array[i][2]+"</td>";
                    tr += "<td>"+posts_array[i][3]+"</td>";
                    tr += "</tr>";
                    t += tr;
            }
           count++;
       }// end while loop*/

       t = "<tr><th>Task Number</th><th>Task Description</th><th>Task Status</th></tr>";
       for (var i = 0; i < data.list_of_tasks.length; i++){

        var tr = "<tr>";
            tr += "<td>"+data.list_of_tasks[i].task_num+"</td>";
            tr += "<td>"+data.list_of_tasks[i].task_description+"</td>";
            tr += "<td>"+data.list_of_tasks[i].task_status+"</td>";
            tr += "</tr>";
            t += tr;
    }
    //alert(t);
       //document.getElementById("display_task_info_table") += t;
       //$( "#display_task_info_table" ).empty();
       //$( "#display_task_info_table" ).append(index.html);
       document.getElementById("display_task_info_table");
       $("#display_task_info_table tr").remove();
       $("#display_task_info_table").append(t);

       $("#display_task_info_table").show();
   }, "json").fail(function(){alert("Web Service Call Failed");});
}

//end get tasks function

function statusChangeCallback(response)
{
    if (response.status=== "connected")
    {
        $("#login_state").hide();
        $("#select_project_state").show();
    }
    else
    {
       console.log("Please log in");
    }
    console.log(response)
}

function project_select_status_change()
{
    var elem = document.getElementById("project_selector");
    var val2 = elem.options[elem.selectedIndex].value;
    var text2 = elem.options[elem.selectedIndex].text;
    alert(text2);
   
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("project_selector").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "dataretriever.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("t=" + Math.random()+"&project_name="+text2+"&command=get_tasks");
  $("#result").html(result);
  $("#display_task_info_state").show();
  
  
    
}
function modifyTasks()


{ 
    
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").hide();
    $("#display_task_info_state").hide();
    $("#add_modify_task_state").show();
    $("#display_project_info_state").show();
    $("#addInfo").hide();
    $("#modifyInfo").show();

}

function addTasks()
{
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").hide();
    $("#display_task_info_state").hide();
    $("#add_modify_task_state").show();
    $("#display_project_info_state").show();
    $("#addInfo").show();
    $("#modifyInfo").hide();
}


//function getProjects()
