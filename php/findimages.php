<?php
$dir = realpath(__DIR__."/../images");

$annList = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if(filetype($dir .'\\'. $file) == 'file' && (preg_match("/(\.png|\.jpeg|\.jpg|\.gif)$/i",$file) != FALSE) ){
              //Set the image link for this file
              $annList[] = ('/gs-ccb-events/images/' . $file);
            }
        }
        sort($annList);
        closedir($dh);
    }
}
echo(json_encode($annList));
?>
