# Programmeerproject - The fat, the poor and the unhappy

The body weight of the population in a country might have different relationships with prosperity of a country, commonly measured in terms of its annual per capita Gross Domestic Product (GDP), and happiness of a population. In these visualizations the relationship between the body weight of a population and the level of income and happiness is examined. 

![](doc/report1.png)

## Visualizations

### Visualization 1: The Worldmap
The worldmap shows the BMI or Obesity or Overweight percentage per country. If you hover over a specific country the information will be displayed in a pop-up (country, BMI/overweight/obesity). For this map there is a drowdown menu where you can choose between IBM/overweight/obesity and there will be two checkboxes where you can choose between 2010 and 2014. This worldmap is linked with the barchart, scatterplot and table.

### Visualization 2: The Barchart
The bar chart will display either the GDP per capita per country or the level of Happiness per country. The x-axis will be the countries and the y-axis will be either the GDP per capita in US dollars or the Happiness rate per country. The countries will be sorted from lowest to highest GDP. This barchart is linked with the worldmap, scatterplot and the table.

### Visualization 3: The Scatterplot
The scatterplot either visualizes data about the level of happiness per country or data about the GDP per Capita, both versus the selected weight category by using the dropdownmenu on the top left corner of the worldmap. The scatterplot is linked to all other visualizations.  

### Interactive Component: The Table
A table displaying the BMI/overweight/obesity country ranking, the name of the country, the BMI/overweight/obesity number, GDP and the happiness rate. It is possible to look for a specific country using a look up function and to sort the list by all these different variables. This table is also linked to all other visualizations.

## Data Sources
* [BMI, Overweight and Obesity](http://www.who.int/gho/ncd/risk_factors/overweight/en/)
* [GDP per capita](http://databank.worldbank.org/data)
* [Happiness rate](https://en.wikipedia.org/wiki/World_Happiness_Report)

## Code Sources
* [Barchart](https://bost.ocks.org/mike/bar/)
* [Scatterplot](https://jsfiddle.net/eamonnmag/Q567s/)
* [Ranking in table](http://stackoverflow.com/questions/27479750/getting-top-10-values-in-a-json-file)
* [Searching in table](http://www.w3schools.com/howto/howto_js_filter_table.asp)
* [Sorting in table](http://bl.ocks.org/biovisualize/1226718)
* [Table](http://bl.ocks.org/gka/17ee676dc59aa752b4e6)
* [Worldmap](https://github.com/markmarkoh/datamaps) 

## Libraries
* Bootstrap.min.js - Copyright 2011-2014 Twitter, Inc.
* Bootstrap.min.css - Copyright 2011-2014 Twitter, Inc.
* d3.min.js - Copyright 2015 Mike Bostock
* datamaps.world.min.js - MIT License Mark DiMarco
* topojson.min.js - Copyright (c) 2012-2016, Michael Bostock All rights reserved

Copyright (c) 2017 Lotte Slim
