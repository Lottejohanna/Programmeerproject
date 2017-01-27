/*
Programmeerproject
project.js

Name: Lotte Slim
Number: 10654976

*/

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 500 - margin.right - margin.left, 
    height = 400 - margin.top - margin.bottom; 
  
// var current_year;
// var current_category;

var current_category = "Obesity";
var current_year = "2014";
var current_code;
var tip;
var prevFill;
var prevStroke;
var prevStrokeWidth;
var map;

d3.json("data.json", function(error, data) {
  if (error) throw error;

  // default worldmap, barcharts and table
  draw_worldmap(data, current_year, current_category);
  draw_table(data, '2014', 'Obesity');
  draw_barchart(data, '#container2', current_year, 'GDP', current_category);
  draw_barchart(data, '#container3', current_year, 'Happiness', current_category);

  // draw graphs after chosen year
  d3.selectAll(".btn.btn-default")
    .on("click", function() {
      // d3.select(".datamaps-legend").remove()
      d3.select(".datamap").remove()
      d3.select('.datamaps-legend').remove()
      d3.selectAll(".rem").remove()

      current_year = this.getAttribute("value");

      draw_worldmap(data, current_year, current_category);
      draw_barchart(data, '#container2', current_year, 'GDP', current_category);
      draw_barchart(data, '#container3', current_year, 'Happiness', current_category);
      draw_table(data, current_year, current_category);
    });

  d3.selectAll(".m")
    .on("click", function() {
      d3.select('.datamap').remove()
      d3.select('.datamaps-legend').remove()
      d3.selectAll(".table.rem").remove();

      // var year = d3.selectAll(".btn.btn-default");
      current_category = this.getAttribute("value");

      draw_worldmap(data, current_year, current_category);
      draw_table(data, current_year, current_category);
    });
  
});

function draw_worldmap(data, year, category) {

// select proper year and category
  data = data[year][category];

  var tooltip = d3.select('#container1').append('div')
      .attr('class', 'hidden tooltip');

  map = new Datamap({element: document.getElementById('container1'),

    scope: 'world',
    geographyConfig: {
      borderColor: 'rgba(255,255,255,0.3)'
    },

    // colors for different categories
    fills: {
      A:     '#deebf7',
      B:     '#9ecae1',
      C:     '#4292c6',
      D:     '#2171b5',
      E:     '#08519c', 
      defaultFill: '#bdbdbd' 
    },

    done: function(datamap, geography) {
      datamap.svg.selectAll('.datamaps-subunit')
        .on('mouseover', function(d) {

            // change color when mouseover
            mouseOver(d, "id");

            // display tooltip when mouseover
            var mouse = d3.mouse(this);
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0] + 15) +
                        'px; top:' + (mouse[1] - 35) + 'px')
                .html(function() {
                  
                  if (data[d.id]) {
                    return "<strong>Country:</strong> <span>" + d.properties.name + "</span> <br/> <strong>" 
                      + category + ":</strong> <span>" + data[d.id].number + "</span>";
                  }
                  return "<strong>Country:</strong> <span>" + d.properties.name + "</span> <br/> <strong>" 
                    + category + ":</strong> <span> <i>No Data</i> </span>";
                })
        })
        .on('mouseout', function(d) {
            // change color when mouseout
            mouseOut(d, "id");

            // hide tooltip when mouseout
            tooltip.classed('hidden', true);
        });
    },

    // data to display on worldmap
    data: data    
  });
 
  // legend of the world map
  draw_legend(category);
}

function draw_legend(category) {
  if (category == 'BMI') {
    map.legend({
      legendTitle: 'Mean Body Mass Index (BMI), ages 18+, in the World',
      defaultFillName: 'No Data',
      labels: {
        A: '< 22.5',
        B: '22.5 - 25', 
        C: '25 - 27.5',
        D: '27.5 - 30',
        E: '> 30'
      }
    });
  }
  else {
    map.legend({
      legendTitle: 'Percentage of ' + category + ', ages 18+, in the World',
      defaultFillName: 'No Data',
      labels: {
        A: '< 20',
        B: '20 - 40', 
        C: '40 - 60',
        D: '60 - 80',
        E: '80 - 100'
      }
    });
  }
}

function draw_barchart(data, container, year, variable, category){

  // set margin, width and height
  var margin = {top: 50, right: 30, bottom: 30, left: 40},
      width = 560 - margin.right - margin.left, 
      height = 300 - margin.top - margin.bottom; 

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

  var tooltip = d3.select(container).append('div')
      .attr('class', 'hidden tooltip');
  
  // create svg
  var chart = d3.select(container).append("svg")
    .attr("class", "barchart rem")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr("width", "100%")
        .attr("height", 400)
      .append("g")
      .attr("transform", "translate(" + 2 * margin.left + "," + margin.top + ")");

  var data = data[year][category];

  // put data from json in dict
  var dict = [];
  for (var key in data) {
    // no data
    if ( (data[key][variable] == '..') || (data[key][variable] === undefined) ) {
      dict.push( {value: 0,
                country: data[key].country,
                countrycode: data[key].countrycode} );
    }
    // data
    else {
      dict.push( {value: +data[key][variable],
                country: data[key].country,
                countrycode: data[key].countrycode} );
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
                          return "GDP per capita (\u0024)"; }
                        return "Happiness rate"; 
                        });
        
  // create title
  chart.append("text")
    .attr("class", "toptitle rem")
    .attr("x", margin.left)             
    .attr("y", 0 - margin.top/4)
    .attr("text-anchor", "middle")   
    .text(function() {if (variable == "GDP") { 
                        return "GDP per Capita"; }                      
                      return "Happiness"; 
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
      .attr("id", function(d) {  return d.countrycode })
      .on('mouseover', function(d) {

        mouseOver(d, "countrycode");

        // display tooltip when mouseover
        var mouse = d3.mouse(this);
        tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] + 15) +
                    'px; top:' + (mouse[1] - 35) + 'px')
            .html(function() {
                  
              if (d.value != 0) {
                if (variable == 'GDP') {
                  return "<strong>Country:</strong> <span>" + d.country + "</span> <br/> <strong>" 
                    + variable + ":</strong> <span> \u0024" + d.value.toFixed(2) + "</span>";
                }
                return "<strong>Country:</strong> <span>" + d.country + "</span> <br/> <strong>" 
                    + variable + ":</strong> <span>" + d.value.toFixed(1) + "</span>";
              }

              return "<strong>Country:</strong> <span>" + d.country + " </span> <br/> <strong>" 
                + variable + ":</strong> <span> <i>No Data</i> </span>";
              
            })
      })
      .on('mouseout', function(d) {

        mouseOut(d, "countrycode");

        // hide tooltip when mouseout
        tooltip.classed('hidden', true);
      });
}

function draw_table(data, year, category) {

  var data = data[year][category];

  // put data from json in dict
  var dict = [];
  for (var key in data) {

    dict.push( { country: data[key].country,
                countrycode: data[key].countrycode,
                number: +data[key].number,
                GDP: +data[key].GDP,
                Happiness: +data[key].Happiness });
  }

  // sort dictionary from biggest to lowest value of category
  var top = dict.sort(function(a, b) { return a.number < b.number ? 1 : -1; })
                .slice(0, dict.length);

  // append ranking number to dictionary
  for (i = 0; i < dict.length; i++) { 
    dict[i].ranking = i + 1;
  }

  var columns = [
    { head: '#', cl: 'ranking', html: function(d) { return d.ranking }, countrycode: function(d) {return d.countrycode }},
    { head: 'Country', cl: 'country', html: function(d) { return d.country }, countrycode: function(d) { return d.countrycode }},
    { head: category, cl: 'number', html: function(d) { if (isNaN(d.number)) {
                                                          return "No Data"; }
                                                        return d.number }, countrycode: function(d) { return d.countrycode }},
    { head: 'GDP', cl: 'GDP', html: function(d) { if (isNaN(d.GDP.toFixed(2))) {
                                                    return "No Data";
                                                  } 
                                                  return '\u0024' + d.GDP.toFixed(2) }, countrycode: function(d) { return d.countrycode }},
    { head: 'Happiness', cl: "Happiness", html: function(d) { if (isNaN(d.Happiness.toFixed(2))) {
                                                                return "No Data";
                                                              } 
                                                              return d.Happiness.toFixed(2) }, countrycode: function(d) { return d.countrycode }}
  ];


  // create table
  var sortAscending = true;
  var table = d3.select("#container4").append("table")

  table.attr("id", "myTable")
    .attr('class', 'table table-hover rem');

  // create table header
  var headers = table.append('thead').append('tr')
                        .selectAll('th')
                        .data(columns).enter()
                        .append('th')
                        .attr('class', function(d) { return d.cl; })
                        .text(function(d) {return d.head; })
                        // sort rows on click in table
                        .on('click', function(d) {
                          rows.sort(function (a, b) { return a == null || b == null ? 0 : valueCompare(a[d.cl], b[d.cl]); })
                        })
                        // .on('click', function(d) {
                        //   headers.attr('class', 'header');

                        //   // add secret value to countries without data
                        //   if (sortAscending) {
                        //     rows.sort(function(a, b) { if (isNaN(a[d.cl]) || isNaN(b[d.cl]))   { return -10000000 ; } 
                        //                                   console.log(b[d.cl] - a[d.cl]); return b[d.cl] - a[d.cl]; });
                        //     sortAscending = false;
                        //     this.className = 'aes';
                        //   } else {
                        //     rows.sort(function(a, b) { if (isNaN(a[d.cl]) || isNaN(b[d.cl]))   { return -10000000 ; } 
                        //                                   console.log(a[d.cl] - b[d.cl]); return a[d.cl] - b[d.cl]; });
                        //     sortAscending = true;
                        //     this.className = 'des';
                        //   }
                        // });

  // create table body
  var rows = table.append('tbody')
                .selectAll('tr')
                .data(dict).enter()
                .append('tr')
                .attr("id", function(d) { return d.countrycode; });
                

  rows.selectAll('td')
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
    .attr('class', function(d) {return d.cl})
    .on('mouseover', function(d) {
      mouseOver(d, "countrycode")
    })
    .on('mouseout', function(d) {
      mouseOut(d, "countrycode");
    });
}

function valueCompare(a, b) {
    try {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a > b ? 1 : a == b ? 0 : -1;
    }

    catch(TypeError) {
      if (isNaN(a)) {
        a = Infinity;
      }

      else if (isNaN(b)) {
        b = Infinity;
      }

      return a > b ? 1 : a == b ? 0 : -1;
    }
}

function mouseOver(d, x) {
  current_code = d[x];

  // change color of country in map
  if (prevFill) {
    d3.select(selectorCountry).style("fill", prevFill)
                              .style('opacity', '1')
                              .style('stroke', prevStroke)
                              .style('stroke-width', prevStrokeWidth);
  }
  selectorCountry = '.datamaps-subunit.' + current_code;
  try { 
    prevFill = d3.selectAll(selectorCountry).style("fill");
    prevStroke = d3.selectAll(selectorCountry).style("stroke");
    prevStrokeWidth = d3.selectAll(selectorCountry).style("stroke-width");
    prevOpacity = d3.selectAll(selectorCountry).style("opacity");
    d3.selectAll(selectorCountry).style("fill", "yellow")
                                  .style('opacity', '0.4')
                                  .style('stroke', 'black')
                                  .style('stroke-width', '2');
  }
  catch(TypeError) {
    prevFill;
  }

  // change color of bar
  // if (current_code != 'AAA') {
  d3.selectAll('#' + current_code).style('fill', 'yellow');
  // }
  // highlight row in table
  var row = d3.select('#myTable').select('#' + current_code);
  row.style('background-color', 'grey');
  // row.scrollIntoView(true);
  // d3.selectAll()
}

function mouseOut(d) {
  // change color of bar
  d3.selectAll('#' + current_code).style('fill', 'steelblue');

  // change color of country in map
  if (prevFill) {
    d3.select(selectorCountry).style("fill", prevFill)
                              .style('stroke', prevStroke)
                              .style('stroke-width', prevStrokeWidth)
                              .style('opacity', prevOpacity);
  }
  // highlight row in table
  d3.select('#myTable').select('#' + current_code).style('background-color', 'rgba(0,0,0,0)');
}

function searchFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

function updateData() {}

function connect_visulalisation() {}
// function draw_table(data){};



