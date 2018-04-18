<?php
require "ConfHandler.php";

$conf_handler = new ConfHandler();

//AngularJS sends $http.post() data as JSON
$php_input = json_decode(file_get_contents("php://input"),TRUE);

$settings_check_results = $conf_handler->checkSettingsToSave($php_input);
if(empty($settings_check_results)){
    $conf_settings = $conf_handler->setSettings($php_input);
}else{
  http_response_code(500);
  //Return the list of errors
  echo json_encode ($settings_check_results);
}


?>
