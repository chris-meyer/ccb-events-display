<?php
/*
* Handles interaction with the application's
* configuration file.
*/
class ConfHandler {

  private $conf_location;

  public function __construct(){
    $this->conf_location = realpath(__DIR__.'/../ccb-events.conf');
  }

  /*
   * Fetches the configuration settings from ccb-events.conf
   * @return Associative array of settings
   */
  public function getSettings() {
    $conf_settings = parse_ini_file($this->conf_location);
    if(!$conf_settings) {
      return NULL;
    } else {
      return $conf_settings;
    }
  }

  public function setSettings($changed_settings) {
    //Grab the current settings
    $current_settings = $this->getSettings();

    //Set the settings that changed
    foreach($changed_settings as $setting => $value){
      $current_settings[$setting] = $value;
    }
    //Re-save the settings to the conf file

  }

  /**
  * Validates the settings to save
  * @param $settings_array - the array of settings passed from the client
  * @return bool
  */
  public function checkSettingsToSave($settings_array){
    $errors = array();
    if(!$settings_array['ccb_church']){
      $errors[] = "Missing CCB API Church Name";
    }
    if(!$settings_array['ccb_user']){
      $errors[] = "Missing CCB API User";
    }
    if(!$settings_array['ccb_pass']){
      $errors[] = "Missing CCB API Password";
    }
    if(!$settings_array['days_ahead']){
      $errors[] = "Missing Days Ahead";
    }
    if(!$settings_array['days_of_week']){
      $errors[] = "Missing Days of Week Format";
    }
    if(!$settings_array['item_limit']){
      $errors[] = "Missing Item Limit";
    }
    if(!$settings_array['swap_frequency']){
      $errors[] = "Missing Event Swap Frequency";
    }
    if(!$settings_array['slide_frequency']){
      $errors[] = "Missing Slide Change Frequency";
    }
    if(!$settings_array['page_refresh_frequency']){
      $errors[] = "Missing Page Refresh Frequency";
    }
    if(!$settings_array['slide_head_img']){
      $errors[] = "Missing Header Path";
    }
    if(!$settings_array['slide_img_path']){
      $errors[] = "Missing Slider Path";
    }

    return $errors;
  }

 /**
 * Writes an associative array of settings to the conf file
 * @param $array - the array of settings
 * @param $file - The filename of the conf file (in ini format)
 * Pulled from https://stackoverflow.com/questions/5695145/how-to-read-and-write-to-an-ini-file-with-php
 */
  private function _writeToConf($array, $file){
    $res = array();
    foreach($array as $key => $val)
    {
        if(is_array($val))
        {
            $res[] = "[$key]";
            foreach($val as $skey => $sval){
              $res[] = "$skey = ".(is_numeric($sval) ? $sval : '"'.$sval.'"');
            }
        }
        else $res[] = "$key = ".(is_numeric($val) ? $val : '"'.$val.'"');
    }

    $fileName = $file;
    $dataToSave = implode("\r\n", $res);
    if ($fp = fopen($fileName, 'w'))
    {
        $startTime = microtime(TRUE);
        do
        {
          $canWrite = flock($fp, LOCK_EX);
          // If lock not obtained sleep for 0 - 100 milliseconds, to avoid collision and CPU load
          if(!$canWrite)
          {
            usleep(round(rand(0, 100)*1000));
          }
        } while ((!$canWrite)and((microtime(TRUE)-$startTime) < 5));

        //file was locked so now we can store information
        if ($canWrite)
        {
          fwrite($fp, $dataToSave);
          flock($fp, LOCK_UN);
        }
        fclose($fp);
    }
  }
}

?>
