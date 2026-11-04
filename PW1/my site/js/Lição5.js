var myfunction = document.querySelector('#bot');

myfunction.addEventListener('click', function(e){
    e.preventDefault();

    var valor1 = document.querySelector('#v1');

    var val1 = parseInt(valor1.value);
    
    if (val1%2 == 0){
        document.getElementById('text').innerHTML = val1+' é um número par'
    }
    else{
        document.getElementById('text').innerHTML = val1+' é um número ímpar'
    } 

    var campo = document.querySelector('#v1');
    campo.value = ""
})
