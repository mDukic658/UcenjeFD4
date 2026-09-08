$(document).foundation()


$('#promjeniNaslov').click(function(){
    $('#naslov').text('Dobrodošli')
    return false 
})

$('#naslov').dblclick(function(){
    $('.callout.primary').css('background-color', 'gray')
    $('p').css('color', 'red')
})