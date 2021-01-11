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

// Fetch all of infos from chosen video
$sql ='SELECT * FROM videos WHERE id = ?';
$sth = $db->prepare($sql);
$sth->execute(array($_POST['id']));
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

$res = [];

$res['status'] = 'FAILED';
if ($sth->rowCount()==1) {
  // Loop through the array and save as array that
  // makes it accessible in future without use of looping
  foreach($result as $r) {
    $res['id'] = $_POST['id'];
    $res['owner'] = $r['owner'];
    $res['title'] = $r['title'];
    $res['course'] = $r['course'];
    $res['topic'] = $r['topic'];
    $res['likes'] = $r['likes'];
    $res['desc'] = $r['description'];
  }
  $res['status'] = 'SUCCESS';
} else {
  $res['status'] = 'FAIL';
  $res['errorMessage'] = 'Klarte ikke hente video';
  $res['errorInfo'] = $sth->errorInfo();
}
echo json_encode($res);