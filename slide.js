const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyr0tD7otGtDX7zZhr3P5gkPPI9cMBmv_jahQKUrQ04W4r6xTCKtFgPO44VP1yHidbGrw/exec";
let currentSlide = 0;
let slidesData = [];

async function fetchSlides() {
    try {
        const response = await fetch(SCRIPT_URL);
        slidesData = await response.json();
        renderSlides();
    } catch (error) {
        console.error("Error loading slides:", error);
        document.getElementById('loader').innerHTML = "<p class='text-red-500'>Failed to load images.</p>";
    }
}

function renderSlides() {
    const container = document.getElementById('slideshow-wrapper');
    container.innerHTML = ''; // Clear loader

    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === 0 ? 'active' : 'hidden'}`;
        
        slideDiv.innerHTML = `
            <img src="${slide.image}" class="w-full h-full object-cover opacity-60" alt="${slide.title}">
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 class="text-white text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">${slide.title}</h2>
                <p class="text-white text-lg md:text-xl max-w-2xl drop-shadow-md">${slide.text}</p>
            </div>
        `;
        container.appendChild(slideDiv);
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides[currentSlide].classList.add('hidden');
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.remove('hidden');
    slides[currentSlide].classList.add('active');
}

// Initial Call
fetchSlides();