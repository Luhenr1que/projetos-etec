var myfunction= document.querySelector('#bot');
var myfunction2= document.querySelector('#bot1')

myfunction.addEventListener('click', function(){
    var valor1 = document.querySelector('#v1');
    
    var val1 = parseFloat(valor1.value);

    var euro = val1*0.16;

    console.log('val1')

    document.getElementById('text').innerHTML = 'R$'+val1+' reais em euro é '+'£'+euro.toFixed(2);
})
myfunction2.addEventListener('click', function(){
    var valor1 = document.querySelector('#v1');
    
    var val1 = parseFloat(valor1.value);

    var dolar = val1*0.17;

    console.log('val1')

    document.getElementById('text').innerHTML = 'R$'+val1+' reais em dolar é '+'R$'+dolar.toFixed(2);

    var campo = document.querySelector('#v1');
    campo.value = ""
})