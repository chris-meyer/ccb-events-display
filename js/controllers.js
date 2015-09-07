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
      console.log("date and time for " + curItem.event_name+ " before format: "+curItem.date + " " + curItem.start_time + " - " + curItem.end_time);
      //First format the date for display
      var displayDate = curItem.date.split('-');
      displayDate = new Date(parseInt(displayDate[0],10),parseInt(displayDate[1],10)-1,parseInt(displayDate[2],10));
      displayDate = ((displayDate.getMonth()+1) + "/" + displayDate.getDate());

      //Now format the start time and end time
      if(curItem.start_time == "00:00:00"){
        console.log("start time NOT set");
        curItem.start_time = "?";
      }
      else{
        console.log("start time IS set");
        //Show the date and time as MM/DD HH:MM AM/PM
        eventDate = new Date(curItem.date + 'T' + curItem.start_time+"-0500");
        curItem.start_time = formatAMPM(eventDate);
      }

      if(curItem.end_time == "00:00:00"){
        curItem.end_time = "?";
      }
      else{
        eventDate = new Date(curItem.date + 'T' + curItem.end_time+"-0500");
        curItem.end_time = formatAMPM(eventDate);
      }
      //Set the date format now that the time has been formatted
      curItem.date = displayDate;

    }

    $scope.events = resItems;
    //Set default sort field to name
    $scope.eventOrder = 'date';
    //Get limit from the config
    $scope.eventLimit = FEED_CONFIG.itemLimit;

    //$interval(swapItems, FEED_CONFIG.swapFrequency);
    //setTimeout(swapItems,5000);
  });
}]);

function swapItems(){
  //console.log("swapitems");
  //Get the event container
  var eventContainer = angular.element(document.querySelector('.eventlist'));
  //console.log('eventContainer length: '+eventContainer.length);
  //console.log('eventContainer CLASS: '+eventContainer.attr("class"));
  //Get the first item
  //var topEl = angular.element('.show');
  var topEl = angular.element(document.querySelector('.show'));
  //console.log('topEl length: '+topEl.length);
  //console.log('topEl ID: '+topEl.attr("id"));
  //Move the top to the bottom
  //Add css transition here
  topEl.removeClass("show");
  topEl.addClass("hidden");
  //eventContainer.remove(angular.element(document.querySelector("#"+topEl.attr("id"))));
  eventContainer.append(topEl);
  // //Show the next item
  var hidEl = angular.element(document.querySelector('.hidden'));
  //console.log('hidEl length: '+hidEl.length);
  //console.log('hidEl ID: '+hidEl.attr("id"));
  hidEl.removeClass("hidden");
  hidEl.addClass("show");
}
/*
* Lifted from http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
*/
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
