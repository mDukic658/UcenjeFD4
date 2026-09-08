// Hijerarhijski Selektori - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-6').on('click', function() {
        $('#demo-6 ul li').css('color', 'green');
    });

    $('#btn-7').on('click', function() {
        $('#demo-7 .roditelj > p').css('border', '2px solid red');
    });

    $('#btn-8').on('click', function() {
        $('#demo-8 h2 + p').css('text-decoration', 'underline');
    });

    $('#btn-9').on('click', function() {
        $('#demo-9 h2 ~ p').css('font-style', 'italic');
    });

});
