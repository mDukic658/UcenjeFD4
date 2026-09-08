// DOM Manipulacija - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-39').on('click', function() {
        $('#dom-39').html('<b>Novi HTML! (Bold)</b>');
    });

    $('#btn-40').on('click', function() {
        $('#dom-40').text('<b>Ovo je escaped tekst</b>');
    });

    $('#btn-41').on('click', function() {
        $('#input-41').val('jQuery 4.0 Vrijednost');
    });

    $('#btn-42').on('click', function() {
        $('#img-42').attr('src', 'https://via.placeholder.com/50/0000FF/808080?text=JS');
    });

    $('#btn-43').on('click', function() {
        $('#in-43').removeAttr('disabled').val('Sada je omogućeno!');
    });

    $('#btn-44').on('click', function() {
        $('#dom-44').addClass('highlight');
    });

    $('#btn-45').on('click', function() {
        $('#dom-45').toggleClass('highlight');
    });

    $('#btn-46').on('click', function() {
        $('#dom-46').css({'color': 'white', 'background-color': 'black', 'padding': '5px'});
    });

    $('#btn-47').on('click', function() {
        $('#dom-47').prepend('<li>Prvi (prepend)</li>').append('<li>Zadnji (append)</li>');
    });

    $('#btn-48').on('click', function() {
        $('#dom-48').before('<span>Prije!</span><br>').after('<br><span>Poslije!</span>');
    });

    $('#btn-49').on('click', function() {
        $('#dom-49 .obrisi').remove(); setTimeout(() => $('#dom-49').empty(), 1500);
    });

});
