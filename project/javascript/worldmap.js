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
            mouseOver(d, data, 'id', 'map', variable, category);
        })
        .on('mouseout', function(d) {
            // change color when mouseout
            mouseOut(d, "id");
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