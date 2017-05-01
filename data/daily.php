<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:X-Requested-With');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS,DELETE');
require ('init.php');
$sql="SELECT * FROM user_fund WHERE userId=1";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
$surplus=$rows['pay'];
$output=[
  "surplus"=>$surplus
];
echo json_encode($output);
?>