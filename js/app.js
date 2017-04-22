var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers',

])

//myApp.factory('feedConfig', function feedConfigFactory() {
myApp.service('feedConfigService', function ($http) {

  this.getConfig = function () {

  //this.getConfig = $.get('ccb-events.conf', function (data) {
  return $.get('ccb-events.conf', function (data) {

    //Regex to parse out the values
    const regex = /([a-z_]+)\s*=\s*"?([\w\d:_!@#$%^&*()\[\]{},.+\/-]+)"?/gi;
    let m;
    let c = {};
    while ((m = regex.exec(data)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      // m.forEach((match, groupIndex) => {
      //     //console.log(`Found match, group ${groupIndex}: ${match}`);
      // });

      c[m[1]] = m[2];

    } //endwhile

    let d = {
      daysOfWeek: c['daysOfWeek'].split(','),
      itemLimit: parseInt(c['itemLimit']), //4 items are shown at a time
      swapFrequency: parseInt(c['swapFrequency']), //every 4 seconds
      slideFrequency: parseInt(c['slideFrequency']),
      pageRefreshFrequency: parseFloat(c['pageRefreshFrequency']), //every 2 hours
      slideHeadImg: c['slideHeadImg']
    };
    console.log(d);
    //angular.module('myApp').constant('FEED_CONFIG', d);
    //myApp.constant('FEED_CONFIG', d);

    return d;
    //angular.module('myApp.config',[]).constant('FEED_CONFIG', d);

   });
  }
});

//let FEED_CONFIG;






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

//angular.element(document).ready(function () {


//});

//Config settings for the app
//TODO: Put this in a config file
// myApp.constant('FEED_CONFIG', {
//   daysOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
//   itemLimit: 4, //4 items are shown at a time
//   swapFrequency: 4000, //every 4 seconds
//   slideFrequency: 3000,
//   pageRefreshFrequency: 7.2e+6, //every 2 hours
//   slideHeadImg: 'http://goodshep.com/wp-content/themes/rayoflight/images/header-wrapper-bg.gif'
// });
