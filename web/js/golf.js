var app=angular.module("golf",[]);
app.controller("map",function($scope,$compile,$http){
    $scope.courseArray=[];
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
            //$scope.getCourses();
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
        $http.get("getCourses")
        .then(function success(response){
            if((response!="")&&(response!=null)&&(response!=undefined)){
                if(response=="NO_COURSES_FOUND"){
                    //do nothing
                }
                else{
                    response=JSON.parse(response);
                    $scope.courseArray=response.slice();  
                    $scope.showCourses();
                }
            }
            else{
                messageBox("Problem","Something went wrong while loading courses. Please try again later.");
            }
        }, function(response){
            console.log(response);
            messageBox("Problem","Something went wrong while loading courses. Please try again later. This is the error we see: "+response);
        });
    };
    $scope.showCourses=function(){
        if($scope.courseArray.length>0){
            for(var i=0;$scope.courseArray.length;i++){
                var course=$scope.courseArray[i];

            }
        }
    };
});