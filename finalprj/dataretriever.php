<?php

//include database access class
include("db_mysql.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

//declare the database instance
$db = new DB_Sql;

$function=$_POST['command'];

//if we need to get the list of available projects, return the appropriate XML data
if($function=="get_projects")
	{
		//array containing the list of projects
		$project_list = array();

		//the query to get the list of available projects
		$query="SELECT * FROM Projects";

		//do the query
		$db->query($query);

		while($db->next_record())
		{
			//store the database columns as variables
			$project_num=$db->f("project_num");
			$project_name=$db->f("project_name");
			
			//push the data onto the array that we intend to return
			array_push($project_list, array("project_number" => $project_num, "project_full_name" => $project_name));
				
		}//end while, all available projects are pushed onto the project_list array	
		$db -> close();
		//return the data in JSON format
		echo json_encode(array("status" => "Success", "list_of_projects" => $project_list));
		
}//end if we need the list of current projects in the database

//if we need to get the list of tasks by project, return the appropriate XML data
if($function=="get_tasks")
{		
		//get the variables we need to run the query
		$project_name=$_POST['project_name'];
		error_log("*****");
		error_log($project_name);

		//array containing the list of projects
		$task_list = array();
		//$query="SELECT * FROM tasks WHERE project_num= $project_num and Status in( 'Unassigned','In Process')";
		//the query to get the list of tasks for the project
		$query="SELECT * FROM Tasks where project_num=(select project_num from projects where project_name='$project_name') and Status in( 'Unassigned','In Process')";
	
		error_log($query);

		//do the query
		$db->query($query);

		while($db->next_record())
		{
			//store the database columns as variables
			$task_num=$db->f("task_num");
			$description=$db->f("Description");
			$task_status=$db->f("Status");
			error_log($description);
			//push the data onto the array that we intend to return
			array_push($task_list, array("task_num" => $task_num, "task_description" => $description, "task_status" => $task_status));
			$query= "SELECT * FROM Tasks where status == Unassigned";
    				
    	}//end while, all available tasks for the specified project are pushed onto the task_list array	

		$db -> close();

		//return the data in JSON format
		echo json_encode(array("status" => "Success", "list_of_tasks" => $task_list));
       
}//end if we need the list of tasks
if($function=="validate_user")
{		
		//get the variables we need to run the query
		$username=$_POST['username'];
		$passwd=$_POST['passwd'];
		
		//array containing the list of projects
		$task_list = array();

		//the query to get the list of tasks for the project
		$query="SELECT COUNT(*) USERCNT FROM Creds where username='$username' and password='$passwd'";

		$stmt = $db->prepare($query);
		//$stmt->bind_param("i",$id);
		$stmt->$execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();
		error_log($query);

		//do the query
		//$db->query($query);

		while($result->next_record())
		{
			//store the database columns as variables
			$count_rec=$db->f("USERCNT");
			error_log($count_rec);
			//push the data onto the array that we intend to return
			
			//array_push($user_list, array("usr_cnt" => $count_rec));
    				
    	}//end while, all available tasks for the specified project are pushed onto the task_list array	

				$db -> close();

		//return the data in JSON format
		echo json_encode($count_rec,JSON_NUMERIC_CHECK);
		//echo json_encode(array("status" => "Success", "list_of_tasks" => $task_list));

}
?>