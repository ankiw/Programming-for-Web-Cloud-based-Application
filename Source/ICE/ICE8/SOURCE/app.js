'use strict';

// Declare app level module which depends on views, and components

var myapp = angular.module('myApp', []);

myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});


angular.module('myApp', [])
    .controller('View1Ctrl', function ($scope, $http) {
            $scope.venueList = new Array();
            $scope.mostRecentReview;
            $scope.getVenues = function () {
                var placeEntered = document.getElementById("txt_placeName").value;
                var searchQuery = document.getElementById("txt_searchFilter").value;
                if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
                    document.getElementById('div_ReviewList').style.display = 'none';
                    //This is the API that gives the list of venues based on the place and search query.
                    var handler = $http.get("https://api.github.com/users/eshamayuri/repos");

                    handler.success(function (data) {

                        if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                            for (var i = 0; i < data.response.venues.length; i++) {
                                $scope.venueList[i] = {
                                    "name": data.response.venues[i].name,
                                    "id": data.response.venues[i].id,
                                    "location": data.response.venues[i].location
                                };
                            }
                        }

                    })
                    handler.error(function (data) {
                        alert("There was some error processing your request. Please try after some time.");
                    });
                }
            }
        }
    );