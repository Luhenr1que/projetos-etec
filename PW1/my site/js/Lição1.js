var a = document.querySelector('#soma');
var b = document.querySelector('#subtr');
var c = document.querySelector('#multi');
var d = document.querySelector('#divi');

a.addEventListener('click', function(e){
    e.preventDefault();

    var val1 = document.querySelector('#valor1S');
    var val2 = document.querySelector('#valor2S');
    
    var value1 = parseFloat(val2.value);
    var value = parseFloat(val1.value);

    var r = value+value1;
    document.getElementById('Resultado').innerHTML = 'Resultado = '+r;

    var campo = document.querySelector('#valor1S');
    campo.value = ""

    var campo = document.querySelector('#valor2S');
    campo.value = ""

})

b.addEventListener('click', function(e){
    e.preventDefault();

    var val1 = document.querySelector('#valor1S');
    var val2 = document.querySelector('#valor2S');
    
    var value1 = parseFloat(val2.value);
    var value = parseFloat(val1.value);

    var r = value-value1;
    document.getElementById('Resultado').innerHTML = 'Resultado = '+r;

    var campo = document.querySelector('#valor1S');
    campo.value = ""

    var campo = document.querySelector('#valor2S');
    campo.value = ""
    
})

c.addEventListener('click', function(e){
    e.preventDefault();

    var val1 = document.querySelector('#valor1S');
    var val2 = document.querySelector('#valor2S');
    
    var value1 = parseFloat(val2.value);
    var value = parseFloat(val1.value);

    var r = value*value1;
    document.getElementById('Resultado').innerHTML = 'Resultado = '+r;

    var campo = document.querySelector('#valor1S');
    campo.value = ""

    var campo = document.querySelector('#valor2S');
    campo.value = ""
    
})

d.addEventListener('click', function(e){
    e.preventDefault();

    var val1 = document.querySelector('#valor1S');
    var val2 = document.querySelector('#valor2S');
    
    var value1 = parseFloat(val2.value);
    var value = parseFloat(val1.value);

    var r = value/value1;
    document.getElementById('Resultado').innerHTML = 'Resultado = '+r;

    var campo = document.querySelector('#valor1S');
    campo.value = ""

    var campo = document.querySelector('#valor2S');
    campo.value = ""
    
})