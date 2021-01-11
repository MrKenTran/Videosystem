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

/* The contents table contains information about which videos
resides in which playlist. We will use the video references
to know which videos to look for. */
// Fetch the video references from the contents table
$sql = 'SELECT * FROM contents WHERE playlist = ? ORDER BY place';
$sth = $db->prepare($sql);
$sth->execute(array($_POST['id']));
$contents = $sth->fetchAll(PDO::FETCH_ASSOC);

$consInfo = array();
// Loop through contents, the references of videos's and playlists's id
foreach ($contents as $content) {
  // Find the video reference
  $videoId = $content['video'];
  /* Use this reference to fetch this video's info from table videos,
  and add this into the $constInfo array */
  $consInfo[] = fetchVideoInfo($videoId, $db);
}

function fetchVideoInfo($id, $db) {
  $sql = 'SELECT * FROM videos WHERE id=?';
  $sth = $db->prepare($sql);
  $sth->execute(array($id));
  $videoInfo = $sth->fetchAll(PDO::FETCH_ASSOC);
  return $videoInfo;
}

/* return the $consInfo array back to component. This array has an array for
each video */
echo json_encode($consInfo);
