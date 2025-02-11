//! Nav Bar  ---Header---
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".mobile-nav-icon i");
    const mobileNavContainer = document.querySelector(".mobile-nav-container");
    const closeIcon = document.querySelector(".bi-backspace-reverse");
    const mobileNav = document.querySelector(".mobile-nav");
    
    // Function to open the mobile nav
    menuIcon.addEventListener("click", function () {
        mobileNavContainer.style.display = "flex";
        closeIcon.style.display = "block"; // Show the backspace reverse icon
        menuIcon.style.display = "none"; // Hide the list icon
    });
    
    // Function to close the mobile nav
    closeIcon.addEventListener("click", function () {
        mobileNavContainer.style.display = "none";
        closeIcon.style.display = "none"; // Hide the backspace reverse icon
        menuIcon.style.display = "block"; // Show the list icon again
    });
    
    // Close the menu when a link is clicked
    document.querySelectorAll(".mobile-nav-container a").forEach(link => {
        link.addEventListener("click", function () {
            mobileNavContainer.style.display = "none";
            closeIcon.style.display = "none"; // Hide the backspace reverse icon
            menuIcon.style.display = "block"; // Show the list icon again
        });
    });
});
 

//! Portfolio section 
const items = document.querySelectorAll('.item');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let currentIndex = 0;
let autoSlideTimeout;

// Function to update the slider positions
function updateSlider() {
    items.forEach((item, index) => {
        const video = item.querySelector('video');
        if (index === currentIndex) {
            // Current item in the center
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
            item.style.zIndex = '1';
            video.play();
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === items.length - 1)) {
            // Previous item on the left
            item.style.transform = 'translateX(-102%)';
            item.style.opacity = '0.7';
            item.style.zIndex = '0';
            video.pause();
        } else if (index === currentIndex + 1 || (currentIndex === items.length - 1 && index === 0)) {
            // Next item on the right
            item.style.transform = 'translateX(102%)';
            item.style.opacity = '0.7';
            item.style.zIndex = '0';
            video.pause();
        } else {
            // Other items off-screen
            item.style.transform = 'translateX(200%)';
            item.style.opacity = '0';
            item.style.zIndex = '-1';
            video.pause();
        }
        setTimeout(() => {
            video.pause();
            video.currentTime = 0;
          }, 5000);
    });

    // Reset auto-slide timer
    resetAutoSlide();
}

// Function to go to the next slide
function goToNextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlider();
}

// Function to go to the previous slide
function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateSlider();
}

// Function to reset auto-slide timer
function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    const currentVideo = items[currentIndex].querySelector('video');
    autoSlideTimeout = setTimeout(goToNextSlide, currentVideo.duration * 1000 || 5000); // Default to 5 seconds if video duration isn't available
}

// Add event listeners to the buttons
nextButton.addEventListener('click', goToNextSlide);
prevButton.addEventListener('click', goToPrevSlide);

// Add event listeners to auto-slide on video end
items.forEach((item) => {
    const video = item.querySelector('video');
    video.addEventListener('ended', goToNextSlide);
});

// Initialize the slider
updateSlider();

