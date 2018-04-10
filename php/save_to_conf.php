<?php
require "ConfHandler.php";

$conf_handler = new ConfHandler();
if($conf_handler->checkSettingsToSave($_POST)){
    $conf_settings = $conf_handler->setSettings();
}


?>
