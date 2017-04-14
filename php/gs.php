<?php
date_default_timezone_set('America/Chicago');
require "CCB.php";

$ccbConf = parse_ini_file(realpath(__DIR__.'/../ccb-events.conf'));

$ccb = new ccb($ccbConf['ccb_church'], $ccbConf['ccb_user'], $ccbConf['ccb_pass']);
$ccb->format('JSON');

//Today
$startD = date("Y-m-d");
//One week ahead
$endD = date("Y-m-d",strtotime("+1 week"));

echo $ccb->get_public_calendar_listing($startD,$endD);

?>
