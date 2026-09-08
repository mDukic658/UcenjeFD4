// AJAX API i Događaji - Rad s jQuery 4.0
$(document).ready(function() {
    $('#btn-50').on('click', function() {
        $.ajax({ url: 'https://pokeapi.co/api/v2/pokemon/pikachu', method: 'GET', success: function(data) { $('#api-result-50').html('Ime: ' + data.name + '<br>Težina: ' + data.weight + '<br>Visina: ' + data.height + '<br><img src="' + data.sprites.front_default + '">'); }, error: function() { $('#api-result-50').html('Greška pri dohvaćanju API-ja.'); } });
    });

});
