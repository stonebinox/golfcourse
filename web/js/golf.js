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
            console.log(responseText);
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
        console.log(courseArray);
        for(var i=0;courseArray.length;i++){
            var course=courseArray[i];
            console.log(course);

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
        navigator.geolocation.getCurrentPosition(showPosition);
        getCourses();
    } else {
        messageBox("No Location Found","Seems like your browser doesn't support fetching locations.");
    }
}
function showPosition(position){
    var latitude=position.coords.latitude;
    var longitude=position.coords.longitude;
    center=new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROAD
    }
    map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
    var marker = new google.maps.Marker({position: center});
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