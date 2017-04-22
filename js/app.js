var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers'
])

myApp.service('feedConfigService', function ($http) {

  this.getConfig = function () {
    //TODO: This is bad. Use a server-side script to get this data
    return $.get('ccb-events.conf');
  }

  this.parseConfig = function(data) {
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

    return d;
  }

});


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
