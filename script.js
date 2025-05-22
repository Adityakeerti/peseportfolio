// // Theme Toggle
// document.getElementById("theme-toggle").addEventListener("click", function () {
//     document.body.classList.toggle("dark-mode");
//     document.body.classList.toggle("light-mode");

//     this.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
// });

// // Popup Functionality
// function openPopup(title, text, videoSrc) {
//     document.getElementById("popup-title").textContent = title;
//     document.getElementById("popup-text").textContent = text;
//     document.getElementById("popup-video").src = videoSrc;
//     document.getElementById("popup").style.display = "flex";
// }

// function closePopup() {
//     document.getElementById("popup").style.display = "none";
// }

// // Manual Scroll for Carousel with Looping
// const container = document.querySelector('.carousel .cards-wrapper');
// const cards = document.querySelectorAll('.card');
// const prev = document.getElementById('prev');
// const next = document.getElementById('next');
// let currentIndex = 0;
// const cardWidth = cards[0].offsetWidth + 20; // Including margin

// prev.addEventListener('click', () => {
//     if (currentIndex === 0) {
//         currentIndex = cards.length - 1; // Jump to the last
//     } else {
//         currentIndex--;
//     }
//     container.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
// });

// next.addEventListener('click', () => {
//     if (currentIndex === cards.length - 1) {
//         currentIndex = 0; // Loop back to first
//     } else {
//         currentIndex++;
//     }
//     container.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
// });



// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Carousel Navigation
const carousel = document.querySelector('.carousel');
const cardsWrapper = document.querySelector('.cards-wrapper');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 32; // card width + gap

function updateCarousel() {
    const offset = -currentIndex * cardWidth;
    cardsWrapper.style.transform = `translateX(${offset}px)`;
    
    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex >= cards.length - 3 ? '0.5' : '1';
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
        updateCarousel();
    }
});

// Popup Functionality
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const videoContainer = document.querySelector('.video-container');

function openPopup(title, text, videoSrc) {
    popupTitle.textContent = title;
    popupText.textContent = text;
    
    // Show video container only for Presentation Skills
    if (title === 'Presentation Skills' && videoSrc) {
        videoContainer.style.display = 'block';
        const video = document.getElementById('popup-video');
        video.src = videoSrc;
        video.load();
    } else {
        videoContainer.style.display = 'none';
    }
    
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
    // Reset video when closing popup
    const video = document.getElementById('popup-video');
    video.pause();
    video.src = '';
}

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        closePopup();
    }
}

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.style.display === 'flex') {
        closePopup();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize carousel
updateCarousel();

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Video Controls
const video = document.getElementById('popup-video');
const playPauseBtn = document.querySelector('.play-pause');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const progressBar = document.querySelector('.progress-bar');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const playOverlay = document.querySelector('.play-overlay');

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playOverlay.style.display = 'none';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playOverlay.style.display = 'flex';
    }
});

// Play Overlay
playOverlay.addEventListener('click', () => {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playOverlay.style.display = 'none';
});

// Update Progress Bar
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Click on Progress Bar
document.querySelector('.progress-bar-container').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
});

// Volume Control
volumeBtn.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

volumeSlider.addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.volume = pos;
    document.querySelector('.volume-level').style.width = `${pos * 100}%`;
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// Video ended
video.addEventListener('ended', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    playOverlay.style.display = 'flex';
});

// Accordion functionality for Profiling Sheet
// const accordionHeaders = document.querySelectorAll('.accordion-header');
// accordionHeaders.forEach(header => {
//     header.addEventListener('click', function() {
//         const openItem = document.querySelector('.accordion-item.open');
//         if (openItem && openItem !== this.parentElement) {
//             openItem.classList.remove('open');
//         }
//         this.parentElement.classList.toggle('open');
//     });
// });

// Attach Profile Sheet card event after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const profileSheetCard = document.querySelector('.profile-sheet-card');
    if (profileSheetCard) {
        profileSheetCard.onclick = openProfilingModal;
    }
});

function openProfilingModal() {
    document.getElementById('profiling-modal').style.display = 'flex';
    // Accordion functionality for Profiling Sheet (re-initialize in case modal was closed)
    const accordionHeaders = document.querySelectorAll('#profiling-modal .accordion-header');
    accordionHeaders.forEach(header => {
        header.onclick = function() {
            const openItem = this.parentElement.parentElement.querySelector('.accordion-item.open');
            if (openItem && openItem !== this.parentElement) {
                openItem.classList.remove('open');
            }
            this.parentElement.classList.toggle('open');
        };
    });
}

function closeProfilingModal() {
    document.getElementById('profiling-modal').style.display = 'none';
}
