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

// Profile Sheet Q&A data
const profileSheetData = [
  {
    q: '1. Write your career objective.',
    a: 'To pursue a career as a Software Engineer with a strong inclination towards AI research. I aim to contribute meaningfully to the development of intelligent systems while continuously learning and growing in both engineering and research roles.'
  },
  {
    q: '2. Why do you want to be an engineer? Elaborate reasons.',
    a: 'Engineering has been my passion since childhood. This passion was nurtured and developed under the influence of my maternal uncle, who introduced me to the world of engineering. It fascinates me how technology can solve real-world problems, and being part of that impact drives me.'
  },
  {
    q: '3. Write about projects or internship you have done/ are doing along with the learning.',
    a: 'I have worked on several projects including a Warehouse Management System using JavaFX, Spring Boot, and MySQL. Additionally, I developed a complete website within six hours and built a functional app during a hackathon. These experiences taught me project management, backend API development, teamwork, and how to meet strict deadlines with quality output.'
  },
  {
    q: '4. What would you consider a significant achievement in your life and why?',
    a: 'Developing a website in just six hours and building an app during a hackathon stand out as significant achievements. They showcased my focus, technical ability, and resilience under pressure, validating my readiness for real-world challenges.'
  },
  {
    q: '5. Write about a failure of yours which you consider to share. What have you learned from it?',
    a: 'Failing the JEE exam was a major setback that made me introspect and realign my goals. It helped me realize the importance of following my passion, which was always computer science. Since then, I\'ve been more focused and determined.'
  },
  {
    q: '6. What are your strengths and weaknesses?',
    a: 'Strengths: Quick learner, strong analytical skills, adaptability, teamwork. Weaknesses: Sometimes overthink, can be too detail-oriented.'
  },
  {
    q: '7. What are your short-term and long-term goals?',
    a: 'Short-term: Secure a software engineering position and contribute to impactful projects. Long-term: Lead AI research teams and develop innovative solutions.'
  },
  {
    q: '8. How do you handle stress and pressure?',
    a: 'I break down tasks, prioritize, and focus on solutions. I also take short breaks and practice mindfulness.'
  },
  {
    q: '9. Apart from academics, what else are you interested in?',
    a: 'Extracurricular Activities: Writing rap music. Sports: Playing video games. Other Interests: Music production and software development.'
  },
  {
    q: '10. Give an example of an area, concept or thing that you are absolutely passionate about.',
    a: 'I am deeply passionate about both music and software development. Coding gives me a sense of purpose, while music allows me to express myself creatively.'
  },
  {
    q: '11. Describe yourself as an individual in 5 lines.',
    a: 'I\'m a goal-oriented individual who doesn\'t stop until the task is completed. I believe in clarity, consistency, and continuous self-growth. I approach challenges with a positive, \'that guy\' mindset. I thrive under pressure and value both hard work and smart work. I am someone who learns quickly and adapts fast.'
  },
  {
    q: '12. What kinds of people do you enjoy working with?',
    a: 'I enjoy working with team members who understand the importance of coordination, mutual respect, and responsibility. Effective communication and collaboration are key.'
  },
  {
    q: '13. What is your definition of success?',
    a: 'Success is achieving personal and professional growth while making a positive impact on others.'
  },
  {
    q: '14. How do you handle failure?',
    a: 'I reflect, learn from mistakes, and use them as stepping stones for improvement.'
  },
  {
    q: '15. What motivates you?',
    a: 'The desire to solve problems, create value, and continuously improve motivates me.'
  },
  {
    q: '16. How do you manage your time?',
    a: 'I prioritize tasks, set deadlines, and use productivity tools to stay organized.'
  },
  {
    q: '17. Who is your role model? What qualities of that person you would like to see in your personality and why?',
    a: 'My role model is my great-grandfather. He was exceptional in every way—intelligent, disciplined, and respected. If I could even become 5% of what he was, I would consider myself successful. I aspire to inherit his wisdom and integrity.'
  },
  {
    q: '18. Write a few lines about your friends. Do you think they help/ may help you in achieving your goals? If yes, how? If no, why do you accompany them?',
    a: 'My friends are supportive and focused individuals. They motivate me to study, stay disciplined, and focus on building my career. Their influence keeps me grounded and goal-focused.'
  },
  {
    q: '19. Write 3 leadership qualities. How many do you possess? Write an instance where you have applied those qualities.',
    a: 'Communication, Team Coordination, Decision Making. I possess all three and have demonstrated them by leading multiple college project teams. I ensure every member contributes and feels valued, which keeps the group intact and effective.'
  },
  {
    q: '20. So finally, tell us something more about yourself or introduce yourself.',
    a: 'I am a determined and ambitious individual who believes in hard work, growth, and passion. I love building things—whether it\'s a software project or a song. I strive to improve every day and aim to be someone who leaves a meaningful impact through innovation, leadership, and empathy.'
  }
];

function openPopup(title, text, videoSrc) {
    popupTitle.textContent = title;
    // If Profile Sheet, render accordion
    if (title === 'Profile Sheet') {
        let accordionHTML = '<div class="accordion">';
        profileSheetData.forEach((item, idx) => {
            accordionHTML += `
            <div class="accordion-item${idx === 0 ? ' open' : ''}">
                <button class="accordion-header">${item.q}</button>
                <div class="accordion-body" style="${idx === 0 ? 'max-height:300px;padding:0 1.5rem 1.2rem 1.5rem;' : ''}">${item.a}</div>
            </div>`;
        });
        accordionHTML += '</div>';
        popupText.innerHTML = accordionHTML;
        // Add accordion functionality
        setTimeout(() => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.onclick = function() {
                    const openItem = this.parentElement.parentElement.querySelector('.accordion-item.open');
                    if (openItem && openItem !== this.parentElement) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.accordion-body').style.maxHeight = null;
                        openItem.querySelector('.accordion-body').style.padding = '0 1.5rem';
                    }
                    const body = this.nextElementSibling;
                    if (this.parentElement.classList.contains('open')) {
                        this.parentElement.classList.remove('open');
                        body.style.maxHeight = null;
                        body.style.padding = '0 1.5rem';
                    } else {
                        this.parentElement.classList.add('open');
                        body.style.maxHeight = '300px';
                        body.style.padding = '0 1.5rem 1.2rem 1.5rem';
                    }
                };
            });
        }, 10);
    } else {
        popupText.innerHTML = text;
    }
    // Hide YouTube video by default
    const ytContainer = document.getElementById('youtube-video-container');
    const ytIframe = document.getElementById('youtube-iframe');
    ytContainer.style.display = 'none';
    ytIframe.src = '';

    // Show YouTube video only for Presentation Skills
    if (title === 'Presentation Skills') {
        ytContainer.style.display = 'block';
        ytIframe.width = 1280;
        ytIframe.height = 720;
        ytIframe.src = 'https://www.youtube.com/embed/7iocGw7vavg?si=PmD_c8dbxoR3vmXX';
    }

    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
    // Hide and clear YouTube video
    const ytContainer = document.getElementById('youtube-video-container');
    const ytIframe = document.getElementById('youtube-iframe');
    ytContainer.style.display = 'none';
    ytIframe.src = '';
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
document.addEventListener('DOMContentLoaded', () => {
    const profileSheetCard = document.querySelector('.profile-sheet-card');
    if (profileSheetCard) {
        profileSheetCard.onclick = function() {
            const modal = document.getElementById('profiling-modal');
            modal.style.display = 'flex';
            
            // Initialize accordion functionality
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
        };
    }
});

// Add click outside to close profiling modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('profiling-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Add escape key to close profiling modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('profiling-modal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

function closeProfilingModal() {
    const modal = document.getElementById('profiling-modal');
    modal.style.display = 'none';
}
