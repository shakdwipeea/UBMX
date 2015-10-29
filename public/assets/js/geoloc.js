function getLocation1() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition1);
    } else { 
        alert("Geolocation is not supported by this browser. ");
    }
}

function showPosition1(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);  
    localStorage.setItem("lat_pickup", position.coords.latitude);
    localStorage.setItem("lon_pickup", position.coords.longitude);

}
function getLocation2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2);
    } else { 
        alert("Geolocation is not supported by this browser. ");
    }
}

function showPosition2(position) {
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);  
    localStorage.setItem("lat_drop", position.coords.latitude);
    localStorage.setItem("lon_drop", position.coords.longitude);

}