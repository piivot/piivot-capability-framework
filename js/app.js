var overallScore = [];

var sections = [];
var questions = [];

loadSections();

function loadSections()
{
    $.ajax({
        url: "js/sections.json",
        async: true,
        dataType: 'json',
        success: function(data) {
            sections = data.sections;
            loadQuestions();
        }
    });
}

function loadQuestions()
{
    $.ajax({
        url: "js/questions.json",
        async: true,
        dataType: 'json',
        success: function(data) {
            questions = data.questions;
            loadQuestionContent();
        }
    });
}

function loadQuestionContent()
{
    $('#piivotTab').html('');
    $('#piivotTabContent').html('');

    let count = 0;

    $.each(sections, function() {
        let section = $(this)[0];
        let shortName = section.shortName;
        let sectionId = section.id;

        /****** Update tab content *************************/

        let tabAClass = 'nav-link text-capitalize';

        if (count == 0)
        {
            tabAClass += ' active';
        }

        let tabContent = '';
        tabContent += '<li class="nav-item">';
        tabContent += '<a class="' + tabAClass + '" id="' + shortName + '-tab" data-toggle="tab" href="#' + shortName + '" role="tab" aria-controls="' + shortName + '" aria-expanded="true">' + shortName + '</a></li>';

        $('#piivotTab').append(tabContent);


        /************ Update question content *****************/

        let questionsArray = [];
        $.each(section.questions, function() { questionsArray.push( $(this)[0].id); });

        let questionsSection = $.grep(questions, function(q) { return questionsArray.indexOf(q.id) > -1;  });

        let htmlContent = '';
        
        htmlContent += '<div class="tab-pane fade show active" id="' + shortName + '" role="tabpanel" aria-labelledby="' + shortName + '-tab" piivot-section="' + sectionId + '">';

        $.each(questionsSection, function() {
            let q = $(this)[0];                
            htmlContent += '<div class="bd-example py-1">';
            htmlContent += '<div class="row bg-white">';
            htmlContent += '<div class="input-group">';
            htmlContent += '<div class="col-md-8">';
            htmlContent += '<p class="form-control-plaintext flex-wrap">' + q.title + '</p>';
            htmlContent += '</div>';
            htmlContent += '<div class="col-md-4">';
            htmlContent += '<input class="piivot-question piivot-slider" id="' + q.id + '" piivot-question-id="' + q.id + '" piivot-question-content="' + q.id + '-CONTENT" piivot-section="' + sectionId + '" piivot-capability="' + q.capabilityLevel + '" data-slider-id="' + q.id + '-Slider" type="text" data-slider-ticks-snap-bounds="30" data-slider-tooltip="hide" data-slider-value="1" />' 
            htmlContent += '</div>'; 
            htmlContent += '</div>';
            htmlContent += '</div>';
            htmlContent += '<div class="row bg-white">';
            htmlContent += '<p id="' + q.id + '-CONTENT" class="font-weight-bold form-control-plaintext col-12 small flex-wrap">Move slider to view the score definitions</p>';
            htmlContent += '</div>'
            htmlContent += '</div>'                
        });

        htmlContent += "</div>";

        $('#piivotTabContent').append(htmlContent);
        
        count++;
    });

    

    $('.piivot-slider').slider({
        ticks: [1,2,3,4,5],
        ticks_labels: ['1', '2', '3', '4', '5'],
        ticks_snap_bounds: 30
    });

    $('.piivot-slider').on("slide", function(slideevt) {
        let contentHolder = $(this).attr()
        $('#ex4SliderVal').text(slideevt.value);
    });

    $(".piivot-question").on("change", function(){
        
        let sectionId = $(this).attr('piivot-section');
        let capabilityId = $(this).attr('piivot-capability');
        let questionId = $(this).attr('id')
        let contentHolder = "#" + $(this).attr('piivot-question-content');
        let score = $(this).val();
    
        if (score == null)
        {
            score = $(this).attr('data-value');
        }
    
        let mainQuestion = $.grep(questions, function(e) {return e.id == questionId;});
        let mainQuestionComparisonScore = mainQuestion[0].comparisonScore;
        let mainQuestionContent = $.grep(mainQuestion[0].scores, function(e) {return e.value == score;});
    
        $(contentHolder).text(mainQuestionContent[0].description);    
    
        updateScore(questionId,score,mainQuestionComparisonScore);    
    });

    
}

/*$(".piivot-question").on("change", function(){
    
    let sectionId = $(this).attr('piivot-section');
    let capabilityId = $(this).attr('piivot-capability');
    let questionId = $(this).attr('id')
    let contentHolder = "#" + $(this).attr('piivot-question-content');
    let score = $(this).val();

    if (score == null)
    {
        score = $(this).attr('data-value');
    }

    let mainQuestion = $.grep(questions, function(e) {return e.id == questionId;});
    console.log(mainQuestion);

    //let section = $.grep(frameworkInfo.sections, function(s) { return s.id == sectionId;});
    //let capability = $.grep(section[0].capabilities, function(c) { return c.id == capabilityId;});
    let mainQuestionComparisonScore = mainQuestion[0].comparisonScore;
    let mainQuestionContent = $.grep(mainQuestion[0].scores, function(e) {return e.value == score;});

    $(contentHolder).text(mainQuestionContent[0].description);    

    updateScore(questionId,score,mainQuestionComparisonScore);    
});

$('.piivot-slider').slider();

$('.piivot-slider').on("slide", function(slideevt) {
	$('#ex4SliderVal').text(slideevt.value);
});

$('#ORC-CL1-05').slider({
    ticks: [1,2,3,4,5],
    ticks_labels: ['1', '2', '3', '4', '5'],
    ticks_snap_bounds: 30
});*/

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