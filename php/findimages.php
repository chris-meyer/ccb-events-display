<?php
$ccbConf = parse_ini_file(realpath(__DIR__.'/../ccb-events.conf'));

$dir = realpath($ccbConf['slide_img_path']);

//Get the base to use to create the img src value
$imgBase = $_SERVER['REQUEST_URI'];
$imgBase = substr($imgBase,0,strpos($imgBase,'/php/findimages'));

/*
 * This should work ???
 */
//$imgBase = explode('/',$imgBase);
//$imgBase = $imgBase[0];

$annList = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if(filetype($dir .'\\'. $file) == 'file' && (preg_match("/(\.png|\.jpeg|\.jpg|\.gif)$/",$file) != FALSE) ){
              //Set the image link for this file
              //TODO: How to determine images/announcements programmatically?
              $annList[] = ($imgBase.'/images/announcements/'.$file);
            }
        }
        sort($annList);
        closedir($dh);
    }
}
echo(json_encode($annList));
?>
