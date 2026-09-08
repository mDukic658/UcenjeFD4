// Osnovni Filteri - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-10').on('click', function() {
        $('#demo-10 li:first').css('color', 'red');
    });

    $('#btn-11').on('click', function() {
        $('#demo-11 li:last').css('color', 'blue');
    });

    $('#btn-12').on('click', function() {
        $('#demo-12 li:even').css('background', '#ddd');
    });

    $('#btn-13').on('click', function() {
        $('#demo-13 li:odd').css('background', '#bbb');
    });

    $('#btn-14').on('click', function() {
        $('#demo-14 li:eq(1)').css('font-size', '1.2em');
    });

    $('#btn-15').on('click', function() {
        $('#demo-15 li:gt(0)').css('opacity', '0.5');
    });

    $('#btn-16').on('click', function() {
        $('#demo-16 li:lt(2)').css('font-weight', 'bold');
    });

    $('#btn-17').on('click', function() {
        $('#demo-17 :header').css('color', 'purple');
    });

    $('#btn-18').on('click', function() {
        $('#demo-18 li:not(.skip)').css('color', 'green');
    });

    $('#btn-19').on('click', function() {
        $('#demo-19 p:contains(\'Tajna\')').css('background', 'yellow');
    });

    $('#btn-20').on('click', function() {
        $('#demo-20 div:empty').css('background', 'red');
    });

    $('#btn-21').on('click', function() {
        $('#demo-21 div:has(p)').css('border', '2px solid blue');
    });

    $('#btn-22').on('click', function() {
        $('#demo-22 span:hidden').show().css('color', 'red');
    });

});
