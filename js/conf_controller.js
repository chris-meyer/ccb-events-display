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
  const confMessagesEl = angular.element( document.querySelector( '#conf-messages' ) );


  /*
  * Displays a message on the page. Message fades away after about 3 seconds
  * @param msg - the message to show
  * @param success - whether it's a success or fail message
  */
  function _showMessage(msg,success){
    $scope.messages = msg;
    if(success === true){
      confMessagesEl.addClass('alert-success');
      confMessagesEl.removeClass('alert-danger');
    }else{
      confMessagesEl.addClass('alert-danger');
      confMessagesEl.removeClass('alert-success');
    }
    $scope.showMessages = true;
    setTimeout(function(){
      $scope.showMessages = false;
      $scope.messages = '';
    },3000);
  }

  //Attempt to get the configuration
  feedConfigService.getConfig()
      .then(
        function getSuccess(response) {
          $scope.conf = feedConfigService.parseConfig(response.data);

        },
        function getFailure(response){
             confMessagesEl.addClass('alert-danger');
             confMessagesEl.removeClass('alert-success');
             _showMessage("Problem reading config: " + response.statusText,false);
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
        _showMessage('Form is invalid! Check the fields.',false);
        return;
      }else{
        //console.log("Form is valid!");
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
            _showMessage('Config settings saved!',true);
          },
          function saveFailure(response){
            //console.log(response);
            _showMessage('Problem saving config: ' + response.statusText,false);
          },
        ); //END SAVE TO CONF CALL
      }

    };

}]);
