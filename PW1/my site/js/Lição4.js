var myfunction = document.querySelector('#bot');

myfunction.addEventListener('click', function(e){
    e.preventDefault();

    var valor1 = document.querySelector('#v1');

    var val1 = parseInt(valor1.value);

    var suce = val1+1;
    var ante = val1-1;

    document.getElementById('text').innerHTML = 'Você escolheu o número '+val1+' e seu sucessor é '+suce+' e o antecessor é '+ante;

    var campo = document.querySelector('#v1');
    campo.value = ""    
})