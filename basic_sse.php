<?php


$conn=mysql_connect('127.0.0.1','root','qihong');  
if(!$conn){  
	die('Could not connect: '.mysql_error());
	exit;  
}  


$sql='use sse';  
mysql_query($sql,$conn); 


header("Content-Type: text/event-stream");
header('Cache-Control:no-cache');
	// echo $_REQUEST['name'].'';

	// if ($_REQUEST['name'] != ""){


$count = "select * from ssetable";


$countRs = mysql_query($count, $conn);





//查询  
$sql="select * from ssetable order by id desc limit 10"; 

$rs=mysql_query($sql,$conn);  


mysql_query("SET NAMES UTF8");




while($row=mysql_fetch_object($rs)){

	$arr[] = $row;
	$id = $row->id;

	// echo "id: ".$row->id."\n\n";
	// echo "data:".json_encode($row)."\n\n";
}  


	echo "id: ".mysql_num_rows($countRs)."\n\n";
	// echo "data:{status:true,datas:".json_encode($arr).",total:".$mysql_num_rows($countRs)."}\n\n";

echo "data:".json_encode($arr)."\n\n";

	 // echo $_REQUEST['name'].'not null\n\n';
// $json = 'aaasafdfsdfasdfasdf'; 
// $id = 1;
// echo "id: ".$id."\n\n";
// echo "data:".$json."\n\n";

			// @ob_flush();
			// @flush();

			@ob_flush();//刷新
	    	@flush();//刷新
	// } else {
	// 	echo 'is not \n\n';
	// }
	    	?>