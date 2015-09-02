//Angular var that Sets Namespace for the App
var eventControllers = angular.module("eventControllers", ['ngAnimate']);

/**
* Controller to handle displaying the event list
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
eventControllers.controller("ListController", ['$scope','$http','$interval','FEED_CONFIG', function ($scope, $http, $interval, FEED_CONFIG){
  //The http service allows for the reading the json returned by CCB
  $http.get('php/gs.php').success(function(data){
    var jRes = data.response;
    //console.log(JSON.stringify(jRes));
    //In this case, $scope carries the data to use in the App
    $scope.events = jRes.items.item;
    //Set default sort field to name
    $scope.eventOrder = 'event_name';
    //Get limit from the config
    $scope.eventLimit = FEED_CONFIG.itemLimit;

    $interval(swapItems, FEED_CONFIG.swapFrequency);

  });
}]);

function swapItems(){
  //console.log("swapitems");
  //Hide the top item
  //var topEl = angular.element('.show');
  //console.log(topEl.length);
  //Move the top to the bottom
  //Show the next item
}
