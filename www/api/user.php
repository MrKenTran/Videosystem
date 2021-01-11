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

// Fetch info for user
$stmt = $db->prepare('SELECT id, uname, type, pwd, avatar FROM user WHERE id=?');
$stmt->execute(array($_POST['id']));

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
