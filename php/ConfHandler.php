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

    //Set the settings that changed

    //Re-save the settings to the conf file
  }
}

?>
