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

$data['id'] = ($_POST['id']);
$data['type'] = ($_POST['type']);

// Update the user's usertype to the one chosen
$sql = "UPDATE user SET type=? WHERE id=?";
$sth = $db->prepare($sql);
$sth->execute(array($data['type'], $data['id']));

$res = [];

$res['status'] = 'SUCCESS';
$res['type'] = $data['type'];

// $res['status'] = 'FAIL';
// $res['errorMessage'] = 'Failed to update user';
// $res['result'] = $result;
// $res['errorInfo'] = $sth->errorInfo();




echo json_encode($res);