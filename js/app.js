var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers',
  'confController'
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
      days_of_week: c['days_of_week'].split(','),
      item_limit: parseInt(c['item_limit']), //4 items are shown at a time
      swap_frequency: parseInt(c['swap_frequency']), //every 4 seconds
      slide_frequency: parseInt(c['slide_frequency']),
      page_refresh_frequency: parseFloat(c['page_refresh_frequency']), //every 2 hours
      slide_head_img: c['slide_head_img']
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
  .when('/conf', {
    templateUrl: 'partials/conf.html',
    controller: 'ConfController'
  })
  .otherwise({
    redirectTo: '/list' //Go to list route by default
  });

}]);
