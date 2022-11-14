<?php
   include("validation_lib.php");
   
   $first_name_submitted = trim($_POST["firstname"]);
   if(validateFirstName($first_name_submitted))
   {
      echo( $first_name_submitted);
      echo "<br>";
      
   }
   else
   {
      echo("The length of first name must be between 3 to 10 characters and should not contain bad characters "); 
      echo "<br>";
   }
   
  
   $last_name_submitted = trim($_POST["lastname"]);
   if(validateLastName($last_name_submitted))
   {
      echo($last_name_submitted);
      echo "<br>";
   }
   else
   {
      echo(" The length of last name must be between 2 to 15 characters and should not contain bad characters");
      echo "<br>"; 
   }
     

   
   
   $address_submitted = trim($_POST["address"]);
   if(validateAddress($address_submitted ))
   {
      echo( $address_submitted );
      echo "<br>";
      
   }
   else
   {
      echo(" The length of address must be between 8 to 25 characters");
      echo "<br>"; 
   }
   
  


   $phone_number_submitted = trim($_POST["phonenumber"]);
   if(validatePhoneNumber($phone_number_submitted))
   {
      echo($phone_number_submitted);
      echo "<br>";
   }
   else
   {
      echo("Phone number must be 10 or 12 digits. "); 
      echo "<br>";
   }

   $inquiry_submitted= trim($_POST["inquiry"]);
   if(validateInquiry($inquiry_submitted))
   {
      echo($inquiry_submitted);
      echo "<br>";
   }
   else
   {
      echo("The inquiry required"); 
      echo "<br>";
   }

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    
   <body>
    <form action="form_example.php" method="post">
  
         
        <br>FirstName:<input type = "text" name = "firstname" value="<?php echo($first_name_submitted); ?>">   
        <span><?php echo $first_name_submitted ?> </span>  
      
        <br>LastName: <input type = "text" name = "lastname" value="<?php echo($last_name_submitted); ?>"> 
        <span><?php echo $last_name_submitted ?> </span> 
     
        <br>Address:  <input type = "text" name = "address" value="<?php echo($address_submitted); ?>"> 
        <span><?php echo $address_submitted ?> </span> 
        <br>PhoneNumber:  <input type = "numbers" name = "phonenumber" value="<?php echo($phone_number_submitted); ?>"> <br>
        Inquiry:      <textarea input type = "text" name= "inquiry" rows="3" cols="40"value="<?php echo($inquiry_submitted); ?>"> </textarea><br>
        
        <input type = "Submit" value = "submit">
</form>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>

