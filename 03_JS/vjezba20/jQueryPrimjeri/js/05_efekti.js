// Efekti - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-29').on('click', function() {
        $('#box-29').hide();
    });

    $('#btn-30').on('click', function() {
        $('#box-30').show();
    });

    $('#btn-31').on('click', function() {
        $('#box-31').toggle();
    });

    $('#btn-32').on('click', function() {
        $('#box-32').fadeIn(1000);
    });

    $('#btn-33').on('click', function() {
        $('#box-33').fadeOut(1000);
    });

    $('#btn-34').on('click', function() {
        $('#box-34').fadeToggle(500);
    });

    $('#btn-35').on('click', function() {
        $('#box-35').fadeTo(500, 0.4);
    });

    $('#btn-36').on('click', function() {
        $('#box-36').slideUp();
    });

    $('#btn-37').on('click', function() {
        $('#box-37').slideDown();
    });

    $('#btn-38').on('click', function() {
        $('#box-38').slideToggle();
    });

});
