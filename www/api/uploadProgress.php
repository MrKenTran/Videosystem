<?php
session_start();

$fname = $_SERVER['HTTP_X_ORIGINALFILENAME'];       // Get extra parameters
$fsize = $_SERVER['HTTP_X_ORIGINALFILESIZE'];
$mimetype = $_SERVER['HTTP_X_ORIGINALMIMETYPE'];

$handle = fopen('php://input', 'r');                // Read the file from stdin
//$output = fopen('downloadedFiles/'.$fname, 'w');
$contents = '';

while (!feof($handle)) {                            // Read in blocks of 8 KB (no file size limit)
    $contents = fread($handle, 8192);
//    fwrite($output, $contents);
}
fclose($handle);
//fclose($output);
//
$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "http://www" || $http_origin == "http://localhost:8080") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, x-originalmimetype, x-originalfilename, x-originalfilesize, content-type");
header("Access-Control-Allow-Credentials: true");
header("Content-type: application/json");           // Send back json data

$data = array ('fname'=>$fname, 'size'=>$fsize, 'mime'=>$mimetype);


if (isset($_SESSION['uid'])) {                      // If session is active, send back uid
  $data['uid'] = $_SESSION['uid'];
}

echo json_encode($data);
