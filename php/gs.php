<?php
require "CCB.php";

$ccb = new ccb("**churchname**", "**username**", "**password**");
$ccb->format('JSON');

echo $ccb->get_public_calendar_listing();

?>
