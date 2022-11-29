<?php

//include database access class
include("db_mysql.php");

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

		//return the data in JSON format
		echo json_encode(array("status" => "Success", "list_of_projects" => $project_list));
		
}//end if we need the list of current projects in the database

//if we need to get the list of tasks by project, return the appropriate XML data
if($function=="get_tasks")
{		
		//get the variables we need to run the query
		$project_num=$_POST['project_number'];

		//array containing the list of projects
		$task_list = array();

		//the query to get the list of tasks for the project
		$query="SELECT * FROM Tasks WHERE Project_Num=$project_num";

		//do the query
		$db->query($query);

		while($db->next_record())
		{
			//store the database columns as variables
			$task_num=$db->f("task_num");
			$description=$db->f("Description");
			$status=$db->f("Status");
			
			//push the data onto the array that we intend to return
			array_push($task_list, array("task_number" => $task_num, "task_description" => $description, "task_status" => $status));
    				
    	}//end while, all available tasks for the specified project are pushed onto the task_list array	

		//return the data in JSON format
		echo json_encode(array("status" => "Success", "list_of_tasks" => $task_list));

}//end if we need the list of tasks

?>