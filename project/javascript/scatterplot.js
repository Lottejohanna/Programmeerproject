/*
Programmeerproject
scatterplot.js

Name: Lotte Slim
Number: 10654976
*/
function drawScatterplot (data, year, category, variable) {

  prepareData(data, year, category, variable, 'no');

  addTooltip('#container3', 'scatter');

  // ordinal colorscale
  var colors = d3.scale.category10();

  var scatter = d3.select('#container3').append('svg')
    .attr('class', 'scatter rem')
    .attr('height', 400)
    .attr('width', '100%')
    .append('g')
    .attr('transform', 'translate(' + 2 * margin.left + ',' + margin.top + ')');

  var x = d3.scale.linear()
    .domain(d3.extent(dict, function(d) {
      return d.number;
    }))
    .range([0, width]);

  var y = d3.scale.linear()
    .domain(d3.extent(dict, function(d) {
      return d[variable];   
    }))
    .range([height, 0]);

  scatter.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    // create label for x-axis
    .append('text')
      .attr('x', width - margin.right)
      .attr('dx', '.71em')
      .attr('y', -5)
      .style('text-anchor', 'end')
      .text(function() {if (category == 'BMI') { 
                          return category + ' (kg/m\u00B2)'; }
                        return category + ' (%)'; 
                        });
  
  scatter.append('g')
    .attr('class', 'y axis')
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

  var xAxis = d3.svg.axis().scale(x).orient('bottom').tickPadding(2);
  var yAxis = d3.svg.axis().scale(y).orient('left').tickPadding(2);

  scatter.selectAll('g.y.axis').call(yAxis);
  scatter.selectAll('g.x.axis').call(xAxis);

  // create title
  scatter.append('text')
    .attr('class', 'toptitle rem')
    .attr('x', margin.left)             
    .attr('y', 0 - margin.top/4)
    .attr('text-anchor', 'middle')   
    .text(function() {if (variable == 'GDP') { 
                        return 'GDP vs. ' + category; }                      
                      return 'Happiness vs. ' + category;; 
                      });

  var country = scatter.selectAll('g.node')
    .data(dict, function (d) {
      return d.country;
    });

  var countryGroup = country.enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
        return 'translate(' + x(d.number) + ',' + y(d[variable]) + ')';     
    });

  countryGroup.append('circle')
        .attr('r', 2)
        .attr('class', 'dot')
        .attr('id', function(d) {  return 'scatter' + d.countrycode })
        .style('fill', 'steelblue')
        // .style('fill', function (d) {
        //     return colors(d.fillKey);
        // })
        .on('mouseover', function(d) {
          mouseOver(d, 'countrycode', 'scatter');

          tooltip = d3.select('#tooltip' + 'scatter');
          // var mouse = d3.mouse(this);
          var mouse = [d3.event.pageX, d3.event.pageY];
          tooltip.classed('hidden', false)
            .attr('style', 'left:' + (mouse[0] - 830) +
                    'px; top:' + (mouse[1] - 650) + 'px')
            .html(function() {
                if (variable == 'GDP') {
                  return "<strong>Country:</strong> <span>" + d.country + " </span> <br/> <strong>" 
                  + variable + ":</strong> <span> \u0024" + d[variable].toFixed(2) + "</span> <br/> <strong>" 
                  + category + ":</strong> <span>" + d.number + "</span>";
                }

              return "<strong>Country:</strong> <span>" + d.country + " </span> <br/> <strong>" 
                + variable + ":</strong> <span>" + d[variable].toFixed(1) + "</span> <br/> <strong>" 
                + category + ":</strong> <span>" + d.number + "</span>";            
            })
        })
        .on('mouseout', function(d) {
          mouseOut(d, 'countrycode');
        });

  // countryGroup.append('text')
  //     .style('text-anchor', 'middle')
  //     .attr('dy', -10)
  //     .text(function (d) {
  //         // this shouldn't be a surprising statement.
  //         return d.country;
  // });

  // source of the barchart
  if (variable == 'GDP') {
    sourceVis('#container3', 'http://databank.worldbank.org/data', 'World Databank');
  }
  else { sourceVis('#container3', 'https://en.wikipedia.org/wiki/World_Happiness_Report', 'Wikipedia'); }

}