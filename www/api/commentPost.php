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

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once 'classes/DB.php';
$db = DB::getDBConnection();
$res['status'] = 'FAILED';

/* check if the user is logged in */
if (isset($_SESSION['uid'])) {
  $res['happens'] = 'uploading file';
  // Fetching input from user
  $data['owner'] = ($_SESSION['uid']);
  $data['video'] = ($_POST['video']);
  $data['content'] = ($_POST['content']);
  
  // Add video info to the database
  $sql = 'INSERT INTO comments (owner, video, content) VALUES (?, ?, ?)';
  $sth = $db->prepare($sql);
  $sth->execute(array($data['owner'], $data['video'], $data['content']));
  $res = [];
  
  if ($sth->rowCount() == 1) {
    $res['status'] = 'SUCCESS';
    $res['id'] = $db->lastInsertId();
  }
  else {
    $res['status'] = 'FAIL';
    $res['errorMessage'] = 'Failed to insert into comment registry';
    $res['errorInfo'] = $sth->errorInfo();
  }
}
else {
  $res['status'] = 'OFFLINE-USER';
}


echo json_encode($res);