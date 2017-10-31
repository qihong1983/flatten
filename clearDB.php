<?php
$conn=mysql_connect('127.0.0.1','root','qihong');  
if(!$conn){  
	die('Could not connect: '.mysql_error());
	exit;  
}  

mysql_select_db("sse", $con);

if (mysql_query("TRUNCATE TABLE sse.ssetable")){
	$obj->status=true;
	$obj->msg='数据库已清空';

	echo json_encode($obj);
} else {
	$obj->status=false;
	$obj->msg=$check;

	$obj->error = mysql_error(); 
	echo json_encode($obj);
}

?>