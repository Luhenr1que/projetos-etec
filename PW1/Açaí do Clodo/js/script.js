const slider = document.querySelectorAll('.slider');

const btnVolt = document.getElementById('voltar');

const btnProx = document.getElementById('proximo');

let currentSlide = 0;

function hideSlider(){
    slider.forEach(item => item.classList.remove('on'))
}

function showslider(){
    slider[currentSlide].classList.add('on')
}

function nextSlide(){
    hideSlider()
    if(currentSlide === slider.length-1) {
        currentSlide = 0
    }
    else{
        currentSlide ++
    }
    showslider()
}

function prevSlide(){
    hideSlider()
    if(currentSlide === 0) {
        currentSlide = slider.length -1
    }
    else{
        currentSlide --
    }
    showslider()
}

btnVolt.addEventListener('click', prevSlide)
btnProx.addEventListener('click', nextSlide)

console.log(slider)