var overallScore = [];

var sections = [];
var products = [];
var questions = [];

var selectedProduct = "IaaS";

var currentSection = '';
var currentSectionOrder = 0;


var chartOptions = {};
chartOptions = {
    title: 'Cloud Adoption Capability',
    annotations: {
  textStyle: {
        fontSize: 12,
        color: '#000',
        auraColor: 'none'
      }
    },
    isStacked: 'percent',
    height: 250,
    width: 650,
    orientation: 'vertical',
    chartArea: {
  left: 250,
      width: 350,
      height: 100
    },
    legend: {
  position: 'bottom'
    },
    hAxis: {
      title: 'Percentage',
      format: 'percent',
      minValue: 0
    },
    vAxis: {
      title: 'Capability Dimensions',
    }
  };

var finalChartOptions = {};
finalChartOptions = {
    title: 'Cloud Adoption Capability',
    annotations: {
textStyle: {
        fontSize: 12,
        color: '#000',
        auraColor: 'none'
    }
    },
    isStacked: 'percent',
    height: 525,
    width: 750,
    orientation: 'vertical',
    chartArea: {
left: 250,
    width: 600,
    height: 400
    },
    legend: {
position: 'bottom'
    },
    hAxis: {
    title: 'Percentage',
    format: 'percent',
    minValue: 0
    },
    vAxis: {
    title: 'Capability Dimensions',
    }
};
  


function resetChartAreaForNewSection() {
    
    let thisSection = sections[currentSectionOrder];
    
    let order = thisSection.order;
    
    let calculatedML = 0;
    
    let totalSectionQuestions = thisSection.questions.length;

    //calculate target product score
    let targetProduct = $.grep(products, function(p) { return p.id == selectedProduct;});
    let targetSection = $.grep(targetProduct[0].targetScores, function(t) { return t.id == thisSection.id;});
    let targetScore = targetSection[0].targetScore;    

    //calculate score for all the questions
    $.each(thisSection.questions, function() {
        let q = $(this)[0];
        
        let calculatedQuestion = $.grep(overallScore, function(s) { return s.id == q.id;});

        if (calculatedQuestion != null && calculatedQuestion.length > 0)
        {
            calculatedML += (calculatedQuestion[0].score / totalSectionQuestions);
        }        

    });

    //calculate values for chart
    let custValue = calculatedML / 5;
    let custPercentageText = (Math.round(custValue * 100)) + '%';
    let targetValue = targetScore / 5;
    let targetShowValue = custValue < targetValue ? targetValue - custValue : 0;
    let targetPercentageText = targetShowValue > 0 ? selectedProduct + ' - ' + (Math.round(targetValue * 100)) + '%' : '';    
    let maxValue = custValue < targetValue ? 1 - targetValue : 1 - custValue;
    
    //load the chart
    google.charts.load('current', {packages: ['corechart', 'bar'],
    callback: function() {
        let chartData = new google.visualization.DataTable();
        
    
        chartData.addColumn('string', 'Dimension');
        chartData.addColumn('number', 'Customer');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Target');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Maximum Cloud Capacity');
        chartData.addColumn({type: 'string', role: 'annotation'});
    
        chartData.addRows([[currentSection, custValue, custPercentageText, targetShowValue, targetPercentageText, maxValue, 'Max Cap.']]);

        let chart = new google.visualization.ColumnChart(document.getElementById('chartarea'));      
        chart.draw(chartData, chartOptions);
    }
    });    
}

function showFinalArea() {
    $('#questionsection').removeClass('d-block').addClass('d-none');
    $('#chartsection').removeClass('d-block').addClass('d-none');
    $('#finalstepsection').removeClass('d-none').addClass('d-block');

    google.charts.load('current', {packages: ['corechart', 'bar'],
    callback: function() {
        let chartData = new google.visualization.DataTable();
        
    
        chartData.addColumn('string', 'Dimension');
        chartData.addColumn('number', 'Customer');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Target');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Maximum Cloud Capacity');
        chartData.addColumn({type: 'string', role: 'annotation'});

        $.each(sections, function() {
            let thisSection = $(this)[0];
            
            let order = thisSection.order;
            
            let calculatedML = 0;
            
            let totalSectionQuestions = thisSection.questions.length;
        
            //calculate target product score
            let targetProduct = $.grep(products, function(p) { return p.id == selectedProduct;});
            let targetSection = $.grep(targetProduct[0].targetScores, function(t) { return t.id == thisSection.id;});
            let targetScore = targetSection[0].targetScore;    
        
            //calculate score for all the questions
            $.each(thisSection.questions, function() {
                let q = $(this)[0];
                
                let calculatedQuestion = $.grep(overallScore, function(s) { return s.id == q.id;});
        
                if (calculatedQuestion != null && calculatedQuestion.length > 0)
                {
                    calculatedML += (calculatedQuestion[0].score / totalSectionQuestions);
                }        
        
            });
        
            //calculate values for chart
            let custValue = calculatedML / 5;
            let custPercentageText = (Math.round(custValue * 100)) + '%';
            let targetValue = targetScore / 5;
            let targetShowValue = custValue < targetValue ? targetValue - custValue : 0;
            let targetPercentageText = targetShowValue > 0 ? selectedProduct + ' - ' + (Math.round(targetValue * 100)) + '%' : '';    
            let maxValue = custValue < targetValue ? 1 - targetValue : 1 - custValue;
            

            chartData.addRows([[thisSection.name, custValue, custPercentageText, targetShowValue, targetPercentageText, maxValue, 'Max Cap.']]);
        });
    
        

        let chart = new google.visualization.ColumnChart(document.getElementById('finalchartarea'));      
        chart.draw(chartData, finalChartOptions);
    }
    });
}

function checkIfSelected(question) {
    let selection = $('#' + question).val();
    
    return selection != '0' ? true : false;
}


function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



function loadProducts()
{
    $.ajax({
        url: "js/products.json",
        async: true,
        dataType: 'json',
        success: function(data) {
            products = data.products;
            let htmlContent = '';
            let count = 0;
            let selected = '';
            $.each(products, function() {
                let p = $(this)[0];
                selected = count > 0 ? '' : 'selected';
                htmlContent += '<option ' + selected + ' value="' + p.id + '">' + p.name + '</option>';
                count++;
            });  
            $('#productname').append(htmlContent);          
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
    let currentChar = 'a';
    let totalSections = sections.length;

    $.each(sections, function() {
        let section = $(this)[0];
        let shortName = section.shortName;
        let fullName = section.name;
        let sectionId = section.id;
        let sectionOrder = section.order;
        let sectionTabClass = section.tabClass;

        let totalSectionQuestions = section.questions.length;

        

        /*********** Build out the circular tab *******************/
        let tabAClass = 'piivot-tab-circular';
        let tabShow = '';
        //let sectionTabClass = 'secondary disabled';

        if (count == 0)
        {
            tabAClass += ' active';
            //ariaExpanded = 'true';
            tabShow += ' active show';
            //sectionTabClass = 'current';

            currentSection = fullName;

            resetChartAreaForNewSection();
        }

        let piivotTabName = '3' + currentChar;
        let circularTabContent = '';
        let showTab = count > 0 ? 'd-none' : 'd-block';

        circularTabContent += '<div class="col text-center">';
        circularTabContent += '<small><strong>' + shortName + '</strong></small>';
        circularTabContent += '<li class="' + showTab + ' d-lg-block d-xl-block"><a class="' + tabAClass + ' ' + sectionTabClass + '" href="#' + shortName + '" data-toggle="tab" title="' + shortName + '" piivot-section-count="' + count + '">';
        circularTabContent += '<span class="round-tabs ' + sectionTabClass + '" piivot-tab-name="' + piivotTabName + '">' + piivotTabName + '</span></a></li>';
        circularTabContent += '</div>';
        $('#piivot-tabs').append(circularTabContent);

        

        let tabContent = '';
        tabContent += '<div class="tab-pane fade in ' + tabShow + '" id="' + shortName + '">'
        tabContent += '<h2 class="text-center">' + fullName + '</h2>';
        

        /************ Update question content *****************/
        let questionCount = 1;
        let questionsArray = [];
        $.each(section.questions, function() { questionsArray.push( $(this)[0].id); });

        let questionsSection = $.grep(questions, function(q) { return questionsArray.indexOf(q.id) > -1;  });

        let htmlContent = '';
        
        //htmlContent += '<div class="' + tabShow + '" id="' + shortName + '" role="tabpanel" aria-labelledby="' + shortName + '-tab" piivot-section="' + sectionId + '" piivot-section-order="' + sectionOrder + '" aria-expanded="' + ariaExpanded + '">';

        $.each(questionsSection, function() {
            let q = $(this)[0]; 
            let showQuestion = questionCount != 1 ? 'd-none' : 'd-block';
                        
            htmlContent += '<div class="py-1 ' + showQuestion + ' section-' + sectionId + '" id="question-' + q.id + '" piivot-question-number="' + questionCount + '">';
            htmlContent += '<div class="row bg-white">';
            htmlContent += '<div class="col-12 questionarea">';
            htmlContent += '<p class="text-center">Question ' + questionCount + ' of ' + totalSectionQuestions + '</p>';
            htmlContent += '<p class="lead">' + q.questionText + '</p>';
            htmlContent += '<select class="piivot-question custom-select form-control" id="' + q.id + '" piivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-section-order="' + sectionOrder + '" piivot-question-content="' + q.id + '-CONTENT" >';
            htmlContent += '<option value="0">Choose...</option>';

            $.each(q.options, function() {
                let o = $(this)[0];
                htmlContent += '<option value="' + o.id + '">' + o.optionText + '</option>';
            });

            htmlContent += '</select>';
            htmlContent += '</div>';
            htmlContent += '</div>';

            htmlContent += '<div class="row bg-white py-1"></div>';
            htmlContent += '<div class="row bg-white">';
            htmlContent += '<p id="' + q.id + '-CONTENT" class="font-weight-bold form-control-plaintext col-12 small flex-wrap">&nbsp;</p>';
            htmlContent += '</div>'

            htmlContent += '<div class="row bg-white py-3">';
            if (questionCount > 1) {
                htmlContent += '<div class="col text-left">';
                htmlContent += '<button class="btn btn-outline-secondary prevquestion" id="btn-' + q.id + '-prev" iivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-this-question-count="' + (questionCount) + '" piivot-prev-question-count="' + (questionCount - 1) + '" ><<< Previous</button>';
                htmlContent += '</div>';
            }
            else if (count > 0)  {
                htmlContent += '<div class="col text-left">';
                htmlContent += '<button class="btn btn-secondary btn-lg prevsection" id="btn-' + q.id + '-nextsec" iivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-this-section-count="' + (count) + '" piivot-prev-section-count="' + (count - 1) + '">Go Back to Previous Section</button>';
                htmlContent += '</div>';
            }

            if (questionCount < totalSectionQuestions) {
                htmlContent += '<div class="col text-right">';
                htmlContent += '<button class="btn btn-outline-primary nextquestion" id="btn-' + q.id + '-next" piivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-this-question-count="' + (questionCount) + '" piivot-next-question-count="' + (questionCount + 1) + '">Next >>></button>';
                htmlContent += '</div>';
            }
            else if (count < totalSections - 1) {
                htmlContent += '<div class="col text-right">';
                htmlContent += '<button class="btn btn-primary btn-lg nextsection" id="btn-' + q.id + '-nextsec" piivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-this-section-count="' + (count) + '" piivot-next-section-count="' + (count + 1) + '">Complete Section</button>';
                htmlContent += '</div>';
            }
            else {
                htmlContent += '<div class="col text-right">';
                htmlContent += '<button class="btn btn-success btn-lg finalizesections" id="btn-' + q.id + '-finalize" piivot-question-id="' + q.id + '" piivot-section="' + sectionId + '" piivot-this-section-count="' + (count) + '" piivot-next-section-count="' + (count + 1) + '">Finalize</button>';
                htmlContent += '</div>';
            }

            
            htmlContent += '</div>';
            htmlContent += '</div>';

            questionCount++;

            /*htmlContent += '<div class="input-group">';
            htmlContent += '<div class="col-md-6">';
            htmlContent += '<p class="form-control-plaintext flex-wrap">' + q.questionText + '</p>';
            htmlContent += '</div>';
            htmlContent += '<div class="col-md-6">';
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
            htmlContent += '</div>'*/                
        });

        //htmlContent += "</div>";
        
        tabContent += htmlContent;
        tabContent += '</div>';        
        $('#piivot-tab-content').append(tabContent);
        

        $('#piivotTabContent').append(htmlContent);
        
        count++;
        currentChar = nextChar(currentChar);
    });

    
    $('.nextquestion').on("click", function() {
        let thisbtn = $(this);
        let section = '.section-' + thisbtn.attr('piivot-section');
        let thisquestion = thisbtn.attr('piivot-this-question-count');
        let nextquestion = thisbtn.attr('piivot-next-question-count');
        let questionId = thisbtn.attr('piivot-question-id');

        if (checkIfSelected(questionId)) {
            $('#questionvalidator').removeClass('d-block').addClass('d-none'); 
            $(section + '[piivot-question-number=' + nextquestion + ']').removeClass('d-none').addClass('d-block');
            $(section + '[piivot-question-number=' + thisquestion + ']' ).removeClass('d-block').addClass('d-none');
        }
        else {
            $('#questionvalidator').removeClass('d-none').addClass('d-block');            
        }

        
    });

    $('.prevquestion').on("click", function() {
        let thisbtn = $(this);
        let section = '.section-' + thisbtn.attr('piivot-section');
        let thisquestion = thisbtn.attr('piivot-this-question-count');
        let prevquestion = thisbtn.attr('piivot-prev-question-count');
        let questionId = thisbtn.attr('piivot-question-id');
       

        $(section + '[piivot-question-number=' + prevquestion + ']').removeClass('d-none').addClass('d-block');
        $(section + '[piivot-question-number=' + thisquestion + ']' ).removeClass('d-block').addClass('d-none');
    });

    $('.nextsection').on("click", function() {
        let thisbtn = $(this);
        let section = '.section-' + thisbtn.attr('piivot-section');
        let thissection = thisbtn.attr('piivot-this-section-count');
        let nextsection = thisbtn.attr('piivot-next-section-count');
        let questionId = thisbtn.attr('piivot-question-id');

        if (checkIfSelected(questionId)) { 
            $('#questionvalidator').removeClass('d-block').addClass('d-none'); 
            $('.piivot-tab-circular[piivot-section-count=' + nextsection + ']').removeClass('secondary').removeClass('disabled').addClass('current');
            $('.piivot-tab-circular[piivot-section-count=' + nextsection + '] span').removeClass('secondary').removeClass('disabled').addClass('current');
            $('.piivot-tab-circular[piivot-section-count=' + nextsection + ']')[0].click(); //.first().find('span').trigger('click');
            
            $('.piivot-tab-circular[piivot-section-count=' + thissection + '] span').html('<i class="fa fa-check" aria-hidden="true"></i>');

            currentSection = sections[nextsection].name;
            currentSectionOrder = nextsection;
            resetChartAreaForNewSection();
        }
        else {
            $('#questionvalidator').removeClass('d-none').addClass('d-block');
        }

        
    });

    $('.prevsection').on("click", function() {
        let thisbtn = $(this);
        let section = '.section-' + thisbtn.attr('piivot-section');
        let thissection = thisbtn.attr('piivot-this-section-count');
        let prevsection = thisbtn.attr('piivot-prev-section-count');
        let questionId = thisbtn.attr('piivot-question-id');

        $('.piivot-tab-circular[piivot-section-count=' + prevsection + ']')[0].click(); //.first().find('span').trigger('click');

        currentSection = sections[prevsection].name;
        currentSectionOrder = prevsection;
        resetChartAreaForNewSection();
        
    });

    $('.finalizesections').on("click", function() {
        let thisbtn = $(this);
        let section = '.section-' + thisbtn.attr('piivot-section');
        let thissection = thisbtn.attr('piivot-this-section-count');
        let nextsection = thisbtn.attr('piivot-next-section-count');
        let questionId = thisbtn.attr('piivot-question-id');

        if (checkIfSelected(questionId)) { 
            $('#questionvalidator').removeClass('d-block').addClass('d-none'); 
            $('.piivot-tab-circular[piivot-section-count=' + thissection + '] span').html('<i class="fa fa-check" aria-hidden="true"></i>');

            showFinalArea();
        }
        else {
            $('#questionvalidator').removeClass('d-none').addClass('d-block');
        }

        
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
        let cl = 5

        let mainQuestion = $.grep(questions, function(e) {return e.id == questionId;});    
        let description = '';    

        if (selection != "0")
        {    
            let selectedOption = $.grep(mainQuestion[0].options, function(o) {return o.id == selection});
            ml = selectedOption[0].ml;

            switch (ml) {
                case 1:
                    description = '(Informal) Actions or processes have either not started, or informally discussed.';
                    break;
                case 2:
                    description = '(Ad-hoc) Implementation of actions or processes performed in an ad-hoc manner usually to address a set of isolated requests from the business.';
                    break;
                case 3:
                    description = '(Formal - Basic) Implementation of actions or processes performed in a formalised way, but only takes into account most basic common business/technical use cases.';
                    break;
                case 4:
                    description = '(Formal - Advanced - Business Unit) Implementation of actions or processes performed in a formalised way to account for most uses cases for a particular group(s) of critical business units.';
                    break;
                case 5:
                    description = '(Formal - Advanced - Enterprise-wide) Implementation of actions or processes performed in a mature formalised way and takes into account up to 90% of business/technical use cases for the entire Enterprise.';
                    break;


            }
        }
        else
        {
            ml = 0;
        }

        let maxML = mainQuestion[0].maxML;
        let maxCL = mainQuestion[0].maxCL;
        
        $(contentHolder).text(description);    
    
        addScoreToArray(questionId,sectionId,ml,cl,maxML,maxCL);
            
    });

    
}

function addScoreToArray(id,sectionId,ml,cl,maxML,maxCL)
{
    let currentQuestion = $.grep(overallScore, function(s) { return s.id == id;});
    
    if (currentQuestion != null && currentQuestion.length > 0)
    {
        currentQuestion[0].score = ml > 0 ? ml - (1 - (cl / maxCL)) : 0;
    }
    else
    {
        let newscore = {};
        newscore.id = id;
        newscore.sectionId = sectionId;
        newscore.score = ml > 0 ? ml - (1 - (cl / maxCL)) : 0;
        overallScore.push(newscore);
    }

    resetChartAreaForNewSection();    
}

$('#submitcontact').on('click', function() {
    if ($('#name').val() == '' && $('#email').val() == '' && $('#company').val() == '' )
    {
        $('#infovalidator').removeClass('d-none').addClass('d-block');
        $('#infovalidator').html('All field are required');
    }
    else if ( !isEmail($('#email').val()) )
    {
        $('#infovalidator').removeClass('d-none').addClass('d-block');
        $('#infovalidator').html('Please enter a valid email address');
    }
    else {
        $('#infovalidator').removeClass('d-block').addClass('d-none');
        $('#infovalidator').html('');
        $('#infosection').removeClass('d-block').addClass('d-none');
        $('#productsection').removeClass('d-none').addClass('d-block');
    }
    
});

$('#submitproduct').on('click', function() {
    selectedProduct = $('#productname').val();
    
    
    $('#productsection').removeClass('d-block').addClass('d-none');
    $('#questionsection').removeClass('d-none').addClass('d-block');
    $('#chartsection').removeClass('d-none').addClass('d-block');

    resetChartAreaForNewSection();
});

loadProducts();

var final = getUrlParameter('final');
var qs = getUrlParameter('qs');

if (final == "1") {
    $('#infosection').removeClass('d-block').addClass('d-none');
    $('#productsection').removeClass('d-block').addClass('d-none');
    $('#questionsection').removeClass('d-block').addClass('d-none');
    $('#chartsection').removeClass('d-block').addClass('d-none');
    
    google.charts.load('current', {packages: ['corechart', 'bar'],
    callback: function() {
        let chartData = new google.visualization.DataTable();
        
    
        chartData.addColumn('string', 'Dimension');
        chartData.addColumn('number', 'Customer');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Target');
        chartData.addColumn({type: 'string', role: 'annotation'});
        chartData.addColumn('number', 'Maximum Cloud Capacity');
        chartData.addColumn({type: 'string', role: 'annotation'});

        $.each(sections, function() {
            let thisSection = $(this)[0];
            
            let order = thisSection.order;
            
            let calculatedML = 0;
            
            let totalSectionQuestions = thisSection.questions.length;
        
            //calculate target product score
            let targetProduct = $.grep(products, function(p) { return p.id == selectedProduct;});
            let targetSection = $.grep(targetProduct[0].targetScores, function(t) { return t.id == thisSection.id;});
            let targetScore = targetSection[0].targetScore;   
            
            calculatedML = targetScore - .93;
        
            //calculate score for all the questions
            
            //calculate values for chart
            let custValue = calculatedML / 5;
            let custPercentageText = (Math.round(custValue * 100)) + '%';
            let targetValue = targetScore / 5;
            let targetShowValue = custValue < targetValue ? targetValue - custValue : 0;
            let targetPercentageText = targetShowValue > 0 ? selectedProduct + ' - ' + (Math.round(targetValue * 100)) + '%' : '';    
            let maxValue = custValue < targetValue ? 1 - targetValue : 1 - custValue;
            

            chartData.addRows([[thisSection.name, custValue, custPercentageText, targetShowValue, targetPercentageText, maxValue, 'Max Cap.']]);
        });
    
        

        let chart = new google.visualization.ColumnChart(document.getElementById('finalchartarea'));      
        chart.draw(chartData, finalChartOptions);
    }
    });

    $('#finalstepsection').removeClass('d-none').addClass('d-block');
}
else if (qs == "1") {
    $('#infosection').removeClass('d-block').addClass('d-none');
    $('#productsection').removeClass('d-block').addClass('d-none');
    $('#questionsection').removeClass('d-none').addClass('d-block');
    $('#chartsection').removeClass('d-none').addClass('d-block');
}