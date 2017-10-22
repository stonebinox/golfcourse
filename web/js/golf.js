var courseArray=[];
var center=new google.maps.LatLng(51.5, -0.12);
var map=null;
window.onload=function(){
    initMap();
    getUserCurrentLocation();
    getProducts();
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
            setMarker(position,courseName);
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
    showPosition(center,"You");
}
function showPosition(position,content){
    var mapOptions = {
        center: position,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROAD
    }
    map = new google.maps.Map(document.getElementById("mapcontent"), mapOptions);
    setMarker(position,content);
}
function setMarker(position,content){
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({position: position});
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })(marker));
}
function searchCourses(val){
    var search=$.trim(val);
    if(search!=""){
        var searchResults=[];
        for(var i=0;i<courseArray.length;i++){
            var course=courseArray[i];
            var courseName=course.course_name;
            if(courseName.toLowerCase().indexOf(search.toLowerCase())!=-1){
                searchResults.push(i);                
            }
        }
        $("#results").html('');
        if(searchResults.length>0){
            document.getElementById("results").setAttribute("open","true");
            var div=document.createElement("div");
            $(div).addClass("container-fluid");
            var ul=document.createElement("div");
            $(ul).addClass("list-group");
            for(var i=0;i<searchResults.length;i++){
                var pos=searchResults[i];
                var course=courseArray[pos];
                var courseID=course.idcourse_master;
                var courseName=course.course_name;
                var lat=course.course_lat;
                var lon=course.course_lon;
                var position=new google.maps.LatLng(lat, lon);
                var li=document.createElement("a");
                $(li).addClass("list_group_item");
                $(li).attr("href","#");
                $(li).click(function(){
                    showPosition(position,courseName);
                });
                $(li).html(courseName);
                $(ul).append(li);
            }
            $(div).append(ul);
            $("#results").append(div);
        }
        else{
            $("#results").removeAttr("open");
        }
    }
    else{
        $("#results").removeAttr("open");
    }
}
function getProducts(){
    var dt=new Date().getTime();
    $.ajax({
        url:"getProducts",
        method: "GET",
        error: function(xhr,stat,err){
            messageBox("Problem","Something went wrong while getting products. Please try again in a bit. This is the error we see: "+err,0);
        },
        success:function(responseText){
            if((responseText!="")&&(responseText!=null)&&(responseText!=undefined)&&(responseText!="INVALID_PARAMETERS")){
                if(responseText=="NO_PRODUCTS_FOUND"){
                    //do nothing
                }
                else{
                    responseText=JSON.parse(responseText);
                    /*var ul=document.createElement("ul");
                    $(ul).addClass("dropdown-menu");*/
                    for(var i=0;i<responseText.length;i++){
                        var product=responseText[i];
                        var productID=product.idproduct_master;
                        var productName=product.product_name;
                        var li=document.createElement("li");
                        var a=document.createElement("a");
                        $(a).attr("href","#");
                        $(a).html(productName);
                        $(li).append(a);
                        $("#productlist").append(li);
                    }
                    //console.log(ul);
                    //$("#productlist").append(ul);
                }
            }
            else{
                messageBox("Problem","Something went wrong while getting products. Please try again in a bit. This is the error we see: "+err,0);
            }
        }
    });
}