var courseArray=[];
var center=new google.maps.LatLng(51.5, -0.12);
var map=null;
window.onload=function(){
    initMap();
    getUserCurrentLocation();
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
            if((responseText!="")&&(responseText!=null)&&(responseText!=undefined)&&(responseText!="INVALID_PARAMETERS")){
                if(responseText=="NO_COURSES_FOUND"){
                    //do nothing
                }
                else{
                    responseText=JSON.parse(responseText);
                    courseArray=responseText;  
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
        for(var i=0;i<courseArray.length;i++){
            var course=courseArray[i];
            var courseID=course.idcourse_master;
            var courseName=course.course_name;
            var latitude=course.course_lat;
            var longitude=course.course_lon;
            var position=new google.maps.LatLng(latitude, longitude);
            setMarker(position);
        }
    }
}
function initMap(){
    var mapOptions = {
        center: center,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROAD
    };
    map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
    var parentHeight=document.getElementById("map").offsetHeight;
    $("#mapcontent").css("height",parentHeight+"px");
}
function getUserCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
        getCourses();
    } else {
        messageBox("No Location Found","Seems like your browser doesn't support fetching locations.");
    }
}
function getPosition(position){
    var latitude=position.coords.latitude;
    var longitude=position.coords.longitude;
    center=new google.maps.LatLng(latitude, longitude);
    showPosition(center);
}
function showPosition(position){
    console.log(position);
    var mapOptions = {
        center: position,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROAD
    }
    map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
    setMarker(position);
}
function setMarker(position){
    console.log(position);
    var marker = new google.maps.Marker({position: position});
    marker.setMap(map);
}
function searchCourses(val){
    var search=$.trim(val);
    if(search!=""){
        console.log(search);
    }
    else{
        //show error
    }
}