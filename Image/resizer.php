<?php

include("class_resize.php");
$resizer = new ImageResize();
$resizer->resize("penguin.jpg","output_file.jpg");

?>