//Angular var that Sets Namespace for the App
var confController = angular.module("confController", ['ngAnimate']);

/**
* Controller to handle the configuration form
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
confController.controller("ConfController", ['$scope','$http','feedConfigService', function ($scope, $http, feedConfigService){
  $scope.conf = {};

  //Attempt to get the configuration
  feedConfigService.getConfig()
    .success(function(config_data) {
      console.log("Got config!");
      //Use the existing config values for the form
      // $scope.confSettings = feedConfigService.parseConfig(config_data);
      $scope.conf = feedConfigService.parseConfig(config_data);
      console.log($scope.conf);
    })
    .error(function(response, status) {
      console.log("No config: " + response);
      //No config. Use the default values for the form
      //$scope.confSettings = {
      $scope.conf = {
        days_ahead: 14,
        days_of_week: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        item_limit: 6,
        swap_frequency: 4,
        slide_frequency: 3,
        page_refresh_frequency: 60,
        slide_head_img: "images/head.jpg",
        slide_img_path: "/full/path/to/slider/images/folder"
      };
      //console.log($scope.confSettings);
      console.log($scope.conf);
    });

    // Form submit handler.
    $scope.submit = function(form) {
      console.log("Submitted the form with conf values:");
      /*
      * Non-empty values will be in $scope.conf.
      * At this point, $scope.conf will only have the values from the form
      */
      console.log($scope.conf);
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        console.log("Form is invalid!");
        return;
      }else{
        let conf_values = $scope.conf;
        console.log("Form is valid!");

        //Convert the time values to MS
        conf_values['swap_frequency'] *= 1000; // seconds => ms
        conf_values['slide_frequency'] *= 1000; // seconds => ms
        conf_values['page_refresh_frequency'] *= 60000; // minutes => ms

        console.log('conf_values DUMP');
        console.log(conf_values);

        //return;

        //Save the values to the file
        $http.post('php/save_to_conf.php',conf_values).then(
          function saveSuccess(response){
            console.log("saveSuccess");
            console.log(response);
            //TODO: Use the response code to show the errors

          },
          function saveFailure(response){
            console.log("saveFailure");
            console.log(response);
          },
        ); //END SAVE TO CONF CALL
      }

    };



}]);
