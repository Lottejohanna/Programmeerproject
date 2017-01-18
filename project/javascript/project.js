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
  
// var current_year;
// var current_category;

var current_category = "Obesity";
var current_year = "2014";


d3.json("data.json", function(error, data) {
  if (error) throw error;

  // default worldmap and barcharts
  draw_worldmap(data, '2014', 'Obesity');
  draw_barchart(data, '#container2', '2014', 'GDP', "Obesity");
  draw_barchart(data, '#container3', '2014', 'Happiness', "Obesity");

  // render the table
  tabulate(data, '2014', 'Obesity');

  // draw graphs after chosen year
  d3.selectAll(".btn.btn-default")
    .on("click", function() {
      // d3.select(".datamaps-legend").remove()
      d3.select(".datamap").remove()
      d3.selectAll(".rem").remove()

      var current_year = this.getAttribute("value");
      // var category = d3.selectAll(".m");
      console.log("BUTTON");
      console.log(current_year);
      console.log(current_category);

      draw_worldmap(data, current_year, current_category);
      draw_barchart(data, '#container2', current_year, 'GDP', current_category);
      draw_barchart(data, '#container3', current_year, 'Happiness', current_category);
    });

  d3.selectAll(".m")
    .on("click", function() {
      d3.select('.datamap').remove();

      // var year = d3.selectAll(".btn.btn-default");
      var current_category = this.getAttribute("value");
      console.log("DROPDOWN");
      console.log(current_year);
      console.log(current_category);

      draw_worldmap(data, current_year, current_category);
    });

  
});

function draw_worldmap(data, year, category){
// select proper year and category
  data = data[year][category];

  var map = new Datamap({element: document.getElementById('container1'),

    scope: 'world',
    geographyConfig: {
      borderColor: 'rgba(255,255,255,0.3)',
      highlightBorderColor: 'rgba(0,0,0,0.5)',
      highlightOnHover: true,
      popupOnHover: true,
      highlightFillColor: 'fills',
      highlightFillOpacity: 0.4,

      // content pop-up on hovering
      popupTemplate: function(geo, data) {
        if (data) {
          if (data.number == "..") {
            return ['<div class="hoverinfo">',
                    '<strong>' + geo.properties.name + '</strong><br/>',
                    category + ': <i>Unknown</i>',
                    '</div>'].join(''); 
          }
          if (category == "BMI") {
            return ['<div class="hoverinfo">',
                  '<strong>' + geo.properties.name + '</strong><br/>',
                  category + ": " + data.number,
                  '</div>'].join('');
          }
          return ['<div class="hoverinfo">',
                  '<strong>' + geo.properties.name + '</strong><br/>',
                  category + ": " + data.number + "%",
                  '</div>'].join('');
        }
        return ['<div class="hoverinfo">',
                '<strong>' + geo.properties.name + '</strong><br/>',
                category + ': <i>Unknown</i>',
                '</div>'].join('');       
        }
    },

    // colors for different categories
    fills: {
      A:     '#deebf7',
      B:     '#9ecae1',
      C:     '#4292c6',
      D:     '#2171b5',
      E:     '#08519c', 
      F:     '#08306b',
      defaultFill: '#bdbdbd' 
    },

    // data to display on worldmap
    data: data    
  });
}

function draw_barchart(data, container, year, variable, category){

  // set margin, width and height
  var margin = {top: 50, right: 30, bottom: 30, left: 40},
      width = 860 - margin.right - margin.left, 
      height = 400 - margin.top - margin.bottom; 

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

  // create tooltip
  var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Country:</strong> <span>" + d.country + "</span> <br/> <strong>" 
          + variable + ":</strong> <span>" + d.value.toFixed(2) + "</span>";
        })

  // create svg
  var chart = d3.select(container).append("svg")
    .attr("class", "barchart rem")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr("width", "100%")
        .attr("height", 400)
      .append("g")
      .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")");

  // call for tooltip
  chart.call(tip);

  var data = data[year][category];

  // put data from json in dict
  var dict = [];
  for (var key in data) {
    // no data
    if ( (data[key][variable] == '..') || (data[key][variable] === undefined) ) {
      dict.push( {value: 0,
                country: data[key].country} );
    }
    // data
    else {
      dict.push( {value: +data[key][variable],
                country: data[key].country} );
    }
  }

  dict.sort(function(a, b) { return b.value - a.value});

  // set x and y domain
  x.domain(dict.map(function(d) { return d.country; }));
  y.domain([0, d3.max(dict, function(d) { return d.value; })]);

  // create x axis
  chart.append("g")
      .attr("class", "x axis rem")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("display", "none");

  // create y axis
  chart.append("g")
      .attr("class", "y axis rem")
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
    .attr("class", "toptitle rem")
    .attr("x", margin.left)             
    .attr("y", 0 - margin.top/4)
    .attr("text-anchor", "middle")   
    .text(function() {if (variable == "GDP") { 
                        return "GDP per Capita" } 
                      else {
                         return "Happiness"} 
                      });

  // create bars
  chart.selectAll(".bar")
      .data(dict)
    .enter().append("rect")
      .attr("class", "bar rem")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      // show tooltip when hover over bar
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

};

// The table generation function
function tabulate(data, year, category) {

  var data = data[year][category];

  // put data from json in dict
  var dict = [];
  for (var key in data) {

    dict.push( { country: data[key].country,
                number: +data[key].number,
                GDP: +data[key].GDP,
                Happiness: +data[key].Happiness });
  }

    // // no data
    // if ( (data[key][variable] == '..') || (data[key][variable] === undefined) ) {
    //   dict.push( {value: 0,
    //             country: data[key].country} );
    // }
    // // data
    // else {
    //   dict.push( {value: +data[key][variable],
    //             country: data[key].country} );
    // }
  // }

  var columns = [
    { head: 'Country', cl: 'country', html: function(d) { return d.country }},
    { head: category, cl: 'category', html: function(d) {return d.number}},
    { head: 'GDP', cl: 'GDP', html: function(d) { return d.GDP }},
    { head: 'Happiness', cl: "happiness", html: function(d) { return d.Happiness }}
  ];

  // create table
  var table = d3.select("#container4").append("table");

  // create table header
  table.append('thead').append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .attr('class', function(d) { return d.cl })
    .text(function(d) {return d.head });

  // create table body
  table.append('tbody')
    .selectAll('tr')
    .data(dict).enter()
    .append('tr')
    .selectAll('td')
    .data(function(row, i) {
        return columns.map(function(c) {
            // compute cell values for this specific row
            var cell = {};
            d3.keys(c).forEach(function(k) {
                cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
            });
            return cell;
        });
    }).enter()
    .append('td')
    .html(function(d) {return d.html })
    .attr('class', function(d) {return d.cl});

  // // append the header row
  // thead.append("tr")
  //     .selectAll("th")
  //     .data(columns)
  //     .enter()
  //     .append("th")
  //         .text(function(column) { return column; });

  // // create a row for each object in the data
  // var rows = tbody.selectAll("tr")
  //     .data(data)
  //     .enter()
  //     .append("tr");

  // // create a cell in each row for each column
  // var cells = rows.selectAll("td")
  //     .data(function(row) {
  //         return columns.map(function(column) {
  //             return {column: column, value: row[column]};
  //         });
  //     })
  //     .enter()
  //     .append("td")
  //     .attr("style", "font-family: Courier") // sets the font style
  //         .html(function(d) { return d.value; });
}



function updateData() {}

function connect_visulalisation() {}
// function draw_table(data){};



