# day 1

Mon January 9

Encoutered lot of problems with obtaining dataset. Wanted to compare overweight/obesity with GDP. Nowhere to be found a proper dataset for the world.
So I chose GDP versus Wealth indicators and want to look if the countries with the highest GDPs also the best score for wealth indicators have.

# day 2

Tue January 10

Started writing design document. First needed to determine proper datasets. 
Therefore, I started looking for the wealth indicators. Difficult to determine what is best to use. 

### Total change of plans

Could not determine the specific wealth indicators so started to look again for obesity. Found data so I changed my topic to obesity and started to think about my new plan.

# day 3

Wed January 11

Written a new readme and concept before the first morning meeting. My feedback at the first morning meeting was that my story-telling aspect should be more clear. 

So decided to examine the relationship between BMI, GDP and happiness. I will try to find a trend in find a level of GDP which provides for optimal happiness and healthy level of BMI. 

Other possible variables are level of education, female/male difference and life expectancy. 

I acquired the data from the different databanks. 
* Worldbank - Population and GDP per capita
* World Health Organization - BMI, overweight and obesity
* Wikipedia - Happiness rate

New sketch of my concept. Difficult to determine in advance how all the visualizations will be linked. 

Consulted other students about proper JSON format.

In the design document I formulated how all the different visualizations interact, the datasets, my JSON format, the sketch and the libraries I'm planning to use.

Slowly I'm getting a better idea of what needs to be done. Tomorrow I will try to make the data ready to use in a javascript file. So first I need to convert my 6 CSV files to 1 JSON file in the morning. Then, in the afternoon I can create my javascript, css and html files and prepare for the friday presentation.

# day 4

Thur January 12

Daily standup meeting - Exchanged some technical details, e.g. CSS, bootstrap, table d3

* Combined 3 csv files (obesity, overweight and BMI) into 1 csv file
* Connected countries to countrycodes for csv file
* Put overweight, obesity and BMI data in 1 dictionary
* Created javascript, css and html files

### Difficulties
* Proper JSON format - fillKeys are 1 layer deeper than datamaps javascript file is used to

# day 5

Fri January 13

* GDP and population in JSON format
* Happiness in JSON format. First had to connect countries to countrycodes
* Presentation: not enough time so no real feedback
* All data put in JSON
* Worked on prototype
* Looping through keys in json to transform strings to floats for barcharts

* wanted to implement all elements in prototype, but didn't have time enought to implement the table
* still some trouble with my JSON format, hopefully monday there will be some help

### Difficulties / questions for monday
* Fillkeys for the worldmap
* keys as x axis, values as y axis or looping through countrycodes by barchart
* Barcharts appear in footer
* Width of the page

# day 6

Mon January 16

Tip from daily standup for json problem: create new dictionary in function in javascript to use for barchart.

Change of plans for JSON, wanted most efficient JSON but thats very difficult for worldmap so change of plan for JSON

"year": {"countrycode": {"country": .., "weight": [{"category": BMI, "fillKey": A}, 
													{"category": Overweight, "fillKey": A}, 
													{"category": Obesity, "fillKey": A}],
						"GDP": ..,
						"happiness": ..},
		{"countrycode": ...}},
"year": ... }}}

TO

"year": "BMI": 	{"countrycode": {"country": .., 
						"fillKey": ..,
						"GDP": ..,
						"happiness": ..},
				{"countrycode": ...}},
		"Obesity": 	{"countrycode": {"country": .., 
						"fillKey": ..,
						"GDP": ..,
						"happiness": ..},
					{"countrycode": ...}},

		"Overweight": 	{"countrycode": {"country": .., 
						"fillKey": ..,
						"GDP": ..,
						"happiness": ..},
					{"countrycode": ...}},

* Created sorted barcharts
* colored world map

### Tomorrow
* connect barchart and world map
* add interactivity world map and barchart

### Tips from daily stand up

* w3 schools how to javascript filter table
* bootstrap rows and colums, altijd 12 breed
* verschillende files in html inladen

# day 7

Tue January 17

* difficulties connecting button and dropdown choices

* student helped me: make global variable 'current_year' and 'current_category' and update these when clicked on button or dropdown, still not working

* again adjusted json to ease interactivity later on (other student told me), added countrycode to deepest layer:

{"year": {"BMI": 	{"countrycode": {"country": ..,
								"countrycode": .., 
								"fillKey": ..,
								"GDP": ..,
								"happiness": ..},
				{"countrycode": ...}},
		"Obesity": 	{"countrycode": {"country": ..,
									"countrycode": .., 
									"fillKey": ..,
									"GDP": ..,
									"happiness": ..},
					{"countrycode": ...}},

		"Overweight": 	{"countrycode": {"country": ..,
										"countrycode": .., 
										"fillKey": ..,
										"GDP": ..,
										"happiness": ..},
					{"countrycode": ...}}},
"year": ...}

* added table, source: http://bl.ocks.org/gka/17ee676dc59aa752b4e6. Needed to add scrollbar to table, but no I want the headers to stay on the screen all the time, this still needs to be fixed.

Wed January 18

* connect button with dropwdown menu

* added search bar to the table

* sorting table is added, still buggy because if you sort on two different categories, the second time you want to sort a different column you have to click twice on the header to get the column properly sorted. Also, unknown is still randomly distributed over the column. Lastly, only the numerical values are properly sorted, the alphabetical still go wrong.

* To connect the countrycodes when hovered over a row in the table to the barchart i had to change the dictionary created in the function for the drawing the barcharts. 

* Idea from Tim, add specific value to bars in barchart. Connect these bars with the rows in the table. I will try this tomorrow.

Thu January 19

* Connected rows from table with bars in barchart. Adding a value didn't work, so I added the countrycode as the specific id per bar. On mouseover I selected this specific bar and changed te color. On mouseout I changed the color back to the original color.

* 11-12h Dentist appointment

*  Problems connecting all the elements. If I connect the countries in the map to the bars in the barchart, my pop for the worldmap disapears. Very strange. Have to change popupTemplate function in datamaps, instead of writing own function for on mouseover/mouseout, because then the popupTemplate is overwritten and not displayed anymore. Tim helped me with this. (google: change on mouseout popupTemplate datamaps)

* Source to rank countries in table on obesity/overweight/bmi ~ http://stackoverflow.com/questions/27479750/getting-top-10-values-in-a-json-file

* 13-17h obligatory student assistent training


To do's today
* sort table on click, also append ranking
* connect country to barchart

Fri January 20

* appended ranking to table. Only appended in the table, because there it's only relevant.

* Still having problems with my colors and hovering. At the moment the color won't change back once you have hovered over it. Also my popup stays on the screen although my mouse is not on the map anymore. I have to check out the popupTemplate function in the datamaps. 

* appended legend to worldmap. Problem how I am gonna display my legend, because for every category there are different groups. Problem for monday.

Styleday to do's
* Colors
* Style table
* Bar chart axes (tickFormat)
* Sources and names
* Title
* Worldmap legend
* seperate files
* add daily standups (report) to my github

* Florinde: favicon ~ http://stackoverflow.com/questions/4888377/how-to-add-a-browser-tab-icon-favicon-for-a-website

Mon Jan 23

* daily standup: maak eerst alle bars blauw bij hover

* Search bar doesn't work anymore.. And still hovering over is not fixed when trying to connect all elements. So stupid, I added ranking so the search index went from 0 to 1.

* I already spent two days on the popupTemplate function, customizing this. This doesn't work, Sascha also doesn't know how to help me, so I'm gonna try to write my own popupTemplate function and not use this one from datamaps anymore. Did not succeed to do this. Maybe step away from the hovering idea, and use this functions on click. 

* In order to highlight table rows when hovering over the map/barcharts, I had to add an id to every row in the table. Then I change the color from the row of the selected country. Only fixed it for the barchart so far. 
Need to figure out how to select the specific row, so the table will show that row.

VRAGEN
* Coloring the bars from world map
* Selecting the row from world map/ bar chart
* Main en functions of main en allemaal aparte files met functies? ~ Allemaal aparte bestanden met functies erin

Tue Jan 24

Daily standup ~ automatic scroll function: https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2

How to scroll table to particular tr

* Created different legends for different categories, had nothing to change for this feature. 
* When sorting the function, want to add a very small value to the rows with no data in order to gather them and put them on the bottom of the table. However, this only works when I click a couple of times on the sort buttons. 

* Started on building bigger dataset, maybe easer to see trends. Happiness is from 2008 - 2014
** First adjusted BMI csv - take average from men/women and add countrycode


Wed Jan 25

* Daily standup: tekst erbij om het verhaal te vertellen

* 25 min: table sort
* 25 min: table sort
* 25 min: table sort - problems with no data points
* 25 min: try to make own popup template using datamaps 


* Added new sort function, old function wasn't working properly. Check if value is a number, sort these, else change letter to uppercase in order to compare all letters in the string. Problem with the no data points. In some weird way, typeof(IsNaN) was 'number', so couldn't check if no data was a string, change this to the check if isNaN(someValue), changed that value to infinity in order to place the no data points in the table on the bottom when that specific column is sorted. However, in this way the alphabetical sort didn't work anymore, so I changed the structure of my function to a try/catch, and now it works!
Not working table sort: http://bl.ocks.org/AMDS/4a61497182b8fcb05906
Working sort: http://bl.ocks.org/biovisualize/1226718

* 25 min: fix table sort, popup template datamaps
* 25 min: popup template datamaps
* 25 min: popup template datamaps
* 25 min: popup template datamaps

* 25 min: popup template datamaps

* Fixed popup on hover on map, finally! Source: http://bl.ocks.org/lhoworko/7753a11efc189a936371. Only problem are the countries where the id in datamaps is '#-99', have to fix that tomorrow.

Thu Jan 26

# TO DO
* Wed: Fix interactivity ~ countries without countrycode
* Wed: Adjust JSON file for 2008-2014 for overweight, obesitas, BMI, GDP and happiness
* Thur: Timeslider



* Changed the country ID's of -99 in my worldmap.min.js file from -99 tot A-99. No errors anymore, now I only have to add that the color of the country changes back once hovered over. Only problem is somaliland, gonna ask the tutors. Fixed the problem by giving all the countries their own ID. (Kosovo, Somaliland, Nothern Cyprus)

* Popup when hovering over barchart has the same problem as the worldmap. Cannot use the function d3-tip, so I have to create my own tooltip just as I did with the worldmap.

* 25 min: fix country ID's -99
* 25 min: hover bar chart
* 25 min: hover bar chart
* 25 min: onclick -> go to table - FAILED

Daily standup: 
* Change ID for countries in worldmap.min.js: countries u don't use ~ AAA, other countries check country code.
* When clicked on button, make button grey. 

Change of plans. Currently I have 2 barcharts, but I'm gonna change this to 1 barchart and 1 scatterplot.
Source: https://jsfiddle.net/eamonnmag/Q567s/

* 25 min: scatterplot
* 25 min: scatterplot
* 25 min: scatterplot

I fixed the scatterplot, however the interactivity is not working on this plot yet.

Fri Jan 27

* Fixed the scatterplot, however the popup pops up on a very weird place. Also, the circles are so small that it is not noticable which dot colors yellow when you hover over it. Super easy, because I already did all those things before for other visualizations. 

* First I had 1 button group for both the barchart and the scatterplot, but then it was not possible to resemble gdp with happiness and vice versa in these two graphs. So Florinde said to me make 2 button groups,  one for the visualizations each. So I fixed this, now I have 1 dropdown and 1 buttongroup for the worldmap, and also one buttongroup for the barchart and the scatterplot eacht.

TO DO:
* Fix tableheaders, always display them even when using the scrollbar
* Change colors scatterplot
* On click, scroll to row in table
* Change the colors of the buttons ~ http://stackoverflow.com/questions/10939082/d3-javascript-alternate-colors-on-click

* Change colors of the buttons - Didn't work, couldn't fix that the color stays the same if you push on a button of an other visualization than the previous one.

Mon Jan 30

25 min: button
25 min: hover scatter 	
25 min: button
25 min: button - didn't work

25 min: questions Tim: popup on scatterplot ~ problem is the mouse(this), takes mousecoordinates of dots
						no data points scatter: remove them from dictionary
						Button: value 0 or 1
25 min: fixed the popup on hover of the scatterplot, and the no data points.

No data points in scatter: removed countries with no information about the GDP/Happiness from the dictionary used for the scatterplot. Otherwise you get very weird points in the top-left corner of the scatterplot. 

Popup on scatter: Placed the tooltip on the bottomright corner of the scatterplot. If I have time left, I will change this.

Button: fixed the button problem, changed the id's and values of the buttons. The value is now either 0 or 1. And the id is # + map/bar/scatter + 0/1. The only thing I need to fix is the default color.

Tue Jan 31

* Fixed the buttons
* Split all the files
* Fixed variableNames and functionNames
* Added sources and axes labels

To Do:
* transitions
* pop up scatterplot
* text info
* Report
* Daily standup pictures
* order repository
* tooltip

Wed Feb 1
Help, year buttons don't work anymore. Fixed! I changed all the variable names, but forgot this one. 

Wrote a function for my tooltip, however is you change the category it is still not working. Put code through bettercodehub. Before my improvement of seperate functions and files, I received a 4. After I received a 6. After another cleaning round I got a 7.

Tooltip still needs to be fixed when clicked on button in barchart.

Started with report
Checked code on better code hub

Thu Feb 2

* Report Report Report Report Report Report Report Report Report 