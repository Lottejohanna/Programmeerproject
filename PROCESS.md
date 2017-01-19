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

* difficulties connecting button and drowdown choices

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

* sorting table is added, still buggy because if you sort on two different categories, the second the you have to click twice on the header to get the column properly sorted. Also, unknown is still randomly distributed over the column. Lastly, only the numerical values are properly sorted, the alphabetical still go wrong.

* 


To do's today
* search bar table 
* sort table on click, also append ranking


Fri January 20

Styleday to do's
* Colors
* Style table
* Bar chart axes (tickFormat)
* Sources and names
* Title
* Worldmap legend
* seperate files


updateChloreplet -> 

if toggle
update_map


