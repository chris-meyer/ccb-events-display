<?php
date_default_timezone_set('America/Chicago');
require "CCB.php";
//TODO: Put this in a config file
$ccb = new ccb("**churchname**", "**username**", "**password**");
$ccb->format('JSON');

//Today
$startD = date("Y-m-d");
//One week ahead
$endD = date("Y-m-d",strtotime("+1 week"));

echo $ccb->get_public_calendar_listing($startD,$endD);

?>
