var myfunction = document.querySelector('#bot');

myfunction.addEventListener('click', function(e){
    e.preventDefault();

    var val1 = document.querySelector('#v1');

    var idade = parseInt(val1.value);

    if (idade >= 18){
        document.getElementById('text').innerHTML = 'Você tem '+idade+' anos Clasificado como: Adulto'
    }
    else if(idade >= 14){
        document.getElementById('text').innerHTML = 'Você tem '+idade+' anos Clasificado como: Juvenil'
    }
    else if(idade >= 9){
        document.getElementById('text').innerHTML = 'Você tem '+idade+' anos Clasificado como: Infantil'
    }
    else{
        document.getElementById('text').innerHTML = 'Você tem '+idade+' anos Clasificado como: Mirim'
    }

    var campo = document.querySelector('#v1');
    campo.value = ""
}) 