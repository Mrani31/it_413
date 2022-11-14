<?php 

function validateFirstName($passed_first_name) 
{
   if(strlen($passed_first_name) === 0)
   {
     return false;
   }
   elseif(strlen($passed_first_name) > 2 && strlen($passed_first_name) < 11 && !hasBadChars(["%","#","@","$","{","}"],$passed_first_name ) )
   {
    return true;
   }
   else
   {
    return false;
   }
}

function validateLastName($passed_last_name) 
{
   if(strlen($passed_last_name) === 0)
   {
     return false;
   }
   elseif(strlen($passed_last_name) > 1 && strlen($passed_last_name) < 15 && !hasBadChars(["^","#","@","$","&","!"],$passed_last_name ) )
   {
    return true;
   }
   else
   {
    return false;
   }
}

function validateAddress($passed_address) 
{
  if(strlen($passed_address) === 0)
  {
    return false;
  }
 
 elseif(strlen($passed_address) > 7 && strlen($passed_address) < 25 ) 
   {
    return true;
   }
   else{
    return false;
   }
   
}


function validatePhoneNumber($passed_phone_number) 

{
    if(strlen($passed_phone_number) === 0)
   {
     return false;
   }
   elseif(strlen($passed_phone_number) ==10 || strlen($passed_phone_number) == 12 && !validating($passed_phone_number ) )
   {
    return true;
   }
   else 
   {
    return false;
   }
}
function validateInquiry($passed_inquiry) 
{
    if(strlen($passed_inquiry) === 0)
   {
     return false;
   }
   else
   {
    return true;
   }
   
}





function hasBadChars($passed_characters, $passed_value)
{
    $bad_chars_found =false;
    $char_count = 0;

    while($char_count < sizeof($passed_characters) )
    {
        if(strpos($passed_value, $passed_characters[$char_count]) !==false)
        {
            $bad_chars_found = true;
        }
        $char_count++;

    }
    return $bad_chars_found;
}
function validating($phone){
  if(preg_match('/^[0-9]{10}+$/', $phone))
   {
  echo " Valid Phone Number";
  } 
  else
   {
  echo " Invalid Phone Number";
  }
  }
?>
