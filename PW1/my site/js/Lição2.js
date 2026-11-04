var dt = new Date();
var ano = dt.getFullYear();
var myfunction = document.querySelector('#bot')

myfunction.addEventListener('click', function(e){
    e.preventDefault();

    var nasc1 = document.querySelector('#nascimento');
    var nasc = parseInt(nasc1.value);

    var campo = document.querySelector('#nascimento');
    campo.value = "";

    var idade = ano-nasc;

    if (idade<18)
        document.getElementById('idade').innerHTML = 'Você tem '+idade+' anos e não pode votar esse ano.';
    else{
        document.getElementById('idade').innerHTML = 'Você tem '+idade+' anos e pode votar esse ano.';
    }
})
