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
resides in which playlist. We will use the playlist references
to know which playlists to look for. */
// Fetch the playlist references from the contents table.
$sql = 'SELECT * FROM contents WHERE video=?';
$sth = $db->prepare($sql);
$sth->execute(array($_POST['id']));
$contents = $sth->fetchAll(PDO::FETCH_ASSOC);

$consInfo = array();
// Loop through contents, the references of videos's and playlists's id
foreach ($contents as $content) {
  // Find the playlist reference
  $playlistId = $content['playlist'];
  /* Use this reference to fetch this playlist's info from table playlists,
  and add this into the $consInfo array */
  $consInfo[] = fetchPlaylistInfo($playlistId, $db);
}

function fetchPlaylistInfo($id, $db) {
  $sql = 'SELECT * FROM playlists WHERE id=?';
  $sth = $db->prepare($sql);
  $sth->execute(array($id));
  $playlistInfo = $sth->fetchAll(PDO::FETCH_ASSOC);
  return $playlistInfo;
}

/* return the $consInfo array back to component. This array has an array for
each playlist */
echo json_encode($consInfo);
