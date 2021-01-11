<?php
session_start();
$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "http://www" || $http_origin == "http://localhost:8080") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin");
header("Access-Control-Allow-Credentials: true");
// header("Accept: application/json; charset=utf-8");
header("Content-Type: application/json; charset=utf-8");

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once 'classes/DB.php';
$db = DB::getDBConnection();
$res['status'] = 'FAILED';

// Fetch all the info from all the playlists
$sql ='SELECT * FROM playlists';
$sth = $db->prepare($sql);
$sth->execute(array());
$results = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);