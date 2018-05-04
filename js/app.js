var myApp = angular.module('myApp',[
  'ngRoute',
  'eventControllers',
  'confController'
])

myApp.service('feedConfigService', function ($http) {

  this.getConfig = function () {
    return $http.get('php/get_conf.php');
  }

/*
 * Takes in an array of config data and adjusts the values for use
 * @param config_data
 * @param convert_type - bit field where 1 = numbers and 10 = arrays
 * @return The parsed config settings as an associative array
 */
  this.parseConfig = function(config_data,convert_type) {
    console.log("type of convert_type " + typeof(convert_type));

    if ( typeof(convert_type) === 'undefined' ){
      //Will convert numbers and arrays since 3 = 11 in binary
      var convert_type = 3;
    }

    let parsed_conf = angular.copy(config_data);
    if( (convert_type & 1) == 1){
      console.log('converting numbers');
      parsed_conf['swap_frequency'] /= 1000; // ms to seconds
      parsed_conf['slide_frequency'] /= 1000; // ms to seconds
      parsed_conf['page_refresh_frequency'] /= 60000; // ms to minutes
    }
    if( (convert_type & 2) == 2){
      console.log('converting arrays');
      parsed_conf['days_of_week'] = parsed_conf['days_of_week'].split(',');
    }

    return parsed_conf;
    
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
