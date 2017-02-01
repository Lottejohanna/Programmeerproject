/*
Programmeerproject
barchart.js

Name: Lotte Slim
Number: 10654976
*/
function drawBarchart(data, year, variable, category){

  // set x-scale
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  // set y-scale
  var y = d3.scale.linear()
      .range([height, 0]);

   // display x-axis on the bottom
  var xAxis = d3.svg.axis()
      .scale(x)     
      .tickSize(0)
      .orient('bottom');

  // display y-axis on the left
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

  addTooltip('#container2');
  
  // create svg
  var chart = d3.select('#container2').append('svg')
    .attr('class', 'barchart rem')
      .attr('width', '100%')
      .attr('height', 400)
      .append('g')
      .attr('transform', 'translate(' + 2 * margin.left + ',' + margin.top + ')');

  prepareData(data, year, category, variable, 'no');

  // set x and y domain
  x.domain(dict.map(function(d) { return d.country; }));
  y.domain([0, d3.max(dict, function(d) { return d[variable]; })]);

  // create x axis
  chart.append('g')
      .attr('class', 'x axis rem')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      // don't display countries on x axis
      .selectAll('text')
        .style('display', 'none');
  // create label for x axis
  chart.append('text')
      .attr('x', width - margin.right)
      .attr('dx', '.71em')
      .attr('y', height + margin.bottom/2)
      .style('text-anchor', 'end')
      .style('font', '10px sans-serif')
      .text('Country');

  // create y axis
  chart.append('g')
      .attr('class', 'y axis rem')
      .call(yAxis)
    // create label for y-axis
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(function() {if (variable == 'GDP') { 
                          return 'GDP per capita (\u0024)'; }
                        return 'Happiness rate'; 
                        });
        
  // create title
  chart.append('text')
    .attr('class', 'toptitle rem')
    .attr('x', margin.left)             
    .attr('y', 0 - margin.top/4)
    .attr('text-anchor', 'middle')   
    .text(function() {if (variable == 'GDP') { 
                        return 'GDP per Capita'; }                      
                      return 'Happiness'; 
                      });

  // create bars
  chart.selectAll('.bar')
      .data(dict)
    .enter().append('rect')
      .attr('class', 'bar rem')
      .attr('x', function(d) { return x(d.country); })
      .attr('width', x.rangeBand())
      .attr('y', function(d) { return y(d[variable]); })
      .attr('height', function(d) { return height - y(d[variable]); })
      .attr('id', function(d) {  return d.countrycode })
      .on('mouseover', function(d) {
        mouseOver(d, data, 'countrycode', 'bar', variable, category);
      })
      .on('mouseout', function(d) {
        mouseOut(d, 'countrycode');
      });

  // source of the barchart
  if (variable == 'GDP') {
    sourceVis('#container2', 'http://databank.worldbank.org/data', 'World Databank');
  }
  else { sourceVis('#container2', 'https://en.wikipedia.org/wiki/World_Happiness_Report', 'Wikipedia'); }
}