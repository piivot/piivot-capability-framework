/*

function drawAnnotations() {
    var data = google.visualization.arrayToDataTable([
      ['City', '2010 Population', '2000 Population'],
      ['New York City, NY', 8175000, 8008000],
      ['Los Angeles, CA', 3792000, 3694000],
      ['Chicago, IL', 2695000, 2896000],
      ['Houston, TX', 2099000, 1953000],
      ['Philadelphia, PA', 1526000, 1517000]
    ]);

    var data = google.visualization.arrayToDataTable([
      ['City', '2010 Population', {type: 'string', role: 'annotation'},
       '2000 Population', {type: 'string', role: 'annotation'}],
      ['Organizational', 40, 'Your capability', 100, 'Ideal'],
      ['Los Angeles, CA', 3792000, '3.8M', 3694000, '3.7M'],
      ['Chicago, IL', 2695000, '2.7M', 2896000, '2.9M'],
      ['Houston, TX', 2099000, '2.1M', 1953000, '2.0M'],
      ['Philadelphia, PA', 1526000, '1.5M', 1517000, '1.5M']
    ]);

    var options = {
      title: 'Population of Largest U.S. Cities',
      chartArea: {width: '50%'},
      isStacked: 'percent',
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 12,
          auraColor: 'none',
          color: '#555'
        },
        boxStyle: {
          stroke: '#ccc',
          strokeWidth: 1,
          gradient: {
            color1: '#f3e5f5',
            color2: '#f3e5f5',
            x1: '0%', y1: '0%',
            x2: '100%', y2: '100%'
          }
        }
      },
      hAxis: {
        title: 'Total Population',
        minValue: 0
      },
      vAxis: {
        title: 'City'
      }
    };
    var chart = new google.visualization.BarChart(document.getElementById('chartarea'));
    chart.draw(data, options);
  }
*/


/*
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',    
    data: {
        //labels: ["Organizational", "Operational", "Governance", "Platform Selection", "Identity and Access Management", "Network Elasticity", "Security Adherance", "Data Management"],
        datasets: [{
            label: 'Your Capability',
            data: [ 1, 1, 1, 1, 1, 1, 1, 1
                //{ x: 1, y: 100 }, { x: 20, y: 100 }                                
            ],
            backgroundColor: 'black',            
            pointBackgroundColor:["black"],
            borderWidth: 1,
            pointRadius: 10,
            datalabels: {
                color: 'white',
                display: function(context) {
                    return context.dataset.data[context.dataIndex] > 20;
                },
                font: {
                    weight: 'bold'
                },
                formatter: function(value, context) {
                    return Math.round(value) + '%';
                }
            }
        },
        {
            label: 'Ideal Capability',
            data: [100, 100, 100, 100, 100, 100, 100, 100
                //{ x: 13, y: 15 }, { x: 20, y: 100 }                
            ],
            backgroundColor: '#f69320',            
            pointBackgroundColor:["#f69320"],
            borderWidth: 1,
            pointRadius: 10,
            datalabels: {
                color: 'white',
                display: function(context) {
                    return context.dataset.data[context.dataIndex] < 80;
                },
                font: {
                    weight: 'bold'
                },
                formatter: function(value, context) {
                    return value + '--';
                }
            }                
        }        
        ]
    },
    options: {
        showLines: false,        
        scales: {
            yAxes: [{
                stacked: true,
                ticks: { min: 0, max: 100}
            }],
            xAxes: [{
                //stacked: true,
                ticks: { min: 0, max: 100}
            }]
        }
    }
});
*/
