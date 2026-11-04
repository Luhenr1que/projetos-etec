var a = document.querySelector('#bot1');
var b = document.querySelector('#bot2');
var c = document.querySelector('#bot3');
var d = document.querySelector('#bot4');
var e = document.querySelector('#bot5');
var f = document.querySelector('#bot6');


a.addEventListener('click', function(){

    document.getElementById('text1').innerHTML = ''

    var bM1 = document.querySelector('#trapbM');
    var bm1 = document.querySelector('#trapbm');
    var traH1 = document.querySelector('#traph');

    var bM = parseFloat(bM1.value);
    var bm = parseFloat(bm1.value);
    var traH = parseFloat(traH1.value);

    var areatrapezio = (bM + bm)*traH/2;

    document.getElementById('text1').innerHTML = 'Valor da area do trápezio é : '+areatrapezio.toFixed(2);

    var campo = document.querySelector('#trapbM');
    campo.value = ""
    var campo = document.querySelector('#trapbm');
    campo.value = ""
    var campo = document.querySelector('#traph');
    campo.value = ""

})

b.addEventListener('click', function(){

    document.getElementById('text2').innerHTML = ''

    var cirR1 = document.querySelector('#cirR');
    

    var cirR = parseFloat(cirR1.value);


    var areacirculo = 3.16*(cirR*cirR)

    document.getElementById('text2').innerHTML = 'Valor da area do círculo é : '+areacirculo.toFixed(2);

    var campo = document.querySelector('#cirR');
    campo.value = ""

})

c.addEventListener('click', function(){

    document.getElementById('text3').innerHTML = ''

    var triB1 = document.querySelector('#triB');
    var triH1 = document.querySelector('#triH');

    var triB = parseFloat(triB1.value);
    var triH = parseFloat(triH1.value);

    var areatriangulo = (triB*triH)/2;

    document.getElementById('text3').innerHTML = 'Valor da area do triângulo é : '+areatriangulo.toFixed(2);

    var campo = document.querySelector('#triB');
    campo.value = ""
    var campo = document.querySelector('#triH');
    campo.value = ""

})

d.addEventListener('click', function(){

    document.getElementById('text4').innerHTML = ''

    var quadL1 = document.querySelector('#quadL');

    var quadL = parseFloat(quadL1.value);

    var areaquadrado = quadL*quadL;

    document.getElementById('text4').innerHTML = 'Valor da area do quadrado é : '+areaquadrado.toFixed(2);

    var campo = document.querySelector('#quadL');
    campo.value = ""

})

e.addEventListener('click', function(){

    document.getElementById('text5').innerHTML = ''

    var losandM1 = document.querySelector('#losandM');
    var losandm1 = document.querySelector('#losandm');


    var losandM = parseFloat(losandM1.value);
    var losandm = parseFloat(losandm1.value);


    var arealosango = (losandM*losandm)/2;

    document.getElementById('text5').innerHTML = 'Valor da area do losango é : '+arealosango.toFixed(2);

    var campo = document.querySelector('#losandM');
    campo.value = ""
    var campo = document.querySelector('#losandm');
    campo.value = ""


})

f.addEventListener('click', function(){

    document.getElementById('text6').innerHTML = ''

    var retB1 = document.querySelector('#retB');
    var retH1 = document.querySelector('#retH');

    var retB = parseFloat(retB1.value);
    var retH = parseFloat(retH1.value);

    var arearetangulo = retB*retH;

    document.getElementById('text6').innerHTML = 'Valor da area do retangulo é : '+arearetangulo.toFixed(2);

    var campo = document.querySelector('#retB');
    campo.value = ""
    var campo = document.querySelector('#retH');
    campo.value = ""

})