/*
Programmeerproject
worldmap.js

Name: Lotte Slim
Number: 10654976
*/
function drawWorldmap(data, year, category, variable) {

    /* 
    This function draws the barchart.

    data: the data displayed in the barchart
    year: the selected year
    variable: GDP or Happiness
    category: Obesity, Overweight or BMI
    */

    // select proper year and category
    data = data[year][category];

    // add tooltip to selected container
    addTooltip('#container1', 'map');

    map = new Datamap({element: document.getElementById('container1'),

        scope: 'world',
        geographyConfig: {
            borderColor: 'rgba(255,255,255,0.3)'
        },

        // colors for different categories
        fills: {
            A:     '#deebf7',
            B:     '#9ecae1',
            C:     '#4292c6',
            D:     '#2171b5',
            E:     '#08519c', 
            defaultFill: '#bdbdbd' 
        },

        done: function(datamap, geography) {
            datamap.svg.selectAll('.datamaps-subunit')
                .on('mouseover', function(d) {
                    mouseOver(d, 'id', 'map');

                    // show tooltip on worldmap
                    tooltip = d3.select('#tooltip' + 'map');
                    var mouse = d3.mouse(this);
                    tooltip.classed('hidden', false)
                        .attr('style', 'left:' + (mouse[0] + 15) +
                                'px; top:' + (mouse[1] - 35) + 'px')
                        .html(function() {
                            // tooltip if there is data
                            if (data[d.id]) {
                                return '<strong>Country:</strong> <span>' + d.properties.name + '</span> <br/> <strong>' 
                                + category + ':</strong> <span>' + data[d.id].number + '</span>';
                            }
                            // tooltip for na data
                            return '<strong>Country:</strong> <span>' + d.properties.name + '</span> <br/> <strong>' 
                            + category + ':</strong> <span> <i>No Data</i> </span>';
                        })
                })
                .on('mouseout', function(d) {
                    mouseOut(d);
                });
        },

        // data to display on worldmap
        data: data    
    });
   
    // legend of the worldmap
    drawLegend(category);

    // source of the worldmap
    sourceVis('#container1', 'http://www.who.int/gho/ncd/risk_factors/overweight/en/', 'World Health Organization'); 
}

function drawLegend(category) {
    /*
    This function creates the legend for the worldmap.

    category: Obesity, Overweight or BMI
    */

    // BMI
    if (category == 'BMI') {
        map.legend({
            legendTitle: 'Mean Body Mass Index (BMI), ages 18+, in the World',
            defaultFillName: 'No Data',
            labels: {
                A: '< 22.5',
                B: '22.5 - 25', 
                C: '25 - 27.5',
                D: '27.5 - 30',
                E: '> 30'
            }
        });
    }
    // Overweight or Obesity
    else {
        map.legend({
            legendTitle: 'Percentage of ' + category + ', ages 18+, in the World',
            defaultFillName: 'No Data',
            labels: {
                A: '< 20',
                B: '20 - 40', 
                C: '40 - 60',
                D: '60 - 80',
                E: '80 - 100'
            }
        });
    }
}