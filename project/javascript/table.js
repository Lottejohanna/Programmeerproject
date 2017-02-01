/*
Programmeerproject
table.js

Name: Lotte Slim
Number: 10654976
*/
function drawTable(data, year, category, variable) {

  prepareData(data, year, category, 'number', 'yes');

  var columns = [
    { head: '#', cl: 'ranking', html: function(d) { return d.ranking }, countrycode: function(d) {return d.countrycode }},
    { head: 'Country', cl: 'country', html: function(d) { return d.country }, countrycode: function(d) { return d.countrycode }},
    { head: category, cl: 'number', html: function(d) { if (isNaN(d.number)) {
                                                          return "No Data"; }
                                                        return d.number }, countrycode: function(d) { return d.countrycode }},
    { head: 'GDP', cl: 'GDP', html: function(d) { if (isNaN(d.GDP.toFixed(2))) {
                                                    return "No Data";
                                                  } 
                                                  return '\u0024' + d.GDP.toFixed(2) }, countrycode: function(d) { return d.countrycode }},
    { head: 'Happiness', cl: "Happiness", html: function(d) { if (isNaN(d.Happiness.toFixed(2))) {
                                                                return "No Data";
                                                              } 
                                                              return d.Happiness.toFixed(2) }, countrycode: function(d) { return d.countrycode }}
  ];

  // create table
  var sortAscending = true;
  var table = d3.select("#container4").append("table")

  table.attr("id", "myTable")
    .attr('class', 'table table-hover rem');

  // create table header
  var headers = table.append('thead').append('tr')
                        .selectAll('th')
                        .data(columns).enter()
                        .append('th')
                        .attr('class', function(d) { return d.cl; })
                        .text(function(d) {return d.head; })
                        // sort rows on click in table
                        .on('click', function(d) {
                          rows.sort(function (a, b) { return a == null || b == null ? 0 : valueCompare(a[d.cl], b[d.cl]); })
                        })
                        // .on('click', function(d) {
                        //   headers.attr('class', 'header');

                        //   // add secret value to countries without data
                        //   if (sortAscending) {
                        //     rows.sort(function(a, b) { if (isNaN(a[d.cl]) || isNaN(b[d.cl]))   { return -10000000 ; } 
                        //                                   console.log(b[d.cl] - a[d.cl]); return b[d.cl] - a[d.cl]; });
                        //     sortAscending = false;
                        //     this.className = 'aes';
                        //   } else {
                        //     rows.sort(function(a, b) { if (isNaN(a[d.cl]) || isNaN(b[d.cl]))   { return -10000000 ; } 
                        //                                   console.log(a[d.cl] - b[d.cl]); return a[d.cl] - b[d.cl]; });
                        //     sortAscending = true;
                        //     this.className = 'des';
                        //   }
                        // });

  // create table body
  var rows = table.append('tbody')
                .selectAll('tr')
                .data(dict).enter()
                .append('tr')
                .attr("id", function(d) { return d.countrycode; });
                

  rows.selectAll('td')
    .data(function(row, i) {
        return columns.map(function(c) {
            // compute cell values for this specific row
            var cell = {};
            d3.keys(c).forEach(function(k) {
                cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
            });
            return cell;
        });
    }).enter()
    .append('td')
    .html(function(d) {return d.html })
    .attr('class', function(d) {return d.cl})
    .on('mouseover', function(d) {
      mouseOver(d, data, "countrycode", 'table', variable, category);
    })
    .on('mouseout', function(d) {
      mouseOut(d, "countrycode");
    });
}

function valueCompare(a, b) {
    try {
      a = a.toLowerCase();
      b = b.toLowerCase();
      return a > b ? 1 : a == b ? 0 : -1;
    }

    catch(TypeError) {
      if (isNaN(a)) {
        a = Infinity;
      }

      else if (isNaN(b)) {
        b = Infinity;
      }

      return a > b ? 1 : a == b ? 0 : -1;
    }
}

function searchFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}