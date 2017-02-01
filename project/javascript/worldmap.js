/*
Programmeerproject
worldmap.js

Name: Lotte Slim
Number: 10654976
*/
function drawWorldmap(data, year, category, variable) {

// select proper year and category
  data = data[year][category];

  addTooltip('#container1');

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

            // change color when mouseover
            // mouseOver(d, "id");

            mouseOver(d, data, 'id', 'map', 100, 550, variable, category);

            // display tooltip when mouseover
            // var mouse = d3.mouse(this);
            // var mouse = [d3.event.pageX, d3.event.pageY];
            // console.log('map', mouse);
            // tooltip.classed('hidden', false)
            //     .attr('style', 'left:' + (mouse[0] - 100) +
            //             'px; top:' + (mouse[1] - 550) + 'px')
            //     .html(function() {
                  
            //       if (data[d.id]) {
            //         return "<strong>Country:</strong> <span>" + d.properties.name + "</span> <br/> <strong>" 
            //           + category + ":</strong> <span>" + data[d.id].number + "</span>";
            //       }
            //       return "<strong>Country:</strong> <span>" + d.properties.name + "</span> <br/> <strong>" 
            //         + category + ":</strong> <span> <i>No Data</i> </span>";
            //     })
        })
        .on('mouseout', function(d) {
            // change color when mouseout
            mouseOut(d, "id");

            // hide tooltip when mouseout
            // tooltip.classed('hidden', true);
        });
    },

    // data to display on worldmap
    data: data    
  });
 
  // legend of the worldmap
  drawLegend(category);

  // source of the worldmap
  sourceVis('#container1', "http://databank.worldbank.org/data", "World Databank"); 
}

function drawLegend(category) {
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