/*
Programmeerproject
index.js

Name: Lotte Slim
Number: 10654976
*/

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 560 - margin.right - margin.left, 
    height = 400 - margin.top - margin.bottom; 

// global variables
var currCode;
var tooltip, dict;;
var prevFill, prevStroke, prevStrokeWidth;
var currID, currClass, currValue, currColor;
var prevValue, prevClass;
var hoverColor = '#fdae61';

// the button options
var years = ['2010', '2014'];
var variables = ['GDP', 'Happiness'];

// default settings
var currCategory = 'BMI';
var currYear = '2014';
var currVariableBar = 'GDP';
var currVariableScatter = 'Happiness';
var currVariable = currVariableBar;

d3.json("project/data.json", function(error, data) {
    if (error) throw error;

    // default button color
    d3.selectAll('.btn.btn-default').style('background-color', 'rgb(240, 240, 240');
    d3.selectAll('.btn.btn-default.start').style('background-color', 'rgb(189, 189, 189');

    // default worldmap, barcharts and table
    drawWorldmap(data, currYear, currCategory, currVariable);
    drawTable(data, currYear, currCategory, currVariable);
    drawBarchart(data, currYear, currVariableBar, currCategory);
    drawScatterplot (data, currYear, currCategory, currVariableScatter);

    // draw graphs after chosen year
    d3.selectAll('.btn.btn-default.map')
        .on('click', function() {

            // change color of selected button 
            buttonColor(this);

            // remove all the visualizations
            d3.select('.datamap').remove()
            d3.select('.datamaps-legend').remove()
            d3.selectAll('.rem').remove()

            // store the selected year by the user
            var indexYears = this.getAttribute('value');
            currYear = years[indexYears];

            // redraw all the visualizations
            drawWorldmap(data, currYear, currCategory, currVariable);
            drawBarchart(data, currYear, currVariableBar, currCategory);
            drawTable(data, currYear, currCategory, currVariable);
            drawScatterplot (data, currYear, currCategory, currVariableScatter);
        });

    // draw graphs after chosen variable
    d3.selectAll('.btn.btn-default.bar')
        .on('click', function() {

            // change color of selected button
            buttonColor(this);

            // remove the tooltip, barchart and scatterplot
            d3.selectAll('.barchart.rem').remove();
            d3.selectAll('.scatter.rem').remove();
            d3.selectAll('#tooltipbar').remove();

            // store the selected variable by the user
            var indexBars = this.getAttribute('value');
            currVariableBar = variables[indexBars];
            currVariable = currVariableBar;

            // redraw the barchart and scatterplot
            drawBarchart(data , currYear, currVariableBar, currCategory);
            drawScatterplot(data, currYear, currCategory, currVariableScatter);
        });

    // draw graphs after chosen variable
    d3.selectAll('.btn.btn-default.scatter')
        .on('click', function() {

            // change the color of selected button
            buttonColor(this);

            // remove the tooltip, barchart and scatterplot
            d3.selectAll('.barchart.rem').remove();
            d3.selectAll('.scatter.rem').remove();
            d3.selectAll('#tooltipscatter').remove();

            // store the selected variable by the user
            var indexScatter = this.getAttribute('value');
            currVariableScatter = variables[indexScatter];
            curVariable = currVariableScatter;

            // redraw the barchart and scatterplot
            drawBarchart(data , currYear, currVariableBar, currCategory);
            drawScatterplot(data, currYear, currCategory, currVariableScatter);
        });

    // draw graphs after chosen category
    d3.selectAll('.m')
        .on('click', function() {

            // remove all the visualizations
            d3.select('.datamap').remove()
            d3.select('.datamaps-legend').remove()
            d3.selectAll('.rem').remove()

            // store the selected category by user
            currCategory = this.getAttribute('value');

            // redraw all the visualizations
            drawWorldmap(data, currYear, currCategory, currVariable);
            drawBarchart(data, currYear, currVariableBar, currCategory);
            drawTable(data, currYear, currCategory, currVariable);
            drawScatterplot (data, currYear, currCategory, currVariableScatter);
        });  
});





