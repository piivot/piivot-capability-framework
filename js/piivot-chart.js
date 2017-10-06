var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        labels: ["Your Capability", "Ideal Capability"],
        datasets: [{
            label: 'Your Capability',
            data: [
                { x: 1, y: 1 }                                
            ],
            backgroundColor: [
                'black'                
            ],            
            pointBackgroundColor:["black"],
            borderWidth: 1,
            pointRadius: 10
        },
        {
            label: 'Ideal Capability',
            data: [
                { x: 13, y: 15 }                
            ],
            backgroundColor: [
                '#f69320'                
            ],            
            pointBackgroundColor:["#f69320"],
            borderWidth: 1,
            pointRadius: 10
        }
        ]
    },
    options: {
        showLines: false,
        scales: {
            yAxes: [{
                stacked: true,
                ticks: { min: 0, max: 20}
            }],
            xAxes: [{
                stacked: true,
                ticks: { min: 0, max: 20}
            }]
        }
    }
});

