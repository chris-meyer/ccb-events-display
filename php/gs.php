<?php
require "CCB.php";

$ccb = new ccb("**churchname**", "**username**", "**password**");
$ccb->format('JSON');

//One week ago
$startD = date("Y-m-d",time() + (60 * 60 * 24 * -7));
//Today
$endD = date("Y-m-d");

echo $ccb->get_public_calendar_listing($startD,$endD);

?>
