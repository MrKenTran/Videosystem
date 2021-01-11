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


/* is_uploaded_file: Check if the uploaded file
really comes from the form the user just submitted */
if (is_uploaded_file($_FILES['videoFile']['tmp_name'])) {
  $res['happens'] = 'uploading file';
  // Fetching input from user
  $data['owner'] = ($_SESSION['uid']);
  $data['title'] = ($_POST['title']);
  $data['course'] = ($_POST['course']);
  $data['topic'] = ($_POST['topic']);
  $data['mime'] = ($_FILES['videoFile']['type']);
  $data['size'] = ($_FILES['videoFile']['size']);
  $data['desc'] = ($_POST['desc']);
  $data['likes'] = ($_POST['likes']);
  $data['thumbnail'] = ($_POST['thumbnail']);

  // Add video info to the database
  $sql = 'INSERT INTO videos (owner, title, course, topic, mime, size, description, likes, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  $sth = $db->prepare($sql);
  $sth->execute(array($data['owner'], $data['title'], $data['course'], $data['topic'], $data['mime'], $data['size'], $data['desc'], $data['likes'], $data['thumbnail']));
  $res = [];

  if ($sth->rowCount() == 1) {
    $res['happens'] = 'inserted info from file';
    $res['id'] = $db->lastInsertId();

    // If folders for saving videos and transcripts doesn't exist, make them
    if (!file_exists('../fileUploads/')) {
      @mkdir('../fileUploads/');
    }
    if (!file_exists('../fileUploads/owner' . $data['owner'])) {
      @mkdir('../fileUploads/owner' . $data['owner']);
    }
    if (!file_exists('../fileUploads/owner' . $data['owner'] . '/video' . $res['id'])) {
      @mkdir('../fileUploads/owner' . $data['owner'] . '/video' . $res['id']);
    }

    // Save the video file into this folder
    if (move_uploaded_file($_FILES['videoFile']['tmp_name'], "../fileUploads/owner{$data['owner']}/video{$res['id']}/video")) {
      $res['happens'] = 'moved video file to directory';
      $res['status'] = 'SUCCESS';
      $res['owner'] = $data['owner'];
      $res['title'] = $data['title'];
      $res['course'] = $data['course'];
      $res['topic'] = $data['topic'];
      $res['mime'] = $data['mime'];
      $res['size'] = $data['size'];
      $res['desc'] = $data['desc'];
      $res['likes'] = $data['likes'];
      $res['thumbnail'] = $data['thumbnail'];
    }
    else {
      $res['status'] = 'HALFWAY';
      $res['happens'] = 'managed to insert into db, but not move file to directory';
      /* Because we didn't manage to save the file locally, we will
      have to delete info we inserted into the database */
      $sql = 'DELETE FROM videos WHERE id=?';
      $sth = $db->prepare($sql);
      $sth->execute(array($res['id']));
    }
    if (is_uploaded_file($_FILES['transcriptFile']['tmp_name'])) {
      if (move_uploaded_file($_FILES['transcriptFile']['tmp_name'], "../fileUploads/owner{$data['owner']}/video{$res['id']}/transcript")) {
        $res['happens'] = 'moved transcript file to directory';
      }
      else {
        $res['happens'] = 'could not move transcript file to directory';
      }
    }
  }
  else {
    $res['status'] = 'DB-FAIL';
    $res['errorMessage'] = 'Failed to insert into video registry';
    $res['errorInfo'] = $sth->errorInfo();
  }
} // if (is_uploaded_file($_FILES['videoFile']['tmp_name']))
else {
  $res['status'] = 'FORM-FAIL';
  $res['errorMessage'] = 'Failed to insert into video registry';
  $res['errorInfo'] = $sth->errorInfo();
}

echo json_encode($res);