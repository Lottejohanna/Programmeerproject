/*
Programmeerproject
helper.js

Name: Lotte Slim
Number: 10654976
*/

function prepareData(data, year, category, variable, table) {
    /* 
    This function prepares the data for the graphs.

    data: the data displayed in the barchart
    year: the selected year
    category: Obesity, Overweight or BMI
    variable: GDP or Happiness
    table: is the graph a table? Yes or No
    */

    var data = data[year][category];

    dict = [];
    // loop through all countries
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
    /* 
    This function colors the buttons whether it is selected or not

    element: this
    */ 

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

function addTooltip(container, type) {
    /* 
    This function adds a tooltip to the graph.

    container: the selected container
    type: map, bar or scatter
    */

    tooltip = d3.select(container).append('div')
        .attr('class', 'hidden tooltip rem')
        .attr('id', 'tooltip' + type);
} 

function mouseOver(d, id, type) {
    /* 
    This function changes the colors of the country in the map,
    the bar in the barchart, the dot in the scatterplot and the 
    row in the table when hovered over a specific country.

    id: the key in the dict for the countrycode
    type: map, bar or scatter
    */

    // current countrycode
    currCode = d[id];

    // change color of country in map
    if (prevFill) {
        d3.select(selectorCountry).style('fill', prevFill)
                                  .style('opacity', '1')
                                  .style('stroke', prevStroke)
                                  .style('stroke-width', prevStrokeWidth);
    }

    // select the country
    selectorCountry = '.datamaps-subunit.' + currCode;

    // store all the original color settings
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

    // change color of dot in scatterplot
    d3.selectAll('#scatter' + currCode)
      .attr('r', 8)
      .style('fill', '#fdae61');

    // highlight row in table
    var row = d3.select('#myTable')
                .select('#' + currCode)
                .style('background-color', '#fdae61');
}

function mouseOut(d) {
    /* 
    This function restores the original color settings.
    */

    // restore color of bar
    d3.selectAll('#' + currCode).style('fill', 'steelblue');

    // restore the color of the dot in scatterplot
    d3.selectAll('#scatter' + currCode)
        .attr('r', 2)
        .style('fill', 'steelblue');

    // restore the color of country in map
    if (prevFill) {
        d3.select(selectorCountry).style('fill', prevFill)
                                  .style('stroke', prevStroke)
                                  .style('stroke-width', prevStrokeWidth)
                                  .style('opacity', prevOpacity);
    }

    // restore color of row in table
    d3.select('#myTable').select('#' + currCode)
        .style('background-color', 'rgba(0,0,0,0)');

    // hide tooltip when mouseout
    tooltip.classed('hidden', true);
}

function sourceVis(container, source, display) {
    /* 
    This function displays the source of the visualization.

    container: the selected container
    source: the webpage of the source
    display: the name of the source displayed on the page
    */
    
    d3.select(container).select('svg').append('text')
        .attr('class', 'source rem')
        .attr('text-anchor', 'left')
        .attr('x', margin.right)
        .attr('y', height + margin.bottom + margin.top/1.05)
        .html('<a href="' + source + '"target="_blank">Source: \xA9' + display + '</a>');
}

