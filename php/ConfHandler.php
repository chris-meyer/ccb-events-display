<?php
/*
* Handles interaction with the application's
* configuration file.
*/
class ConfHandler {

  private $conf_location;

  public function __construct(){
    $this->conf_location = ( realpath(__DIR__.'/../') . '/ccb-events.conf' );
  }

  /*
   * Fetches the configuration settings from ccb-events.conf
   * @return Associative array of settings
   */
  public function getSettings($provide_defaults = FALSE) {
    if(!file_exists($this->conf_location)) {
      if($provide_defaults){
          //Return the default settings
          return array(
            'days_ahead' => 14,
            'days_of_week' => 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
            'item_limit' => 6,
            'swap_frequency' => 4000, // 4 seconds
            'slide_frequency' => 3000, // 3 seconds
            'page_refresh_frequency' => 600000, // 10 minutes
            'slide_img_path' => '/full/path/to/slider/images/folder'
          );
      }else{
          return NULL;
      }

    } else {
      return parse_ini_file($this->conf_location);
    }
  }

  public function setSettings($submitted_settings) {
    //Grab the current settings
    $current_settings = $this->getSettings();
    if(!isset($current_settings)){
      $current_settings = array();
    }

    //Set the settings that changed
    foreach($submitted_settings as $setting => $value){
      //Take array settings and make them into a string
      if(is_array($value)){
        $value = implode(',',$value);
      }
      //Save the submitted value if it doesn't match the config
      if(!isset($current_settings[$setting]) || ( $value != $current_settings[$setting] )){
          $current_settings[$setting] = $value;
      }
    }

    //There is just a [CCB] section containing all of the settings
    $current_settings = array('CCB' => $current_settings);

    //Re-save the settings to the conf file
    $this->_writeToConf($current_settings,$this->conf_location);
  }

  /**
  * Validates the settings to save
  * @param $settings_array - the array of settings passed from the client
  * @return bool
  */
  public function checkSettingsToSave(&$settings_array){
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
    }else{
      //Convert seconds to ms
      $settings_array['swap_frequency'] = ( intval($settings_array['swap_frequency']) );
    }
    if(!$settings_array['slide_frequency']){
      $errors[] = "Missing Slide Change Frequency";
    }else{
      //Should be sent as seconds in ms
      $settings_array['slide_frequency'] = ( intval($settings_array['slide_frequency']) );
    }
    if(!$settings_array['page_refresh_frequency']){
      $errors[] = "Missing Page Refresh Frequency";
    }else{
      //Should be sent as minutes in ms
      $settings_array['page_refresh_frequency'] = ( intval($settings_array['page_refresh_frequency']) );
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
