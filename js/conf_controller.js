//Angular var that Sets Namespace for the App
var confController = angular.module("confController", ['ngAnimate']);

/**
* Controller to handle the configuration form
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
confController.controller("ConfController", ['$scope','$http','feedConfigService', function ($scope, $http, feedConfigService){
  $scope.conf = {};
  $scope.showMessages = false;


  //Attempt to get the configuration
  feedConfigService.getConfig()
      .then(
        function getSuccess(response) {
          console.log("Got feedConfigService config!");
          //console.log(response);
          // let parsed_conf = angular.copy(response.data);
          // parsed_conf['swap_frequency'] /= 1000; // ms to seconds
          // parsed_conf['slide_frequency'] /= 1000; // ms to seconds
          // parsed_conf['page_refresh_frequency'] /= 60000; // ms to minutes

          $scope.conf = feedConfigService.parseConfig(response.data);
        },
        function getFailure(response){
             console.log("feedConfigService getFailure");
             console.log(response);
        }
      );


    // Form submit handler.
    $scope.submit = function(form) {
      /*
      * Non-empty values will be in $scope.conf.
      * At this point, $scope.conf will only have the values from the form
      */
//      console.log($scope.conf);

      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        console.log("Form is invalid!");
        return;
      }else{
        console.log("Form is valid!");
        //Copy by value so $scope.conf doesn't get messed up
        let conf_values = angular.copy($scope.conf);

        //Convert the time values to MS
        conf_values['swap_frequency'] *= 1000; // seconds => ms
        conf_values['slide_frequency'] *= 1000; // seconds => ms
        conf_values['page_refresh_frequency'] *= 60000; // minutes => ms

        // console.log('conf_values DUMP');
        // console.log(conf_values);

        //Save the values to the file
        $http.post('php/save_to_conf.php',conf_values).then(
          function saveSuccess(response){
            console.log("saveSuccess");
            console.log(response);
            //TODO: Use the response code to show the errors
            $scope.messages = 'Config settings saved!';
            $scope.showMessages = true;
            setTimeout(function(){
              $scope.showMessages = false;
              $scope.messages = '';
            },3000);
          },
          function saveFailure(response){
            console.log("saveFailure");
            console.log(response);
          },
        ); //END SAVE TO CONF CALL
      }

    };

}]);
