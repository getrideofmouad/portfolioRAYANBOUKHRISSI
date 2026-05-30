// Navigation mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

const toggleNav = () => {
    if (!nav || !burger) return;

    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
};

if (burger) {
    burger.addEventListener('click', toggleNav);
}

// Smooth Scrolling and mobile nav close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (nav && nav.classList.contains('nav-active')) {
            toggleNav();
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    contactForm.reset();
    
    // Show success message
    alert('Message envoyé avec succès!');
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.achievement-card, .timeline-item, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('load', animateOnScroll);

// Video covers
document.querySelectorAll('.video-cover').forEach(cover => {
    cover.addEventListener('click', () => {
        const videoSrc = cover.dataset.videoSrc;
        if (!videoSrc) return;

        const iframe = document.createElement('iframe');
        iframe.className = 'drive-video';
        iframe.src = videoSrc;
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;

        cover.replaceWith(iframe);
    });
});

// Gallery Image Modal
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const video = item.querySelector('video');
    const videoCover = item.querySelector('.video-cover');
    const driveVideo = item.querySelector('.drive-video');
    if (!img || video || videoCover || driveVideo) return;

    item.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
}); 
