var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers',
  'confController'
])

myApp.service('feedConfigService', function ($http) {

  this.getConfig = function () {
    return $http.get('php/get_conf.php');
  }

  this.parseConfig = function(config_data) {

    let parsed_conf = angular.copy(config_data);
    parsed_conf['swap_frequency'] /= 1000; // ms to seconds
    parsed_conf['slide_frequency'] /= 1000; // ms to seconds
    parsed_conf['page_refresh_frequency'] /= 60000; // ms to minutes
    parsed_conf['days_of_week'] = parsed_conf['days_of_week'].split(',');

    return parsed_conf;
    //Regex to parse out the values
    // const regex = /([a-z_]+)\s*=\s*"?([\w\d:_!@#$%^&*()\[\]{},.+\/-]+)"?/gi;
    // let m;
    // let c = {};
    // while ((m = regex.exec(data)) !== null) {
    //   // This is necessary to avoid infinite loops with zero-width matches
    //   if (m.index === regex.lastIndex) {
    //       regex.lastIndex++;
    //   }
    //
    //   // The result can be accessed through the `m`-variable.
    //   // m.forEach((match, groupIndex) => {
    //   //     //console.log(`Found match, group ${groupIndex}: ${match}`);
    //   // });
    //
    //   c[m[1]] = m[2];
    //
    // } //endwhile
    //
    // let d = {
    //   ccb_church: c['ccb_church'],
    //   ccb_user: c['ccb_user'],
    //   ccb_pass: c['ccb_pass'],
    //   days_ahead: parseInt(c['days_ahead']), //4 items are shown at a time
    //   days_of_week: c['days_of_week'].split(','),
    //   item_limit: parseInt(c['item_limit']), //4 items are shown at a time
    //   swap_frequency: ( parseInt(c['swap_frequency']) / 1000 ), //every 4 seconds
    //   slide_frequency: ( parseInt(c['slide_frequency']) / 1000 ),
    //   page_refresh_frequency: ( parseFloat(c['page_refresh_frequency']) / 60000 ), //every 2 hours
    //   slide_head_img: c['slide_head_img'],
    //   slide_img_path: c['slide_img_path']
    // };
    //
    // return d;
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
