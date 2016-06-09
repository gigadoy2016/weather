var app = angular.module('application', ['gm']);

app.controller('mapController', function($scope,$http) {

  $scope.lat = undefined;
  $scope.lng = undefined;
  $scope.captionPlace = "Location.."
  $scope.places = [{ id:0, caption:"Bangkok",  lat: 0,  lng: 0,}];

  $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var location = $scope.autocomplete.getPlace().geometry.location;

      var map = {
        id      : $scope.id = $scope.places.length,
        caption : document.getElementById('autocomplete').value,
        lat     : $scope.lat = location.lat(),
        lng     : $scope.lng = location.lng()
      };
      $scope.captionPlace = map.caption.substring(0,35)+"..";

      $scope.addPlace(map);
      $scope.loadWeather(map);
      $scope.$apply();
  });

  $scope.addPlace = function(map){
    $scope.places.push(map);
  }
  $scope.currentDisplay   = function(data){
    //console.log(data.currently.time);
    $scope.currentDate        = data.currently.time * 1000;
    $scope.currentWeather     = data.currently.summary;
    $scope.currentWeatherIcon = "img/"+data.currently.icon+'.gif';
    $scope.currentTemperature = Math.round((data.currently.temperature - 32) * 5/9);
    $scope.debug = $scope.daily    = data.daily.data;
    $scope.$apply();
  }

  $scope.loadWeather = function(map){
    var apiKey = 'eca18d5d7064224fe871d0834b2c105d';
    var url = 'https://api.forecast.io/forecast/';
    var URL_C = url + apiKey + "/" + map.lat + "," + map.lng + "?callback=?";

    $.getJSON(URL_C, function(response) {
      //console.log(response.currently);
      $scope.currentDisplay(response);
    });
  }

  


});
