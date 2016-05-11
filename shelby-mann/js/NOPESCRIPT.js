var rapeLookup = {
    "2000": {
        "Baltimore": 2457.6,
        "Birmingham": 1213.7,
        "Cleveland": 1262.7,
        "Detroit": 2324.5,
        "Indianapolis": 862.1,
        "Memphis": 1479.2,
        "Milwaukee": 956.7,
        "Oakland": 1261.1,
        "St. Louis": 2279.2,
        "Stockton": 1219.2
    },
    "2001": {
        "Baltimore": 2239.5,
        "Birmingham": 1241.8,
        "Cleveland": 1340.4,
        "Detroit": 2190.5,
        "Indianapolis": 930.5,
        "Memphis": 1658.3,
        "Milwaukee": 908.6,
        "Oakland": 1309.9,
        "St. Louis": 2187.6,
        "Stockton": 1327.4
    },
    "2002": {
        "Baltimore": 2054.9,
        "Birmingham": 1301,
        "Cleveland": 1322.3,
        "Detroit": 2072.8,
        "Indianapolis": 935,
        "Memphis": 1572.4,
        "Milwaukee": 954.8,
        "Oakland": 1366.9,
        "St. Louis": 2124.3,
        "Stockton": 1461.3
    },
    "2003": {
        "Baltimore": 1735,
        "Birmingham": 1393.6,
        "Cleveland": 1323.5,
        "Detroit": 2018.2,
        "Indianapolis": 883.2,
        "Memphis": 1577.1,
        "Milwaukee": 890.2,
        "Oakland": 1379.1,
        "St. Louis": 2181.9,
        "Stockton": 1364.9
    },
    "2004": {
        "Baltimore": 1839.4,
        "Birmingham": 1369.2,
        "Cleveland": 1299.5,
        "Detroit": 1740.4,
        "Indianapolis": 882.7,
        "Memphis": 1546.8,
        "Milwaukee": 784.8,
        "Oakland": 1276.8,
        "St. Louis": 2075.8,
        "Stockton": 1347.4
    },
    "2005": {
        "Baltimore": 1754.5,
        "Birmingham": 1470.3,
        "Cleveland": 1400.6,
        "Detroit": 2358.2,
        "Indianapolis": 993.1,
        "Memphis": 1861.2,
        "Milwaukee": 1027.6,
        "Oakland": 1420.8,
        "St. Louis": 2405.5,
        "Stockton": 1491.4
    },
    "2006": {
        "Baltimore": 1696.5,
        "Birmingham": 1359.3,
        "Cleveland": 1552.7,
        "Detroit": 2418.5,
        "Indianapolis": 960,
        "Memphis": 1991.3,
        "Milwaukee": 1342.8,
        "Oakland": 1905.3,
        "St. Louis": 2480.7,
        "Stockton": 1481.1
    },
    "2007": {
        "Baltimore": 1631.1,
        "Birmingham": 1458.1,
        "Cleveland": 1468.6,
        "Detroit": 2287,
        "Indianapolis": 1234.3,
        "Memphis": 1952.1,
        "Milwaukee": 1406.3,
        "Oakland": 1917.8,
        "St. Louis": 2198.2,
        "Stockton": 1418.7
    },
    "2008": {
        "Baltimore": 1588.5,
        "Birmingham": 1423,
        "Cleveland": 1419.8,
        "Detroit": 1985.2,
        "Indianapolis": 1204.3,
        "Memphis": 1925.3,
        "Milwaukee": 1229.6,
        "Oakland": 1968.4,
        "St. Louis": 2072.7,
        "Stockton": 1474.7
    },
    "2009": {
        "Baltimore": 1512.9,
        "Birmingham": 1236.7,
        "Cleveland": 1396.4,
        "Detroit": 1991.8,
        "Indianapolis": 1199.7,
        "Memphis": 1808.8,
        "Milwaukee": 1101.6,
        "Oakland": 1679.1,
        "St. Louis": 2070.1,
        "Stockton": 1267.2
    },
    "2010": {
        "Baltimore": 1500.3,
        "Birmingham": 0,
        "Cleveland": 1393.3,
        "Detroit": 2377.9,
        "Indianapolis": 1160.2,
        "Memphis": 1607.8,
        "Milwaukee": 1065.2,
        "Oakland": 1603.9,
        "St. Louis": 1943.4,
        "Stockton": 1382.6
    },
    "2011": {
        "Baltimore": 1417.6,
        "Birmingham": 1483.2,
        "Cleveland": 1366.4,
        "Detroit": 2137.4,
        "Indianapolis": 1100.8,
        "Memphis": 1583.5,
        "Milwaukee": 999.1,
        "Oakland": 1682.7,
        "St. Louis": 1856.7,
        "Stockton": 1407.8
    },
    "2012": {
        "Baltimore": 1405.2,
        "Birmingham": 1517.8,
        "Cleveland": 1383.8,
        "Detroit": 2122.9,
        "Indianapolis": 1185.5,
        "Memphis": 1750.3,
        "Milwaukee": 1294.5,
        "Oakland": 1993.3,
        "St. Louis": 1776.5,
        "Stockton": 1548
    }
}
var chartThisValue = "city";
    console.log(chartThisValue);
//Setting margin, width and height
//Pin the width and height to the .chart div
var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
    },
    width = $(".chart").width() - margin.left - margin.right,
    height = $(".chart").height() - margin.top - margin.bottom;

//parse the date as year
var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

//Color exists as a Scale. 
var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

x.domain(d3.extent(data, function(d) {
        return d.date;
    }));

  y.domain([400,2500]);

//The line function draws points for a path based on the date and 'value' for each row in each series. 
var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.crimeRate);
    });
//define svg
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



$(".btn").on("click", function() {

	/* Get the class name for the chart we want from the button markup in index.html */
	var chartName = $(this).attr("val");

    $(".chart-container").fadeOut();

	$(".chart-container."+chartName).fadeIn();

    $(".btn").removeClass("active");

	$(this).addClass("active");

        chartThisValue = val;
        updateLine();
    });



d3.csv("data/crime_multi.csv", function(error, data) {
    if (error) throw error;

    var colorDomain = d3.keys(
            data[0]).filter(
            function(key) {
                return key !== "year" && "population" && "violent_total" && "violent_rate" && "murder_manslaughter_rate" && "robbery_rate" && "assault_rate";
            }
        )
        //pass to the color scale
    color.domain(colorDomain);

    //Create new property called "date" for each row.
    //assign it the value of d.year after it's been formatted. 
    data.forEach(function(d) {
        d.date = parseDate(d.year);
    });

    //color.domain is an array of our column headers (but not "date")
    //It's the the values being charted, so Memphis/Chicago.
    //colorDomain is an array of 3 values, which are our column headers. 
    var cities = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {

                //Use the dictionary object to define rape value.
                //Add it to the object.
                //Since we have no value for Chicago, let's just set that to 0.
                //This way we avoid an error when the line function tries to draw it.
                var rapeVal = +rapeLookup[d.year][name];
                if (name === "Chicago") {
                    rapeVal = 0;
                }

                return {
                    date: d.date,
                    crimeRate: +d[name],
                    rapeRate: rapeVal
                };
            })
        };
    });






    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", -5)

        .attr("dy", ".35em")
        .text(function(d) {
            return d.name;
        });
    

});



function updateLine(val) {

    // Set the line.y property according the value passed from your buttons.
    line.y(function(d) {
        return y(d[chartThisValue]);
    });

    // Update the line position by redfining the .attr("d")
    svg.selectAll(".line")
        .transition().duration(500)
        .attr("d", function(d) {
            return line(d.values);
        });

    //Update the positions of your labels.
    svg.selectAll("text.city-label")
      .transition().duration(500)
      .attr("transform", function(d) {
            return "translate(" + x(d.value.date) + "," + y(d.value[chartThisValue]) + ")";
        })
}

