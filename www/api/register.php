<?php

session_start();
$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "http://www" || $http_origin == "http://localhost:8080") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

require_once 'classes/DB.php';
$db = DB::getDBConnection();

$uname = $data['uname'] = ($_POST['uname']);  
$data['pwd'] = ($_POST['pwd']); 
$data['type'] = ($_POST['type']);
$data['avatar'] = NULL;

// fetches userName input from user
$sql="SELECT uname FROM user WHERE uname=?"; // Select desired userName
$sth = $db->prepare($sql);                                    
$sth->execute(array($uname));                                      
$result=$sth->fetch(PDO::FETCH_ASSOC);
$res = [];

if($result['uname']==$uname) {
  $res['status'] = 'FAIL';                                         // Kan bruke render html output her
  $res['errorMessage'] = 'Failed to insert into user registry';
  $res['errorInfo'] = $sth->errorInfo();
  echo json_encode($res['status']);
} else {
  $sql = 'INSERT INTO user (uname, type, pwd, avatar) VALUES (?, ?, ?, ?)';
  $sth = $db->prepare ($sql);
  $sth->execute (array ($data['uname'] ,$data['type'], md5($data['pwd']), $data['avatar']));  // hashes password with md5
  $res = [];

  if ($sth->rowCount()==1) {
    $res['status'] = 'SUCCESS';
    $res['uid'] = $db->lastInsertId();
    $res['uname'] = $data['uname'];
    $res['type'] = $data['type'];
    $res['pwd'] = $data['pwd'];
    $res['hasAvatar'] = $data['avatar'];
  } else {
    $res['status'] = 'FAIL';
    $res['errorMessage'] = 'Failed to insert into user registry';
    $res['errorInfo'] = $sth->errorInfo();
  }

  echo json_encode($res);
}
