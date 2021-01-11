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

// Fetch info about all users
// Do not 'SELECT avatar' from  user. If so, and an user has an avatar, this will prevent the list from displaying at the webpage
$stmt = $db->prepare('SELECT id, uname, type, pwd FROM user');
$stmt->execute(array());

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
