<?php
$ccbConf = parse_ini_file(realpath(__DIR__.'/../ccb-events.conf'));

$dir = realpath($ccbConf['slide_img_path']);

//The full system path to the web-accessible images
$annImgPath = realpath(__DIR__.'/../images/announcements');

$annList = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {

            if(filetype($dir .'/'. $file) == 'file' && (preg_match("/(\.png|\.jpeg|\.jpg|\.gif)$/",$file) != FALSE) ){
              //Set the image link for this file
              //Check if that image exists in the web announcements folder
              if(!file_exists($annImgPath.'/'.$file)){
                //Copy the file into the announcements folder
                //copy();
              }
              //TODO: How to determine images/announcements programmatically?
              $annList[] = ('images/announcements/'.$file);
            }
        }
        sort($annList);
        closedir($dh);
    }
}
echo(json_encode($annList));
?>
