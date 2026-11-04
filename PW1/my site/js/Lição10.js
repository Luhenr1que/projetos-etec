var myfunction1 = document.querySelector('#bot1');

myfunction1.addEventListener('click', function(e){
    e.preventDefault();

    var no = document.querySelector('#name');
    var sa = document.querySelector('#sal')

    var nome = no.value;
    var sal = parseFloat(sa.value);

    document.getElementById('text1').innerHTML = 'Nome do funcionário: '+nome;
    document.getElementById('text2').innerHTML = 'Salário do funcionário: '+sal;

    var vrlAjuste;
    var salFinal;

    if(sal >= 2000){
        document.getElementById('text3').innerHTML = 'Faixa de reajuste: 20%';
        vrlAjuste = sal*0.2;
        document.getElementById('text4').innerHTML = 'Valor de reajuste: '+vrlAjuste.toFixed(2);
        salFinal = sal+vrlAjuste;
        document.getElementById('text5').innerHTML = 'Salário final do funcionário: '+salFinal.toFixed(2);
    }
    else{
        document.getElementById('text3').innerHTML = 'Faixa de reajuste: 30%';
        vrlAjuste = sal*0.3;
        document.getElementById('text4').innerHTML = 'Valor de reajuste: '+vrlAjuste.toFixed(2);
        salFinal = sal+vrlAjuste;
        document.getElementById('text5').innerHTML = 'Salário final do funcionário: '+salFinal.toFixed(2);
    }


    var campo = document.querySelector('#name');
    campo.value = ""

    var campo = document.querySelector('#sal');
    campo.value = ""
}) 

