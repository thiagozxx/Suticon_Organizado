const setupClientCarousel = () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselContainer = document.querySelector(".carousel-container");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");

    if (!carouselTrack || !carouselContainer) return;

    const totalWidth = carouselTrack.scrollWidth / 2; // Dividido por 2 por causa da duplicação

    // Pause animation on hover
    carouselContainer.addEventListener("mouseenter", () => {
        carouselTrack.classList.add("paused");
    });
    carouselContainer.addEventListener("mouseleave", () => {
        carouselTrack.classList.remove("paused");
    });

    // Navigation controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            let currentPosition = parseFloat(getComputedStyle(carouselTrack).transform.split(',')[4]) || 0;
            let newPosition = currentPosition + (totalWidth / 4);
            if (newPosition >= 0) {
                newPosition = -totalWidth;
            }
            carouselTrack.style.transition = "transform 0.6s ease-out";
            carouselTrack.style.transform = `translateX(${newPosition}px)`;

            setTimeout(() => {
                carouselTrack.style.transition = "";
            }, 600);
        });

        nextBtn.addEventListener("click", () => {
            let currentPosition = parseFloat(getComputedStyle(carouselTrack).transform.split(',')[4]) || 0;
            let newPosition = currentPosition - (totalWidth / 4);
            if (newPosition <= -totalWidth) {
                newPosition = 0;
            }
            carouselTrack.style.transition = "transform 0.6s ease-out";
            carouselTrack.style.transform = `translateX(${newPosition}px)`;
            // Reset transition after animation to allow CSS animation to resume
            setTimeout(() => {
                carouselTrack.style.transition = "";
            }, 600);
        });
    }

    // Ensure seamless loop by resetting position when animation ends
    carouselTrack.addEventListener("animationiteration", () => {
        carouselTrack.style.transition = "none";
        carouselTrack.style.transform = "translateX(0)";
        // Force reflow to reset animation
        void carouselTrack.offsetWidth;
        carouselTrack.style.transition = "";
    });
};

// Call the carousel setup function
setupClientCarousel();