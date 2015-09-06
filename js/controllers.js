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
    //$scope.events = jRes.items.item;
    var resItems = jRes.items.item;
    //Loop through the items for formatting
    var curItem;
    for(var r=0; r<resItems.length; r++){
      curItem = resItems[r];
      //If a location is not set then it's an empty array
      if(typeof curItem.location !== "string"){
        curItem.location = "Not Available"
      }


      //Format the date and time
      var eventDate;
      console.log("date and time before format: "+curItem.date + " " + curItem.start_time);
      //First format the date for display
      var displayDate = curItem.date.split('-');
      displayDate = new Date(parseInt(displayDate[0],10),parseInt(displayDate[1],10)-1,parseInt(displayDate[2],10));
      displayDate = ((displayDate.getMonth()+1) + "/" + displayDate.getDate());

      //Now format the start time and end time
      if(curItem.start_time == "00:00:00"){
        console.log("start time NOT set");
        //eventDate = curItem.date.split('-');
        //eventDate = new Date(parseInt(eventDate[0],10),parseInt(eventDate[1],10)-1,parseInt(eventDate[2],10));

        //Just show the date if a time is not set
        //Change YYYY-MM-DD to MM/DD
        //displayDate = ((eventDate.getMonth()+1) + "/" + eventDate.getDate());
        curItem.start_time = "?";

        //console.log("start date: " + eventDate.toDateString() );
      }
      else{
        console.log("start time IS set");
        //Show the date and time as MM/DD HH:MM AM/PM
        eventDate = new Date(curItem.date + 'T' + curItem.start_time);

        //curItem.date = ((eventDate.getMonth()+1) + "/" + eventDate.getDate());
        curItem.start_time = (eventDate.getHours() + ":" + eventDate.getMinutes());

        //console.log("start date: " + eventDate.toLocaleDateString() );
      }

      if(curItem.end_time == "00:00:00"){
        curItem.end_time = "?";
      }
      else{
        eventDate = new Date(curItem.date + 'T' + curItem.end_time);
        curItem.end_time = (eventDate.getHours() + ":" + eventDate.getMinutes());
      }
      //Set the date format now that the time has been formatted
      curItem.date = displayDate;


    }

    $scope.events = resItems;
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
