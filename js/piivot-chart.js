var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',    
    data: {
        labels: ["Organizational", "Operational", "Governance", "Platform Selection", "Identity and Access Management", "Network Elasticity", "Security Adherance", "Data Management"],
        datasets: [{
            label: 'Your Capability',
            data: [ 1, 1, 1, 1, 1, 1, 1, 1
                //{ x: 1, y: 100 }, { x: 20, y: 100 }                                
            ],
            backgroundColor: 'black' /* [
                'black'                
            ]*/,            
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
            backgroundColor: '#f69320' /* [
                '#f69320'                
            ]*/,            
            pointBackgroundColor:["#f69320"],
            borderWidth: 1,
            pointRadius: 10,
            datalabels: {
                display: false
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

