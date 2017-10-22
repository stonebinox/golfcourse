var courseArray=[];
window.onload=function(){
    getCourses();
};
function getCourses(){
    var dt=new Date().getTime();
    $.ajax({
        url:"getCourses",
        method: "GET",
        error: function(xhr,stat,err){
            messageBox("Problem","Something went wrong while getting courses. Please try again in a bit. This is the error we see: "+err,0);
        },
        success:function(responseText){
            console.log(responseText);
            if((responseText!="")&&(responseText!=null)&&(responseText!=undefined)&&(responseText!="INVALID_PARAMETERS")){
                if(responseText=="NO_COURSES_FOUND"){
                    //do nothing
                }
                else{
                    responseText=JSON.parse(responseText);
                    courseArray=responseText.slice();  
                    showCourses();
                }
            }
            else{
                messageBox("Problem","Something went wrong while getting courses. Please try again in a bit. This is the error we see: "+err,0);
            }
        }
    });
}
function showCourses(){
    if(courseArray.length>0){
        console.log(courseArray);
        for(var i=0;courseArray.length;i++){
            var course=courseArray[i];

        }
    }
}
var app=angular.module("golf",[]);
app.controller("map",function($scope,$compile,$http){
    var courseArray=[];
    $scope.center=new google.maps.LatLng(51.5, -0.12);
    $scope.map=null;
    $scope.initMap=function(){
        var mapOptions = {
            center: $scope.center,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROAD
        };
        $scope.map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
        var parentHeight=document.getElementById("map").offsetHeight;
        $("#mapcontent").css("height",parentHeight+"px");
    };
    $scope.getUserCurrentLocation=function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            messageBox("No Location Found","Seems like your browser doesn't support fetching locations.");
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
        
    };
    $scope.showCourses=function(){
        
    };
    $scope.searchCourses=function(){
        var search=$.trim($scope.courseSearch);
        if(search!=""){
            console.log(search);
        }
        else{
            //show error
        }
    };
});