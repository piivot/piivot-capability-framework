$('#ex4').slider();

$('#ex4').on("slide", function(slideevt) {
	$('#ex4SliderVal').text(slideevt.value);
});

$('#ex5').slider({
    ticks: [1,2,3,4,5],
    ticks_labels: ['1', '2', '3', '4', '5'],
    ticks_snap_bounds: 30
});


//$(document).foundation();

/*Pizza.init();

$('input[type="range"]').on('input', function() {
    
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