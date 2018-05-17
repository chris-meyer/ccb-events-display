<?php
date_default_timezone_set('America/Chicago');
require "ConfHandler.php";
require "CCB.php";

$conf_handler = new ConfHandler();
$ccbConf = $conf_handler->getSettings();

$ccb = new ccb($ccbConf['ccb_church'], $ccbConf['ccb_user'], $ccbConf['ccb_pass']);
$ccb->format('JSON');

//Today
$startD = date("Y-m-d");
//Look X days ahead
$endD = date("Y-m-d",strtotime("+".$ccbConf['days_ahead']." days"));

echo $ccb->get_public_calendar_listing($startD,$endD);

?>
