$('#pozdravi').click(function(){
    $('#pozdrav').text('Hello world')
    $('#sakrij').show()
})


$('#sakrij').hide()

$('#sakrij').click(function(){
    $('#pozdrav').text('')
    $('#sakrij').hide()
})