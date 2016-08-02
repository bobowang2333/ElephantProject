<?php
//create class of data to connect to database
/**
* 
*/
class conn_mysql{
	private $host = "";
	private $user = "";
	private $pwd  ="";
	private $db = "";
	private $conn ;

	function __construct($host = "127.0.0.1:3306" ,$user = "root",$pwd = "shuyao9543",$db="ElepPro"){
		$this->host = $host;
		$this->user = $user;
		$this->pwd = $pwd;
		$this->db = $db;
	}

	public function get_conn()
	{
		$this->conn = @mysqli_connect($this->host,$this->user,$this->pwd,$this->db);
	}

	public function close_conn($conn)
	{
		@mysqli_close($this->conn);
	}

	public function check_login($name,$pwd){
		//global $query;
        $table = "users";
        if(!$this->conn){
            echo "Cannot login database";
            $this->conn = mysqli_connect($this->host,$this->user,$this->pwd,$this->db);
        }
        $sql_str = "SELECT * FROM users  WHERE uname = \"" . $name . "\" AND pwd = \"" . $pwd . "\"";
        $query= @mysqli_query($this->conn,$sql_str ) or die ('Error');
		if(@mysqli_errno($this->conn) == 0){
			$result = mysqli_fetch_array($query,MYSQLI_ASSOC);
			return $result;
		}else{
            echo mysqli_error($this->conn);
			return '';
		}

	}

}

?>