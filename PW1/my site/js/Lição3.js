var botao = document.querySelector('#bot');

botao.addEventListener('click', function(e){
    e.preventDefault();

    document.getElementById('text').innerHTML = ''

    var valor1 = document.querySelector('#v1');
    var valor2 = document.querySelector('#v2');
    var valor3 = document.querySelector('#v3')
    
    var val1 = parseInt(valor1.value);
    var val2 = parseInt(valor2.value);
    var val3 = parseInt(valor3.value);

    if(val1 == val2 && val2 == val3){
        document.getElementById('text').innerHTML = 'Todos os valores são iguais'
    }
    else if(val1 > val2 && val1 > val3){
        document.getElementById('text').innerHTML += val1+' é o maior número '
        if(val2 > val3){
            document.getElementById('text').innerHTML += 'e '+val3+' é o menor'
        }
        else{
            document.getElementById('text').innerHTML += 'e '+val2+' é o menor'
        }
    }
    else if(val2 > val1 && val2 > val3){
        document.getElementById('text').innerHTML += val2+' é o maior número '
        if(val1 > val3){
            document.getElementById('text').innerHTML += 'e '+val3+' é o menor'
        }
        else{
            document.getElementById('text').innerHTML += 'e '+val1+' é o menor'
        }
    }
    else if(val3 > val1 && val3 > val2){
        document.getElementById('text').innerHTML += val3+' é o maior número '
        if(val1 > val2){
            document.getElementById('text').innerHTML += 'e '+val2+' é o menor'
        }
        else{
            document.getElementById('text').innerHTML += 'e '+val1+' é o menor'
        }
    }

    var campo = document.querySelector('#v1');
    campo.value = ""

    var campo = document.querySelector('#v2');
    campo.value = ""

    var campo = document.querySelector('#v3');
    campo.value = ""

})