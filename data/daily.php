<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:X-Requested-With');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS,DELETE');
require ('init.php');
$output=[
  "surplus"=>3456.42
];
echo json_encode($output);
?>