/*
Programmeerproject
project.js

Name: Lotte Slim
Number: 10654976

*/

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 960 - margin.right - margin.left, 
    height = 450 - margin.top - margin.bottom; 


d3.json("data.json", function(error, data) {
  if (error) throw error;

  // select proper year
  data_map = data;
  console.log(data_map)

  var map = new Datamap({element: document.getElementById('container1'),

    scope: 'world',
    geographyConfig: {
      borderColor: 'rgba(255,255,255,0.3)',
      highlightBorderColor: 'rgba(0,0,0,0.5)',
      highlightOnHover: true,
      popupOnHover: true,
      highlightFillColor: 'fills',
      highlightFillOpacity: 0.4,

    //   // content pop-up on hovering
    //   popupTemplate: function(geo, data) {
    //     if (data) {
    //       if (data.total == "..") {
    //         return ['<div class="hoverinfo">',
    //                 '<strong>' + geo.properties.name + '</strong><br/>',
    //                 'Population: <i>Unknown</i>',
    //                 '</div>'].join(''); 
    //       }
    //       return ['<div class="hoverinfo">',
    //               '<strong>' + geo.properties.name + '</strong><br/>',
    //               'Population: ' + data.total,
    //               '</div>'].join('');
    //     }
    //     return ['<div class="hoverinfo">',
    //             '<strong>' + geo.properties.name + '</strong><br/>',
    //             'Population: <i>Unknown</i>',
    //             '</div>'].join('');       
    //   }
    // },

      // colors for different categories
      fills: {
        A:     '#deebf7',
        B:     '#9ecae1',
        C:     '#4292c6',
        D:     '#2171b5',
        E:     '#08519c', 
        F:     '#08306b',
        defaultFill: '#bdbdbd' ,
      },

      // data to display on worldmap
      data: data_map,

      // // respond to choice of year by viewer
      // done: function(datamap) {
      //   datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      //     d3.selectAll(".arc").remove()
      //     d3.selectAll(".piechartsubtitle").remove()
      //     d3.selectAll(".rem").remove()
      //     countrycode = geography.id;
      //     country = geography.properties.name
      //     draw_piechart(data_map, country, countrycode, year);
      //     });
      }
  });

  // // legend of the world map
  // map.legend({
  //   legendTitle: 'Population Size per Country for different Years',
  //   defaultFillName: 'No Data',
  //   labels: {
  //     A: '< 100.000',
  //     B: '< 1.000.000', 
  //     C: '< 10.000.000',
  //     D: '< 100.000.000',
  //     E: '< 1.000.000.000',
  //     F: '1.000.000.000+'
  //   }

  // });



});


