angular.module('geolocation', [])
    .controller('googlemapoutput', function ($scope,$http) {

        var map;
        var mapOptions;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionResponse;
        var directionsService = new google.maps.DirectionsService();

        var options = {
            types: ['(cities)'],
            componentRestrictions: {country: "us"}
        };

        var startLocation = document.getElementById('startLocation');
        var startLocationAutocomplete = new google.maps.places.Autocomplete(startLocation, options);

        var endLocation = document.getElementById('endLocation');
        var endLocationAutocomplete = new google.maps.places.Autocomplete(endLocation, options);

        $scope.initialize = function () {
            var pos = new google.maps.LatLng(0, 0);
            var mapOptions = {
                zoom: 3,
                center: pos
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);
        };
        $scope.calcRoute = function () {
            var markerStart,markerEnd;
            var infowindowStart = new google.maps.InfoWindow();
            var infowindowEnd = new google.maps.InfoWindow();
            if(markerStart!=null)
                markerStart.setMap(null);
            if(markerEnd!=null)
                markerEnd.setMap(null);
            if(infowindowStart!=null)
                infowindowStart.close();
            if(infowindowEnd!=null)
                infowindowEnd.close();
            var end = document.getElementById('endLocation').value;
            var start = document.getElementById('startLocation').value;

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                directionResponse=response;
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                }

            });
            var startLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+start+".json";
            var endLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+end+".json";
            $http.get(startLocationWeatherUrl).success(function(data) {
                if(data.current_observation==null){
                    startLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                    $http.get(startLocationWeatherUrl).success(function(data) {
                        markerStart=new google.maps.Marker({
                            map:map
                        });
                        markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                        infowindowStart.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                        infowindowStart.open(map,markerStart);
                    });
                }
                else{
                    markerStart=new google.maps.Marker({
                        map:map
                    });
                    markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                    infowindowStart.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowStart.open(map,markerStart);
                }
            });
            $http.get(endLocationWeatherUrl).success(function(data) {
                if(data.current_observation==null){
                    endLocationWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                    $http.get(endLocationWeatherUrl).success(function(data) {
                        markerEnd=new google.maps.Marker({
                            map:map
                        });
                        markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                        infowindowEnd.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                        infowindowEnd.open(map,markerEnd);
                    });
                }
                else{
                    markerEnd=new google.maps.Marker({
                        map:map
                    });
                    markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                    infowindowEnd.setContent('<h4>Weather Details</h4><p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowEnd.open(map,markerEnd);
                }
            });
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize);

    });