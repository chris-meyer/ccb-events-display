//Angular var that Sets Namespace for the App
var confController = angular.module("confController", ['ngAnimate']);

/**
* Controller to handle the configuration form
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
confController.controller("ConfController", ['$scope','$http','feedConfigService', function ($scope, $http, feedConfigService){
  //Attempt to get the configuration
  feedConfigService.getConfig()
    .success(function(cdata) {
      console.log("Got config!");
    })
    .error(function(response, status) {
      console.log("No config: " + response);
    });

}]);
