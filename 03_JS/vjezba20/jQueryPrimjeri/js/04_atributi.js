// Atributni Selektori - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-23').on('click', function() {
        $('#demo-23 a[href]').css('color', 'green');
    });

    $('#btn-24').on('click', function() {
        $('#demo-24 input[type=\'checkbox\']').prop('checked', true);
    });

    $('#btn-25').on('click', function() {
        $('#demo-25 input[type!=\'password\']').css('border', '2px solid red');
    });

    $('#btn-26').on('click', function() {
        $('#demo-26 [href^=\'https\']').css('font-weight', 'bold');
    });

    $('#btn-27').on('click', function() {
        $('#demo-27 [href$=\'.pdf\']').css('color', 'red');
    });

    $('#btn-28').on('click', function() {
        $('#demo-28 [href*=\'link\']').css('text-decoration', 'none').css('background', 'yellow');
    });

});
