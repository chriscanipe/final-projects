function chartOne() {

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = $(".chart1").width() - margin.left - margin.right,
	    height = $(".chart1").height() - margin.top - margin.bottom;
    
	var parseDate = d3.time.format("%Y").parse;
	//     // formatPercent = d3.format(".0%");

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var color = d3.scale.category20();

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    //.tickFormat(formatPercent);
   //  var tip = d3.tip()
	  // .attr('class', 'd3-tip')
	  // .offset([-10, 0])
	  // .html(function(d) {
	  //   return "<strong>Frequency:</strong> <span style='color:red'>" + hi + "</span>";
	  // })
	var area = d3.svg.area()
	    .x(function(d) { return x(d.date); })
	    .y0(function(d) {
	      return y(0);
	    })
	    .y1(function(d) {
	      return y(d.y)
	      //return y(d.y0 + d.y);
	    });

	var stack = d3.layout.stack()
	    .values(function(d) { return d.values; });

	var svg = d3.select(".chart1").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	    
	// svg.call(tip);

	//console.log(svg);

	d3.tsv("no_of_crashes.tsv", function(error, data) {
	  if (error) throw error;

	  console.log(data)

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

	  data.forEach(function(d) {
	    d.date = parseDate(d.year);
	  });

	  var browsers = stack(color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {date: d.date, y: +d[name]};
	      })
	    };
	  }));

	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain([0, 7000])

	  var browser = svg.selectAll(".browser")
	      .data(browsers)
	    .enter().append("g")
	      .attr("class", "browser");

	  browser.append("path")
	      .attr("class", "area")
	      .attr("d", function(d) { return area(d.values); })
	      .style("fill", function(d) { return color(d.name); });

	  browser.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
	      .attr("x", -6)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name; });

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);

	});


}

function chartTwo() {
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = $(".chart2").width() - margin.left - margin.right,
	    height = $(".chart2").height() - margin.top - margin.bottom;

	var formatDate = d3.time.format("%Y");

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { 
	      return x(d.year);
	    })
	    .y(function(d) { 
	    	return y(d.no_of_injuries); 
	    });

	var svg = d3.select(".chart2").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv("injuries.tsv", type, function(error, data) {
	  if (error) throw error;
	  console.log(data)

	  x.domain(d3.extent(data, function(d) { 
	      return d.year; 
	}));
	  y.domain([0, 1200])

	//   y.domain(d3.extent(data, function(d) { 
	//       return d.no_of_injuries; 
	// }));

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Number of injuries");

	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);

	 });
	function type(d) {
	  d.year = formatDate.parse(d.year);
	  d.no_of_injuries = +d.no_of_injuries;
	  return d;
	}


	
}

function chartThree() {
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = $(".chart3").width() - margin.left - margin.right,
	    height = $(".chart3").height() - margin.top - margin.bottom;

	var formatDate = d3.time.format("%Y");

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { 
	      return x(d.year);
	    })
	    .y(function(d) { 
	    	return y(d.no_of_fatalities); 
	    });

	var svg = d3.select(".chart3").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv("fatalities.tsv", type, function(error, data) {
	  if (error) throw error;
	  console.log(data)

	  var y2005 = data[0].no_of_fatalities;

	  //pct = new - old / old

	  data.forEach(function(d) {
	    d.chg = (d.no_of_fatalities - y2005)/y2005;
	  })

	  // console.log(data);

	  x.domain(d3.extent(data, function(d) { 
	      return d.year; 
	}));
      y.domain([0, 16])
	//   y.domain(d3.extent(data, function(d) { 
	//       return d.no_of_fatalities; 
	// }));

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Number of fatalities");

	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);

	 });
	function type(d) {
	  d.year = formatDate.parse(d.year);
	  d.no_of_fatalities = +d.no_of_fatalities;
	  return d;
	}
	
}


$(document).ready(function() {



	$(".btn").on("click", function() {


		/* Get the class name for the chart we want from the button markup in index.html */
		var chartName = $(this).attr("val");

		/* Hide all of the charts */
		$(".chart-container").fadeOut();

		/* Show the one we want using the class name we pulled from the clicked button */
		$(".chart-container."+chartName).fadeIn();


		/* Remove the active class from all of the buttons. */
		$(".btn").removeClass("active");

		/* Add the active class to the one we just clicked */
		$(this).addClass("active");

	    //Add the hidden class to all paragraph text.
        $('.chart-text').addClass('hidden');

        //Show the text for the selected chart.
        $('#' + chartName + '-text').removeClass('hidden');

    });

    chartOne();
	chartTwo();
	chartThree();



})




