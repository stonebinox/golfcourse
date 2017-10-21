var app=angular.module("golf",[]);
app.controller("map",function($scope,$compile){
    $scope.locationArray=[];
    $scope.initMap=function(){
        var mapOptions = {
            center: new google.maps.LatLng(51.5, -0.12),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROAD
        }
        var map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
        var parentHeight=document.getElementById("map").offsetHeight;
        $("#mapcontent").css("height",parentHeight+"px");
    };
    $scope.getCurrentLocation=function(){
        
    };
});