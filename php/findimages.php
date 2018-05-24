<?php
$ccbConf = parse_ini_file(realpath(__DIR__.'/../ccb-events.conf'));

$dir = realpath($ccbConf['slide_img_path']);

//The full system path to the web-accessible images
$annImgPath = realpath(__DIR__.'/../images').'/announcements';

//Create the announcements dir if it doesn't exist
if(!is_dir($annImgPath)){
  mkdir($annImgPath);
}

//The list of image paths used for the img src
$annList = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if(filetype($dir .'/'. $file) == 'file' && (preg_match("/(\.png|\.jpeg|\.jpg|\.gif)$/",$file) != FALSE) ){
              //Check if that image exists in the web announcements folder
              if(!file_exists($annImgPath.'/'.$file)){
                //Copy the file into the announcements folder
                copy( ($dir .'/'. $file), ($annImgPath.'/'.$file) );
              }
              //Add the image link for this file to the list
              $annList[] = ('images/announcements/'.$file);
            }
        }
        sort($annList);
        closedir($dh);
    }
}
echo(json_encode($annList));
?>
