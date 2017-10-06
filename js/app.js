var overallScore = [];

$(".piivot-question").on("change", function(){
    Pizza.init();
    let sectionId = $(this).attr('piivot-section');
    let capabilityId = $(this).attr('piivot-capability');
    let questionId = $(this).attr('id')
    let contentHolder = "#" + $(this).attr('piivot-question-content');
    let score = $(this).val();

    if (score == null)
    {
        score = $(this).attr('data-value');
    }

    let section = $.grep(frameworkInfo.sections, function(s) { return s.id == sectionId;});
    let capability = $.grep(section[0].capabilities, function(c) { return c.id == capabilityId;});
    let mainQuestion = $.grep(capability[0].questions, function(e) {return e.id == questionId;});
    let mainQuestionComparisonScore = mainQuestion[0].comparisonScore;
    let mainQuestionContent = $.grep(mainQuestion[0].scores, function(e) {return e.value == score;});

    $(contentHolder).text(mainQuestionContent[0].description);    

    updateScore(questionId,score,mainQuestionComparisonScore);

    /*$('#graphinfoyourcapability').attr('data-y',y);
    $('#graphinfoyourcapability').attr('data-x',x);    
    
    setTimeout(
        function() 
        {
            Pizza.init('#my-cool-line-graph');
        }, 10000);*/
});

$('.piivot-slider').slider();

$('.piivot-slider').on("slide", function(slideevt) {
	$('#ex4SliderVal').text(slideevt.value);
});

$('#ORC-CL1-05').slider({
    ticks: [1,2,3,4,5],
    ticks_labels: ['1', '2', '3', '4', '5'],
    ticks_snap_bounds: 30
});

function updateScore(id,score,comparisonScore)
{
    let currentQuestion = $.grep(overallScore, function(s) { return s.id == id;});
    
    if (currentQuestion != null && currentQuestion.length > 0)
    {
        currentQuestion[0].score = score * comparisonScore;
    }
    else
    {
        let newscore = {};
        newscore.id = id;
        newscore.score = score * comparisonScore;
        overallScore.push(newscore);
    }

    let chartScore = 0.0;
    $.each(overallScore, function(){
        chartScore += this.score;
    })

    if (chartScore > 20) chartScore = 20;

    myChart.data.datasets[0].data[0].x = chartScore;
    myChart.data.datasets[0].data[0].y = chartScore;
    myChart.update();

}

//Pizza.init();

//$(document).foundation();


/*$('input[type="range"]').on('input', function() {
    
    var control = $(this),
    controlMin = control.attr('min'),
    controlMax = control.attr('max'),
    controlVal = control.val(),
    controlThumbWidth = control.data('thumbwidth');

    var range = controlMax - controlMin;
    
    var position = ((controlVal - controlMin) / range) * 100;
    var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
    var output = control.next('output');
    
    output
    .css('left', 'calc(' + position + '% - ' + positionOffset + 'px)')
    .text(controlVal);

});*/