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
var current_code;


d3.json("data.json", function(error, data) {
  if (error) throw error;

  // default worldmap, barcharts and table
  draw_worldmap(data, current_year, current_category);
  draw_barchart(data, '#container2', current_year, 'GDP', current_category);
  draw_barchart(data, '#container3', current_year, 'Happiness', current_category);
  draw_table(data, '2014', 'Obesity');

  // add_rank_table(data, current_year, current_category);


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
        current_code = geo.id;
        // if (prevFill) {
        //   d3.select(selectorCountry).style("fill", prevFill);
        // }
        // selectorCountry = '.datamaps-subunit.' + current_code;
        // prevFill = d3.selectAll(selectorCountry).style("fill")
        // d3.selectAll(selectorCountry).style("fill", "000000")
        if (data) {   
          d3.selectAll('#' + current_code).style('fill', 'yellow');
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

    // respond to choice of year by viewer
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit')
                    // .on('mouseover', function(geography) {
                      
                    //   d3.selectAll('.datamaps-subunit.' + current_code).style('opacity', '0.4').style('stroke', 'rgba(0,0,0,0.5)').style('stroke-width', '3');
                    // })
                    // .on('mouseout', function(geography) {
                    //   current_code = geography.id;
                    //   d3.selectAll('#' + current_code).style('fill', 'steelblue'); 
                    //   d3.selectAll('.datamaps-subunit.' + current_code).style('opacity', '1').style('stroke', 'rgba(255,255,255,0.3)').style('stroke-width', '1'); 
                    // });
    },

    // data to display on worldmap
    data: data    
  });

  // legend of the world map
  map.legend({
    legendTitle: 'Percentage Obesity in the World',
    defaultFillName: 'No Data',
    labels: {
      A: '0-20',
      B: '20-40', 
      C: '40-60',
      D: '60-80',
      E: '80-100'
    }

  });

}

d3.select('#container1').on('mouseout', function(d) {
  // if (d3.event.target.tagName == "circle"){
  //   console.log(d3.select(d3.event.target).data()[0],"out")
  console.log(d);
  d3.selectAll('#' + current_code).style('fill', 'steelblue');
});


function test(d) {
  console.log('joe');
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
      .attr("id", function(d) {  return d.countrycode })
      // show tooltip when hover over bar
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

};

// The table generation function
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

  // sort dictionary from biggest to lowest value of category
  var top = dict.sort(function(a, b) { return a.number < b.number ? 1 : -1; })
                .slice(0, dict.length);

  // append ranking number to dictionary
  for (i = 0; i < dict.length; i++) { 
    dict[i].ranking = i + 1;
  }

  var columns = [
    { head: '#', cl: 'ranking', html: function(d) { return d.ranking }, code: function(d) {return d.countrycode }},
    { head: 'Country', cl: 'country', html: function(d) { return d.country }, code: function(d) { return d.countrycode }},
    { head: category, cl: 'number', html: function(d) {return d.number}, code: function(d) { return d.countrycode }},
    { head: 'GDP', cl: 'GDP', html: function(d) { if (isNaN(d.GDP.toFixed(2))) {
                                                    return '<i>Unknown</i>';
                                                  } 
                                                  return '\u0024' + d.GDP.toFixed(2) }, code: function(d) { return d.countrycode }},
    { head: 'Happiness', cl: "Happiness", html: function(d) { if (isNaN(d.Happiness.toFixed(2))) {
                                                                return '<i>Unknown</i>';
                                                              } 
                                                              return d.Happiness.toFixed(2) }, code: function(d) { return d.countrycode }}
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
                        .on('click', function(d) {
                          headers.attr('class', 'header');

                          if (sortAscending) {
                            rows.sort(function(a, b) { return b[d.cl] - a[d.cl]; });
                            sortAscending = false;
                            this.className = 'aes';
                          } else {
                            rows.sort(function(a, b) { return a[d.cl] - b[d.cl]; });
                            sortAscending = true;
                            this.className = 'des';
                          }
                        });

  // create table body
  var rows = table.append('tbody')
                .selectAll('tr')
                .data(dict).enter()
                .append('tr')
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
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut);

}
function mouseOver(d) {
  current_code = d.code;
  d3.selectAll('#' + current_code).style('fill', 'yellow');

  // SELECTEREN OP VALUE EN VAN DIE DE STYLE VERANDEREN (GOOGLE)
  // d3.selectAll(.bar).attr("style")
}

function mouseOut(d) {
  d3.selectAll('#' + current_code).style('fill', 'steelblue');
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
    td = tr[i].getElementsByTagName("td")[0];
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



