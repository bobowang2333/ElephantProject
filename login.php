<?php 
require dirname(__FILE__).'/'."sql.php";
$mysql = new conn_mysql();
$mysql->get_conn();
$name = $_POST["username"];
$pwd = $_POST["password"];
$login = $mysql->check_login($name,$pwd);
if($login){
	echo "success, welcom " . $login["uname"];
}else{
	echo "failed";
}
?>