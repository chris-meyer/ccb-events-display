//Angular var that Sets Namespace for the App
var eventControllers = angular.module("eventControllers", ['ngAnimate']);

/**
* Controller to handle displaying the event list
* @param (String) Name of the controller
* @param (Array) List of name-protected fields to pass, including constructor
*/
eventControllers.controller("ListController",
  function ($scope, $http, $interval, $location, feedConfigService){

   //Add the class to fix the scrollbar appearing on animations
   angular.element(document.querySelector('body')).addClass('vert-clip');

   const LOCATION_PATH = $location.path();

   $scope.eventsLoaded = false;
  //$http.get returns a Promise, so we can use then to determine what to do next
   feedConfigService.getConfig()
   .then(
     function(response) {
    //  console.log('getConfig result');
    //  console.log(cdata);

     let FEED_CONFIG = feedConfigService.parseConfig(response.data,2);

    //  console.log('parseConfig result');
    //  console.log(FEED_CONFIG);

  //The http service allows for the reading the json returned by CCB
  $http.get('php/gs.php').success(function(data){
    var jRes = data.response;

    //In this case, $scope carries the data to use in the App
    var resItems = jRes.items.item;
    //Loop through the items for formatting
    var curItem;


    $scope.itemToggle = {};
    //A "toggle list" of the item ids and whether they should be shown
    $scope.itemToggle.itemTL = [];
    //The beginning of the list to show
    $scope.itemToggle.firstShown = 0;
    //The end of the list to show
    $scope.itemToggle.lastShown = (FEED_CONFIG.item_limit - 1);
    //Number of items
    $scope.itemToggle.itemCnt = resItems.length;

    for(var r=0; r<resItems.length; r++){
      curItem = resItems[r];

      //Should this item be shown?
      if(r < FEED_CONFIG.item_limit){
        //$scope.itemTL.push([r,true]);
        $scope.itemToggle.itemTL.push(true);
      }else{
        //$scope.itemTL.push([r,false]);
        $scope.itemToggle.itemTL.push(false);
      }

      //If a location is not set then it's an empty array
      if(typeof curItem.location !== "string"){
        curItem.location = "Not Available"
      }

      //Format the date and time
      var eventDate;
      //console.log("date and time for " + curItem.event_name+ " before format: "+curItem.date + " " + curItem.start_time + " - " + curItem.end_time);
      //First format the date for display
      var displayDate = curItem.date.split('-');
      displayDate = new Date(parseInt(displayDate[0],10),parseInt(displayDate[1],10)-1,parseInt(displayDate[2],10));
      displayDate = FEED_CONFIG.days_of_week[displayDate.getDay()] + " " + ((displayDate.getMonth()+1) + "/" + displayDate.getDate());

      //Now format the start time and end time
      if(curItem.start_time == "00:00:00"){
        //console.log("start time NOT set");
        curItem.start_time = "?";
      }
      else{
        //console.log("start time IS set");
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
      curItem.display_date = displayDate;

    }//end for

    $scope.events = resItems;
    //Set default sort field to name
    $scope.eventOrder = 'date';
    //Get limit from the config
    $scope.eventLimit = FEED_CONFIG.item_limit;

    $scope.inRange = function(value){
      $inRange = false;
      if($scope.itemToggle.itemTL[value] === true){
        $inRange = true;
      }
      return $inRange;
    }

    //Changes the flags in the toggle list
    $scope.swapItems = function(itemT){
      //Save the index of the item to move to the end
      var indToMove = itemT.firstShown;

      //Hide the first in the list before moving the pointer
      itemT.itemTL[itemT.firstShown] = false;

      if(itemT.firstShown == (itemT.itemCnt - 1)){
        //Move the "start" index to the beginning
        itemT.firstShown = 0;
      }else{
        //Move the "start" index ahead one
        itemT.firstShown++;
      }

      //Get the index of the last shown item
      if(itemT.lastShown == (itemT.itemCnt - 1)){
        //Move the "end" index to the beginning
        itemT.lastShown = 0;
      }else{
        //Move the "end" index ahead one
        itemT.lastShown++;
      }
      //Show the next in the list
      itemT.itemTL[itemT.lastShown] = true;

      //Move the hidden item
      return indToMove;
    }

    var iTMove = 0;
    if(resItems.length > FEED_CONFIG.item_limit){
      //Rotate the items if any need to be hidden
      $interval( function(){
        iTMove = $scope.swapItems($scope.itemToggle);
        setTimeout(function(){moveItem(iTMove);},3000);
      }, FEED_CONFIG.swap_frequency);
    }

    if(LOCATION_PATH.indexOf('slides') === -1){
      $scope.eventsLoaded = true;
    }

  }); //END HTTP FOR CCB EVENTS


 if(LOCATION_PATH.indexOf('slides') !== -1){
    //Slider logic
    $http.get('php/findimages.php').success(function(data){
        var imgRes = data;
        $scope.annIndx = 0;
        $scope.annList = imgRes;

        if(imgRes.length > 1){
         $interval( function(){
           //Move the image index
           $scope.annIndx++;

           if($scope.annIndx == $scope.annList.length){
             $scope.annIndx = 0;
           }

         },FEED_CONFIG.slide_frequency);
        }
        //Checks for current announcement slider
        $scope.isCurAnn = function(value){
          if($scope.annIndx == value){
            return true;
          }
          return false;
        }

        let slider_container = document.getElementById("announcement-container");
        document.onload = positionSlider(slider_container);
        //window.onresize = positionSlider(slider_container);

        $scope.eventsLoaded = true;

    }); //END HTTP FOR IMAGES

  }

  //Timeout to refresh the page to get new data
  setTimeout(function(){
    window.location.reload();
  },FEED_CONFIG.page_refresh_frequency);

}); //END feedConfigService Call

});

function moveItem(ind){
  //Get the DOM obj for the event container
  var eventContainer = angular.element(document.querySelector('.eventlist'));

  //Get the DOM obj for the item to move
  var moveEL = angular.element(document.querySelector('#event-'+ind)).detach();

  //Append it to the end of the container
  eventContainer.append(moveEL);
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

function positionSlider(slider_element){
  //let win_height = screen.availHeight;
  let win_height = window.innerHeight;
  let header_height = document.getElementById('head-row').clientHeight;
  let offset = (win_height - header_height - slider_element.clientHeight) / 2;
  slider_element.style['margin-top'] = (offset + "px");
  console.log("positionSlider margin top: "+offset);
}
