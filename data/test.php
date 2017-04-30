<?php
header('Content-Type:application/json;charset=utf-8');
$output=[
  "surplus"=>3456.42
];
echo json_encode($output);
?>