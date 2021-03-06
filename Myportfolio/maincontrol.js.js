app.controller('mainCtrl',function($scope){
    $scope.markers=[];
    $scope.programmingSkils=[
        {
            'name':'Html 4 & 5',
            'rate':85
        },
        {
            'name':'CSS',
            'rate':90
        },
        {
            'name':'Bootstrape',
            'rate':90
        },
        {
            'name':'JavaScript',
            'rate':80
        },
        {
            'name':'Angular.JS',
            'rate':90
        },
        {
            'name':'JQuery',
            'rate':80
        }];
    $scope.additionalSkils=[
        {
            'name': 'nodeJs',
            'rate': 70
        },
        {
            'name':'Grunt',
            'rate':85
        },
        {
            'name':'Gulp',
            'rate':85
        },
        {
            'name': 'Karma',
            'rate':85
        },
        {
            'name':'MySQL',
            'rate':70
        },
        {
            'name':'Mongo DB',
            'rate':75
        }];
    $scope.projects=[
        {
            name:'Grande Communications',
            imageUrl:'images/grande.jpg',
            type:['Angular','Grunt']
        },
        {
            name:'DirectTv',
            imageUrl:'images/directv.jpg',
            type:['Angular']
        },
        {
            name:'Comerica',
            imageUrl:'images/comerica.jpg',
            type:['Angular']
        },
        {
            name:'Biogen',
            imageUrl:'images/biogen.jpg',
            type:['Karma']
        },
        {
            name:'Sonata Software',
            imageUrl:'images/sonatasoftware.jpg',
            type:['Karma']
        }
    ];
    function initMap() {
        var mapProp = {
            center:new google.maps.LatLng(33.2178450,97.1475150),
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var infoWindow = new google.maps.InfoWindow({map: map});
        $scope.geocoder = new google.maps.Geocoder();
        $scope.directionsService = new google.maps.DirectionsService;
        $scope.directionsDisplay = new google.maps.DirectionsRenderer;
        //$scope.calculateAndDisplayRoute($scope.directionsService,$scope.directionsDisplay);
        $scope.directionsDisplay.setMap(map);
        $scope.directionsDisplay.setPanel(document.getElementById('right-panel'));
        $scope.map=map;
        // infoWindow.setPosition(new google.maps.LatLng(51.508742,-0.120850));
        // infoWindow.setContent('Location found.');


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent([
                    '410 Bryan Street',
                    'Denton',
                    'TX',
                    'LatLng: '+new google.maps.LatLng(pos)
                ].join('<br>'));
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    $scope.geocodeAddress=function(geocoder, resultsMap) {
        //var address = document.getElementById('address').value;
        console.log(geocoder, resultsMap , $scope.search)
        if( !!$scope.search)
        {
            //$scope.markers=$scope.markers.length>=1?$scope.markers[0].setMap(null):$scope.markers;
            if($scope.markers.length>=1)
            {
                $scope.markers[0].setMap(null);
                $scope.markers=[];
            }
            geocoder.geocode({'address': $scope.search}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resultsMap.setCenter(results[0].geometry.location);
                   var search_marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });
                    $scope.markers.push(search_marker);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        else
        {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
    $scope.calculateAndDisplayRoute=function(directionsService, directionsDisplay) {
        console.log('entered')
        directionsService.route({
            origin: $scope.search,
            destination: '410 Bryan Street,Denton,TX',
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log('410 Bryan Street,Denton,TX')
                $scope.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    google.maps.event.addDomListener(window, 'load', initMap);
    $scope.setValue=function(type){
        $scope.type=type;
    }
});