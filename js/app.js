var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers'
])

//Calls routeProvider service
myApp.config(['$routeProvider', function($routeProvider){
  //When the /list route is called, include the list.html partial
  $routeProvider
  .when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  })
  .when('/list-with-slides', {
    templateUrl: 'partials/list-with-slides.html',
    controller: 'ListController'
  })
  .otherwise({
    redirectTo: '/list' //Go to list route by default
  });

}]);

//Config settings for the app
//TODO: Put this in a config file
myApp.constant('FEED_CONFIG', {
  daysOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  itemLimit: 4, //4 items are shown at a time
  swapFrequency: 4000, //every 4 seconds
  slideFrequency: 3000,
  slideHeadImg: 'http://goodshep.com/wp-content/themes/rayoflight/images/header-wrapper-bg.gif'
});
