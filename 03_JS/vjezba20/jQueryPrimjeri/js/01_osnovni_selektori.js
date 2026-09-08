// Osnovni Selektori - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-1').on('click', function() {
        $('#demo-1 p').css('color', 'red');
    });

    $('#btn-2').on('click', function() {
        $('#demo-2 #moj-span').css('font-weight', 'bold');
    });

    $('#btn-3').on('click', function() {
        $('#demo-3 .test-klasa').css('background-color', 'yellow');
    });

    $('#btn-4').on('click', function() {
        $('#demo-4 *').css('border', '1px solid black');
    });

    $('#btn-5').on('click', function() {
        $('#demo-5 p, #demo-5 span').css('color', 'blue');
    });

});
