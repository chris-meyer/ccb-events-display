//Angular var that Sets Namespace for the App
var eventControllers = angular.module("eventControllers", ['ngAnimate']);

/**
* Controller to handle displaying the event list
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
eventControllers.controller("ListController", ['$scope','$http','$interval','FEED_CONFIG', function ($scope, $http, $interval, FEED_CONFIG){
  //The http service allows for the reading of our json file
  $http.get('js/data.json').success(function(data){


    //In this case, $scope carries the data to use in the App
    $scope.events = data;
    //Set default sort field to name
    $scope.eventOrder = 'title';
    //Get limit from the config
    $scope.eventLimit = FEED_CONFIG.itemLimit;

    $interval(swapItems, FEED_CONFIG.swapFrequency);

  });
}]);

function swapItems(){
  //alert("swapItems");
  //console.log("swapitems");
}
