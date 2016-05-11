//Roughly the center of Missouri (lat/long)
var center = [38.6321346, -92.4013551]

//Target the chart div as the container for our leaflet map
//Set the center point and zoom level.
var map = L.map('chart').setView(center, 7);

// add an OpenStreetMap tile layer
//OpenStreetMap is an open source map layers anyone can use free of charge.
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// //Add an svg element to the map.
var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");




//This will be a dictionary object we use to lookup the info for each county.
//It's empty for now. We add our data when we load or json.
var theData = {};


// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
}





d3.csv("data/new_data.csv", function(data) {


    drawMarkers(data)


    // Each row in the data is a county.
    // So we append an object to theData with the county name
    // And put the whole row in that object
    // So each county's data is accessible with the construction, theData[county name here];


    // $.each is the same as a for loop:
    // for (i=0; i < data.length; i++) {
    //where item is the same as data[i];
    //and i would be index, just like in a for loop.
    // }


})




function drawMarkers(data) {

    // Alternate marker call uses `myIcon` to draw a different marker.
        var circleIcon = L.Icon.extend({
            options: {
                // shadowUrl: 'markers/lightest.png',
                iconSize: [38, 38],
                // shadowSize:   [50, 64],
                iconAnchor: [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [-3, -76]
            }
        });
        

        L.icon = function(options) {
            return new L.Icon(options);
        };


    var highestIcon = new circleIcon({
                iconUrl: 'markers/darkest.png'
            }),
            highIcon = new circleIcon({
                iconUrl: 'markers/2darkest.png'
            }),
            lowIcon = new circleIcon({
                iconUrl: 'markers/2lightest.png'
            }),
            lowestIcon = new circleIcon({
                iconUrl: 'markers/lightest.png'
            });

    for (i = 0; i < data.length; i++) {

        //Define our variables here.
        var lat = data[i]["LATITUDE"];
        var lon = data[i]["LONGITUDE"];
        var placeName = data[i]["FACILITY_NAME"];
        var amount = data[i]["TOTAL_RELEASES"];
        var parent = data[i]["PARENT_COMPANY_NAME"];
        var address = data[i]["STREET_ADDRESS"];

        //Lets store our markup as a variable to keep things nice and tidy.
        var markup =

            "<span class='amount'>" + amount + "</span>" +
            "<span class='amount'> Pounds of Lead</span><br>" +
            "<span class='placeName'>" + placeName + "</span><br>" +
            "<span class='address'>" + address + "</span><br>" +
            "<span class='parent'>Owned by </span>" +
            "<span class='parent'>" + parent + "</span>";

        //Draw the marker here. Pass the lat/long value unique to each location
        //and parse the markup to the `bindPopup` method so it shows up when a marker is selected
        //  L.marker([lat, lon]).addTo(map)
        // .bindPopup(markup)
        // .openPopup();


        

        // L.marker([51.5, -0.09], {
        //     icon: greenIcon
        // })

       // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");


        var options = {};

        if (amount > 1000) {
            options.icon = highestIcon;
        } else {
            options.icon = lowestIcon;
        }


        L.marker([lat, lon], options).addTo(map)
            .bindPopup(markup)
            .openPopup();




        // L.marker([38.6321348, -92.4013553], {
        //     icon: highestIcon
        // }).addTo(map).bindPopup("I am a green leaf.");
        // L.marker([38.6321344, -92.4013555], {
        //     icon: highIcon
        // }).addTo(map).bindPopup("I am a red leaf.");
        // L.marker([38.6321346, -92.4013551], {
        //     icon: lowIcon
        // }).addTo(map).bindPopup("I am an orange leaf.");
        // L.marker([38.6321342, -92.4013557], {
        //     icon: lowestIcon
        // }).addTo(map).bindPopup("I am an orange leaf.");



        // Color the markers by (4 colors maybe) by amount released.

    }



}