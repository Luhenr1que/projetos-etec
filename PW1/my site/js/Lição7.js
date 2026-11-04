var myfunction= document.querySelector('#bot');

myfunction.addEventListener('click', function(e){
    e.preventDefault();

    document.getElementById('text').innerHTML = ''

    var valor1 = document.querySelector('#v1');
    var valor2 = document.querySelector('#v2');
    var valor3 = document.querySelector('#v3')
    
    var val1 = parseFloat(valor1.value);
    var val2 = parseFloat(valor2.value);
    var val3 = parseFloat(valor3.value);

    var media = (val1+val2+val3)/3;

    if(media >= 8){
        document.getElementById('text').innerHTML = 'valor da média é '+media.toFixed(2)+' sua nota é MB'
    }
    else if(media >= 6){
        document.getElementById('text').innerHTML = 'valor da média é '+media.toFixed(2)+' sua nota é B'
    }
    else if(media >= 5){
        document.getElementById('text').innerHTML = 'valor da média é '+media.toFixed(2)+' sua nota é R'
    }
    else{
        document.getElementById('text').innerHTML = 'valor da média é '+media.toFixed(2)+' sua nota é I'
    }

    var campo = document.querySelector('#v1');
    campo.value = ""
    var campo = document.querySelector('#v2');
    campo.value = ""
    var campo = document.querySelector('#v3');
    campo.value = ""


})