/*
Programmeerproject
helper.js

Name: Lotte Slim
Number: 10654976
*/
function prepareData(data, year, category, variable, table) {
  var data = data[year][category];

  dict = [];
  for (var key in data) {

    // no nodata points in barchart and scatterplot
    if (table == 'no') {
      if (!isNaN(+data[key].Happiness) && !isNaN(+data[key].GDP)) {

        dict.push( { country: data[key].country,
                    countrycode: data[key].countrycode,
                    number: +data[key].number,
                    GDP: +data[key].GDP,
                    Happiness: +data[key].Happiness,
                    fillKey: data[key].fillKey });
      }
    }
    else {
      dict.push( { country: data[key].country,
                countrycode: data[key].countrycode,
                number: +data[key].number,
                GDP: +data[key].GDP,
                Happiness: +data[key].Happiness });
    }
  }

  // sort dictionary from biggest to lowest value of category
  var top = dict.sort(function(a, b) { return a[variable] < b[variable] ? 1 : -1; })
                .slice(0, dict.length);

  // append ranking number to dictionary
  for (i = 0; i < dict.length; i++) { 
    dict[i].ranking = i + 1;
  }
}

function buttonColor(element) {

  currValue = element.getAttribute('value');
  currClass = element.getAttribute('class');
  currID = '#' + currClass.split(' ')[2]
  currColor = d3.select(element).style('background-color');

  // do nothing if already selected button in pressed
  if (( currValue != prevValue || currClass.split(' ')[2] != prevClass ) 
        && currColor != 'rgb(189, 189, 189)' ) {
    // switch colors of buttons
    if ((currValue == 0) && (d3.select(element).style('background-color') == 'rgb(240, 240, 240)')) {
      d3.select(currID + '0').style('background-color', 'rgb(189, 189, 189)');
      d3.select(currID + '1').style('background-color', 'rgb(240, 240, 240)');
    }

    else {
      d3.select(currID + '1').style('background-color', 'rgb(189, 189, 189)');
      d3.select(currID + '0').style('background-color', 'rgb(240, 240, 240)');
    } 
  }
  prevValue = currValue;
  prevClass = currClass.split(' ')[2];  
}

function addTooltip(container) {
  tooltip = d3.select(container).append('div')
      .attr('class', 'hidden tooltip rem');
} 

function mouseOver(d, data, id, type, variable, category) {
  currCode = d[id];

  // change color of country in map
  if (prevFill) {
    d3.select(selectorCountry).style('fill', prevFill)
                              .style('opacity', '1')
                              .style('stroke', prevStroke)
                              .style('stroke-width', prevStrokeWidth);
  }
  selectorCountry = '.datamaps-subunit.' + currCode;
  try { 
    prevFill = d3.selectAll(selectorCountry).style('fill');
    prevStroke = d3.selectAll(selectorCountry).style('stroke');
    prevStrokeWidth = d3.selectAll(selectorCountry).style('stroke-width');
    prevOpacity = d3.selectAll(selectorCountry).style('opacity');
    d3.selectAll(selectorCountry).style('fill', '#fdae61')
                                  .style('opacity', '0.8')
                                  .style('stroke', 'black')
                                  .style('stroke-width', '2');
  }
  catch(TypeError) {
    prevFill;
  }

  // change color of bar
  d3.selectAll('#' + currCode).style('fill', '#fdae61');

  // change dot in scatterplot
  d3.selectAll('#scatter' + currCode)
    .attr('r', 8)
    .style('fill', '#fdae61');

  // highlight row in table
  var row = d3.select('#myTable').select('#' + currCode);
  row.style('background-color', '#fdae61');
  // row.scrollIntoView(true);

  // show tooltip if not table
  if (type != 'table') {

    // display tooltip when mouseover
    var mouse = [d3.event.pageX, d3.event.pageY];
    tooltip.classed('hidden', false)
        .style('left', (mouse[0] - 800) + 'px')
        .style('top', (mouse[1] - 650) + 'px')
        .html(function() {
          // tooltip for worldmap
          if (type == 'map') {
            if (data[d[id]]) {
              return '<strong>Country:</strong> <span>' + d.properties.name + '</span> <br/> <strong>' 
                + category + ':</strong> <span>' + data[d[id]].number + '</span>';
            }
            return '<strong>Country:</strong> <span>' + d.properties.name + '</span> <br/> <strong>' 
              + category + ':</strong> <span> <i>No Data</i> </span>';
          }

          // tooltip for barchart
          else if (type == 'bar') {
            // tooltip for GDP
            if (variable == 'GDP') {
              return '<strong>Country:</strong> <span>' + d.country + '</span> <br/> <strong>' 
                + variable + ':</strong> <span> \u0024' + d[variable].toFixed(2) + '</span>';
            }
            // tooltip for Happiness
            return '<strong>Country:</strong> <span>' + d.country + '</span> <br/> <strong>' 
                + variable + ':</strong> <span>' + d[variable].toFixed(1) + '</span>'; 
          }

          // tooltip for scatterplot
          else {
            // tooltip for GDP
            if (variable == 'GDP') {
              return '<strong>Country:</strong> <span>' + d.country + '</span> <br/> <strong>' 
              + variable + ':</strong> <span> \u0024' + d[variable].toFixed(2) + '</span> <br/> <strong>' 
              + category + ':</strong> <span>' + d.number + '</span>';
            }

            // tooltip for Happiness
            return '<strong>Country:</strong> <span>' + d.country + '</span> <br/> <strong>' 
              + variable + ':</strong> <span>' + d[variable].toFixed(1) + '</span> <br/> <strong>' 
              + category + ':</strong> <span>' + d.number + '</span>'; 
          }
        })
  }
}

function mouseOut(d, table) {
  // change color of bar
  d3.selectAll('#' + currCode).style('fill', 'steelblue');

  // change dot in scatterplot
  d3.selectAll('#scatter' + currCode)
    .attr('r', 2)
    .style('fill', 'steelblue');

  // change color of country in map
  if (prevFill) {
    d3.select(selectorCountry).style('fill', prevFill)
                              .style('stroke', prevStroke)
                              .style('stroke-width', prevStrokeWidth)
                              .style('opacity', prevOpacity);
  }
  // highlight row in table
  d3.select('#myTable').select('#' + currCode)
    .style('background-color', 'rgba(0,0,0,0)');

  // hide tooltip when mouseout
  tooltip.classed('hidden', true);
}

function sourceVis(container, source, display) {
  d3.select(container).select('svg').append('text')
    .attr('class', 'source rem')
    .attr('text-anchor', 'left')
    .attr('x', margin.right)
    .attr('y', height + margin.bottom + margin.top/1.05)
    .html('<a href="' + source + '"target="_blank">Source: \xA9' + display + '</a>');
}

