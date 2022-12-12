$(document).ready(function(){
    
    $("#select_project_state").hide();
    $("#display_task_state").hide();
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

    getProjects();
   // getTasks();

 

});
//End document ready functionality
//Begin validUser function
function validateUser()
{
   var form_username = $("#login_username").val();
   if (form_username == "Meena")
   {
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").show();
    $("#display_task_state").show();
    $("#add_modify_task_state").show();
   }
   else
   {
    $( "#login_form" ).effect( "shake" );
    $("#select_project_state").hide();
    $("#display_task_state").hide();
    $("#add_modify_task_state").hide();
     $("#display_project_info_state").hide();

   }

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

}, "json").fail(function(){alert("Web Service Call Failed");});

}

$('#project_selector').on('change',function(data)
{
    var proj_num = ""+this.value;
    //getTasks(this.value);
    var retriever_command = "get_tasks";
   
   $.post('dataretriever.php', {command: retriever_command, project_number : proj_num },  function(data){
    // alert("data loaded" + data) ;
       var count = 0;
       $("#task_selector").empty();
       while(count < data.list_of_tasks.length)
       {
          
           $("#task_selector").append("<option value='" + data.list_of_tasks[count].task_Id + "'>" +data.list_of_tasks[count].task_description+ "</option>");
           
           count++;
       }// end while loop

   }, "json").fail(function(){alert("Web Service Call Failed");});
    
});

//End getProject
//Begin getTasks function
function  getTasks(proj_num)
{
    alert(" project number", +proj_num);
   var retriever_command = "get_tasks";
   $.post('dataretriever.php', {command: retriever_command, project_number: proj_num },  function(data){
    
       var count = 0;
       $("#task_selector").empty();
       while(count < data.list_of_tasks.length)
       {
          
           $("#task_selector").append("<option value='" + data.list_of_tasks[count].task_Id + "'>" +data.list_of_tasks[count].task_description+ "</option>");
           
           count++;
       }// end while loop

   }, "json").fail(function(){alert("Web Service Call Failed");});
}

//end get tasks function



function statusChangeCallback(response)
{
    if (response.status=== "connected")
    {
        $("#login_state").hide();
        $("#login_fb").hide();
        $("#select_project_state").show();
        $("#display_task_state").show();
        $("#modify_task_state").show();
    }
    else
    {
       console.log("Please log in");
       $("#select_project_state").hide();
       $("#display_task_state").hide();
       $("#modify_task_state").hide();
    }
    console.log(response)
}

function modifyTasks()
{
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").hide();
    $("#display_task_state").hide();
    $("#add_modify_task_state").hide();
    $("#display_project_info_state").show();
    $("#addInfo").hide();
    $("#modifyInfo").show();
}

function addTasks()
{
    $( "#login_form").hide();
    $("#login_fb").hide();
    $("#select_project_state").hide();
    $("#display_task_state").hide();
    $("#add_modify_task_state").hide();
    $("#display_project_info_state").show();
    $("#addInfo").show();
    $("#modifyInfo").hide();
}



