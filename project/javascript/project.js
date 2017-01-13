/*
Programmeerproject
project.js

Name: Lotte Slim
Number: 10654976

*/

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 960 - margin.right - margin.left, 
    height = 450 - margin.top - margin.bottom; 


d3.json("data.json", function(error, data) {
  if (error) throw error;

  draw_worldmap(data);

  draw_barchart(data, '#container2', '2014', "GDP");

  draw_barchart(data, '#container3', "2014", "happiness");

});

function draw_worldmap(data){
// select proper year
data_map = data["2014"];

var map = new Datamap({element: document.getElementById('container1'),

  scope: 'world',
  geographyConfig: {
    borderColor: 'rgba(255,255,255,0.3)',
    highlightBorderColor: 'rgba(0,0,0,0.5)',
    highlightOnHover: true,
    popupOnHover: true,
    highlightFillColor: 'fills',
    highlightFillOpacity: 0.4,

    // colors for different categories
    fills: {
      A:     '#deebf7',
      B:     '#9ecae1',
      C:     '#4292c6',
      D:     '#2171b5',
      E:     '#08519c', 
      F:     '#08306b',
      defaultFill: '#bdbdbd' ,
    },

    // data to display on worldmap
    data: data_map,

    }
  });

}

function draw_barchart(data, container, year, variable){

  // set margin, width and height
  var margin = {top: 50, right: 30, bottom: 30, left: 40},
      width = 960 - margin.right - margin.left, 
      height = 450 - margin.top - margin.bottom; 

  // set x-scale
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  // set y-scale
  var y = d3.scale.linear()
      .range([height, 0]);

   // display x-axis on the bottom
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  // display y-axis on the left
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  // // create tooltip
  // var tip = d3.tip()
  //       .attr('class', 'd3-tip')
  //       .offset([-10, 0])
  //       .html(function(d) {
  //         return "<strong>\u0024:</strong> <span>" + d[variable] + "</span>";
  //     })

  // create svg
  var chart = d3.select(container).append("svg")
    .attr("class", "barchart")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr("width", "100%")
        .attr("height", 400)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // // call for tooltip
  // chart.call(tip);

  var data = data[year];

  // change all variable strings to floats
  for (var key in data) {
    data[key][variable] = +data[key][variable];
  }

  // HELP
  // set x and y domain
  // x.domain(data.map(function(d) { return d.country; }));
  // y.domain([0, d3.max(data, function(d) { return d[variable]; })]);

  // create x axis
  chart.append("g")
      .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // create y axis
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      // create label for y-axis
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(function() {if (variable == "GDP") { 
                            return "GDP per capita (\u0024)" } 
                          else {
                             return "Happiness rate"} 
                          });
        
    // create title
    chart.append("text")
      .attr("class", "toptitle")
      .attr("x", margin.left)             
        .attr("y", 0 - margin.top/4)
        .attr("text-anchor", "middle")   
        .text(function() {if (variable == "GDP") { 
                            return "GDP per Capita" } 
                          else {
                             return "Happiness"} 
                          });

    // HELP
    // // create bars
    // chart.selectAll(".bar")
    //     .data(data)
    //   .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(d) { return x(d.country); })
    //     .attr("y", function(d) { return y(d[variable]); })
    //     .attr("height", function(d) { return height - y(d[variable]); })
    //     // // show tooltip when hover over bar
    //     // .attr("width", x.rangeBand())
    //     // .on('mouseover', tip.show)
    //     // .on('mouseout', tip.hide)

};

function draw_table(data){};



