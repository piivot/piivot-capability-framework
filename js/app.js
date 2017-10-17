var overallScore = [];

var sections = [];
var products = [];
var questions = [];

var selectedProduct = "o365";

loadProducts();


function loadProducts()
{
    $.ajax({
        url: "js/products.json",
        async: true,
        dataType: 'json',
        success: function(data) {
            products = data.products;            
            loadSections();
        }
    });
}

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
        let sectionOrder = section.order;

        /****** Update tab content *************************/

        let tabAClass = 'nav-link text-capitalize';
        let ariaExpanded = 'false';
        let tabShow = 'tab-pane fade';

        if (count == 0)
        {
            tabAClass += ' active';
            ariaExpanded = 'true';
            tabShow += ' active show';
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
        
        htmlContent += '<div class="' + tabShow + '" id="' + shortName + '" role="tabpanel" aria-labelledby="' + shortName + '-tab" piivot-section="' + sectionId + '" piivot-section-order="' + sectionOrder + '" aria-expanded="' + ariaExpanded + '">';

        $.each(questionsSection, function() {
            let q = $(this)[0];                
            htmlContent += '<div class="bd-example py-1">';
            htmlContent += '<div class="row bg-white">';
            htmlContent += '<div class="input-group">';
            htmlContent += '<div class="col-md-8">';
            htmlContent += '<p class="form-control-plaintext flex-wrap">' + q.questionText + '</p>';
            htmlContent += '</div>';
            htmlContent += '<div class="col-md-4">';
            htmlContent += '<select class="piivot-question custom-select mb-4 mr-sm-4 mb-sm-0" id="' + q.id + '" piivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-section-order="' + sectionOrder + '">';
            htmlContent += '<option value="0">Choose...</option>';

            $.each(q.options, function() {
                let o = $(this)[0];
                htmlContent += '<option value="' + o.id + '">' + o.optionText + '</option>';
            });

            htmlContent += '</select>';
            //htmlContent += '<input class="piivot-question piivot-slider" id="' + q.id + '" piivot-question-id="' + q.id + '" piivot-question-content="' + q.id + '-CONTENT" piivot-section="' + sectionId + '" piivot-capability="' + q.capabilityLevel + '" data-slider-id="' + q.id + '-Slider" type="text" data-slider-ticks-snap-bounds="30" data-slider-tooltip="hide" data-slider-value="1" />' 
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

        let selection = $(this).val();

        let ml = 0;
        let cl = 2.5

        /*if (score == null)
        {
            score = $(this).attr('data-value');
        }*/

        let mainQuestion = $.grep(questions, function(e) {return e.id == questionId;});        

        if (selection != "0")
        {    
            let selectedOption = $.grep(mainQuestion[0].options, function(o) {return o.id == selection});
            ml = selectedOption[0].ml;
        }
        else
        {
            ml = 0;
        }

        let maxML = mainQuestion[0].maxML;
        let maxCL = mainQuestion[0].maxCL;
        
        //let mainQuestionComparisonScore = mainQuestion[0].comparisonScore;
        //let mainQuestionContent = $.grep(mainQuestion[0].scores, function(e) {return e.value == score;});
    
        //$(contentHolder).text(mainQuestionContent[0].description);    
    
        addScoreToArray(questionId,ml,cl,maxML,maxCL);
            
    });

    
}

function addScoreToArray(id,ml,cl,maxML,maxCL)
{
    let currentQuestion = $.grep(overallScore, function(s) { return s.id == id;});
    
    if (currentQuestion != null && currentQuestion.length > 0)
    {
        currentQuestion[0].score = ml > 0 ? ml - (cl / maxCL) : 0;
    }
    else
    {
        let newscore = {};
        newscore.id = id;
        newscore.score = ml > 0 ? ml - (cl / maxCL) : 0;
        overallScore.push(newscore);
    }

    updateChart();
}

function updateChart()
{
    $.each(sections, function() {
        let thisSection = $(this)[0];
        
        let order = thisSection.order;
        
        let calculatedML = 0;
        //let totalML = 0;

        let totalSectionQuestions = thisSection.questions.length;

        let targetProduct = $.grep(products, function(p) { return p.id == selectedProduct;});
        let targetSection = $.grep(targetProduct[0].targetScores, function(t) { return t.id == thisSection.id;});
        let targetScore = targetSection[0].targetScore;



        $.each(thisSection.questions, function() {
            let q = $(this)[0];
            
            //let thisQuestion = $.grep(questions, function(s) { return s.id == q.id;});
            
            //totalML += thisQuestion[0].maxML;

            let calculatedQuestion = $.grep(overallScore, function(s) { return s.id == q.id;});

            if (calculatedQuestion != null && calculatedQuestion.length > 0)
            {
                calculatedML += (calculatedQuestion[0].score / totalSectionQuestions);
            }

        });

        let calcPercentage = Math.round(calculatedML / targetScore * 100);
               
        myChart.data.datasets[0].data[order] = calcPercentage;
    });


    /*let currentQuestion = $.grep(overallScore, function(s) { return s.id == id;});
    
    if (currentQuestion != null && currentQuestion.length > 0)
    {
        currentQuestion[0].score = score / maxML;
    }
    else
    {
        let newscore = {};
        newscore.id = id;
        newscore.score = score / maxML;
        overallScore.push(newscore);
    }

    let chartScore = 0.0;
    $.each(overallScore, function(){
        chartScore += this.score;
    })*/

    //if (chartScore > 20) chartScore = 20;

    //chartScore = chartScore * 100;

    //myChart.data.datasets[0].data[0] = chartScore;
    //myChart.data.datasets[0].data[0].x = chartScore;
    //myChart.data.datasets[0].data[0].y = chartScore;
    myChart.update();

}