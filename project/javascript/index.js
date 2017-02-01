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
  
// var current_year;
// var current_category;


var currCode;
var tooltip;
var prevFill, prevStroke, prevStrokeWidth;
var currID, currClass, currValue, currColor;
var prevValue, prevClass;
var hoverColor = '#fdae61';
var dict;

var years = ['2010', '2014'];
var variables = ['GDP', 'Happiness'];

// default settings
var currCategory = "Obesity";
var currYear = "2014";
var currVariableBar = 'GDP';
var currVariableScatter = 'Happiness';
var currVariable = currVariableBar;

d3.json("data.json", function(error, data) {
  if (error) throw error;

  // default button color
  d3.selectAll('.btn.btn-default').style("background-color", 'rgb(240, 240, 240');
  d3.selectAll('.btn.btn-default.start').style("background-color", 'rgb(189, 189, 189');

  // default worldmap, barcharts and table
  drawWorldmap(data, currYear, currCategory, currVariable);
  drawTable(data, currYear, currCategory, currVariable);
  drawBarchart(data, currYear, currVariableBar, currCategory);
  drawScatterplot (data, currYear, currCategory, currVariableScatter);

  // draw graphs after chosen year
  d3.selectAll(".btn.btn-default.map")
    .on("click", function() {

      buttonColor(this);

      d3.select(".datamap").remove()
      d3.select('.datamaps-legend').remove()
      d3.selectAll(".rem").remove()

      var indexYears = this.getAttribute("value");
      currYear = years[indexYears];

      drawWorldmap(data, currYear, currCategory, currVariable);
      drawBarchart(data, currYear, currVariableBar, currCategory);
      drawTable(data, currYear, currCategory, currVariable);
      drawScatterplot (data, currYear, currCategory, currVariableScatter);
    });

  d3.selectAll(".btn.btn-default.bar")
    .on("click", function() {

      buttonColor(this);

      d3.selectAll(".barchart.rem").remove()

      var indexBars = this.getAttribute("value");
      currVariableBar = variables[indexBars];
      currVariable = currVariableBar;

      drawBarchart(data ,currYear, currVariable, currCategory);
    });

  d3.selectAll(".btn.btn-default.scatter")
    .on("click", function() {

      buttonColor(this);

      d3.selectAll(".scatter.rem").remove();

      var indexScatter = this.getAttribute("value");
      currVariableScatter = variables[indexScatter];
      curVariable = currVariableScatter;

      drawScatterplot (data, currYear, currCategory, currVariableScatter);
    });

  d3.selectAll(".m")
    .on("click", function() {

      d3.select('.datamap').remove();
      d3.select('.datamaps-legend').remove();
      d3.selectAll(".table.rem").remove();
      d3.selectAll(".scatter.rem").remove()

      currCategory = this.getAttribute("value");

      drawWorldmap(data, currYear, currCategory, currVariable);
      drawTable(data, currYear, currCategory, currVariable);
      drawScatterplot (data, currYear, currCategory, currVariableScatter);
    });  
});





