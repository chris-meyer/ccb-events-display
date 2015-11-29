<?php
//TODO: Put this in a config file
$dir = "../images/";
$dir2 = "/apps/gs-ccb-events/images/";
$annList = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if(filetype($dir . $file) == 'file' && (preg_match("/(\.png|\.jpeg|\.jpg|\.gif)$/",$file) != FALSE) ){
              $annList[] = ($dir2 . $file);
            }
        }
        closedir($dh);
    }
}
echo(json_encode($annList));
?>
