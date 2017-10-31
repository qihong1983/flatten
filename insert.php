<?php

	// $_REQUEST['title'];
	// $_REQUEST['content'];


$conn=mysql_connect('127.0.0.1','root','qihong');  
if(!$conn){  
	die('Could not connect: '.mysql_error());
	exit;  
}  


mysql_select_db("sse", $con);

// $sql = "INSERT INTO ssetable ('title', 'content') VALUES (NULL, $_REQUEST['title'], $_REQUEST['content'])";

// $sql = "insert into ssetable (title,content) values (kkasd,asdfasfas)";
// mysql_query("INSERT INTO ssetable (title, content) VALUES ('Peter', 'Griffin')");

// echo $sql;
// console.log($sql);

// $check = mysql_query($sql,$conn);

// mysql_query("INSERT INTO ssse.ssetable (title, content) VALUES (Peter, Griffin)");



if (mysql_query("INSERT INTO sse.ssetable (title, content) VALUES ('".$_REQUEST['title']."', '".$_REQUEST['content']."')")){
	$obj->status=true;
	$obj->msg='成功';

	echo json_encode($obj);
} else {
	$obj->status=false;
	$obj->msg=$check;

	$obj->error = mysql_error(); 
	echo json_encode($obj);
}



?>