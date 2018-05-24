<?php
require "ConfHandler.php";

$conf_handler = new ConfHandler();

$conf_settings = $conf_handler->getSettings(TRUE);

echo json_encode ($conf_settings);
?>
