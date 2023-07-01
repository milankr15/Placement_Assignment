const carousel = document.getElementById('carousel');
const carousel1 = document.getElementById('carousel-1');
const slides = ['./assets/Carousel1-1.png', './assets/Carousel1-2.png', './assets/Carousel1-3.png'];
const slides1 = ['./assets/hackathon-1.png', './assets/hackathon-2.png', './assets/hackathon-3.png', './assets/hackathon-4.png']
let currentSlide = 0;
let currentSlide1 = 0;

setInterval(() => {
    if (currentSlide >= 2) {
        currentSlide = 0;
        carousel.src = slides[currentSlide];
        return;
    }
    currentSlide = currentSlide + 1;
    carousel.src = slides[currentSlide];
    return;
}, 3000);

setInterval(() => {
    if (currentSlide1 >= 3) {
        currentSlide1 = 0;
        carousel1.src = slides1[currentSlide1];
        return;
    }
    currentSlide1 = currentSlide1 + 1;
    carousel1.src = slides1[currentSlide1];
    return;
}, 5000);