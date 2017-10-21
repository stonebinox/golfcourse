var app=angular.module("golf",[]);
app.controller("map",function($scope,$compile,$http){
    $scope.locationArray=[];
    $scope.center=new google.maps.LatLng(51.5, -0.12);
    $scope.map=null;
    $scope.initMap=function(){
        var mapOptions = {
            center: $scope.center,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROAD
        }
        $scope.map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
        var parentHeight=document.getElementById("map").offsetHeight;
        $("#mapcontent").css("height",parentHeight+"px");
    };
    $scope.getUserCurrentLocation=function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            //show error
        }
    };
    $scope.showPosition=function(position) {
        var latitude=position.coords.latitude;
        var longitude=position.coords.longitude;
        $scope.center=new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: $scope.center,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROAD
        }
        $scope.map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
        var marker = new google.maps.Marker({position: $scope.center});
        marker.setMap($scope.map);
    };
    $scope.getCourses=function(){
        $http.get("/getCourses")
        .then(function success(response){
            if((response!="")&&(response!=null)&&(response!=undefined)){
                console.log(response);
            }
            else{
                messageBox("Problem","Something went wrong while loading courses. Please try again later.");
            }
        }, function(response){
            messageBox("Problem","Something went wrong while loading courses. Please try again later.");
        });
    };
});