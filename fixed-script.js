// fixed-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        touchMultiplier: 2
    });

    // Animation loop for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // SAMPLE FORM FUNCTIONALITY - Fixed Implementation
    function setupSampleButtons() {
        // Get all sample CTA buttons
        const sampleButtons = document.querySelectorAll('.sample-cta');
        const mainSampleCta = document.getElementById('sample-cta');
        const floatingSampleCta = document.getElementById('floating-sample-cta');
        
        // Get sample form elements
        const sampleFormContainer = document.getElementById('sample-form-container');
        const sampleForm = document.getElementById('sample-form');
        const closeSampleForm = document.getElementById('close-sample-form');
        const thankYouMessage = document.getElementById('thank-you-message');
        const closeThankYou = document.getElementById('close-thank-you');
        
        // Function to open the sample form
        function openSampleForm(e) {
            e.preventDefault();
            if (sampleFormContainer) {
                sampleFormContainer.classList.remove('hidden');
                setTimeout(() => {
                    if (sampleForm) {
                        sampleForm.classList.add('active');
                    }
                }, 10);
            }
        }
        
        // Function to close the sample form
        function closeSampleFormFunc() {
            if (sampleForm) {
                sampleForm.classList.remove('active');
                setTimeout(() => {
                    if (sampleFormContainer) {
                        sampleFormContainer.classList.add('hidden');
                    }
                }, 300);
            }
        }
        
        // Add click handlers to all sample buttons
        sampleButtons.forEach(button => {
            button.addEventListener('click', openSampleForm);
        });
        
        // Also add specific handlers for named buttons
        if (mainSampleCta) {
            mainSampleCta.addEventListener('click', openSampleForm);
        }
        
        if (floatingSampleCta) {
            floatingSampleCta.addEventListener('click', openSampleForm);
        }
        
        // Close button handler
        if (closeSampleForm) {
            closeSampleForm.addEventListener('click', closeSampleFormFunc);
        }
        
        // Close when clicking outside
        if (sampleFormContainer) {
            sampleFormContainer.addEventListener('click', (e) => {
                if (e.target === sampleFormContainer) {
                    closeSampleFormFunc();
                }
            });
        }
        
        // Close thank you message
        if (closeThankYou) {
            closeThankYou.addEventListener('click', () => {
                if (thankYouMessage) {
                    thankYouMessage.classList.add('hidden');
                }
            });
        }
        
        // Set up form submission with EmailJS
        const sampleFormElement = document.querySelector('#sample-form form');
        if (sampleFormElement) {
            sampleFormElement.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('sample-name').value,
                    company: document.getElementById('sample-company').value,
                    email: document.getElementById('sample-email').value,
                    phone: document.getElementById('sample-phone').value,
                    sampleType: document.getElementById('sample-type').value,
                    address: document.getElementById('sample-address').value
                };
                
                // Send email using EmailJS
                emailjs.send('service_anf05h6', 'template_sample_request', {
                    to_email: 'media@elventech.net',
                    name: formData.name,
                    company: formData.company,
                    email: formData.email,
                    phone: formData.phone,
                    sample_type: formData.sampleType,
                    shipping_address: formData.address,
                    message: `Sample request from ${formData.name} at ${formData.company}`
                })
                .then(() => {
                    // Show thank you message
                    if (thankYouMessage) {
                        closeSampleFormFunc();
                        thankYouMessage.classList.remove('hidden');
                    }
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('There was an error sending your request. Please try again or contact us directly.');
                });
            });
        }
    }

    // Set up mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty links, sample buttons, and contact buttons
            if (href === '#' || this.classList.contains('sample-cta') || this.classList.contains('contact-cta')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                lenis.scrollTo(target, { 
                    offset: -headerHeight,
                    duration: 1.5
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Initialize the sample buttons
    setupSampleButtons();
    
    // Initialize gallery with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeGallery();
        initializeConstructionSlider();
    }, 100);
});

function initializeGallery() {
    // Gallery functionality
    const slider = document.getElementById('gallery-slider');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    const dotsContainer = document.getElementById('gallery-dots');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const closeGalleryModal = document.getElementById('close-gallery-modal');
    
    if (slider && prevButton && nextButton && dotsContainer) {
        let currentSlide = 0;
        const slides = slider.children;
        const slideCount = slides.length;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Create navigation dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-300', 'hover:bg-green-500', 'focus:outline-none', 'transition');
            
            if (i === 0) {
                dot.classList.add('bg-green-600');
            }
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        function goToSlide(index) {
            currentSlide = index;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = dotsContainer.children;
            for (let i = 0; i < dots.length; i++) {
                if (i === currentSlide) {
                    dots[i].classList.add('bg-green-600');
                    dots[i].classList.remove('bg-gray-300');
                } else {
                    dots[i].classList.remove('bg-green-600');
                    dots[i].classList.add('bg-gray-300');
                }
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        }
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Touch support for mobile
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Auto-slide functionality (optional)
        let autoSlideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
        
        // Gallery modal functionality
        if (galleryModal && galleryModalImage && closeGalleryModal) {
            // Make gallery images clickable
            for (let i = 0; i < slideCount; i++) {
                const slide = slides[i];
                const img = slide.querySelector('img');
                if (img) {
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', () => {
                        galleryModalImage.src = img.src;
                        galleryModalImage.alt = img.alt;
                        galleryModal.classList.remove('hidden');
                    });
                }
            }
            
            // Close modal button
            closeGalleryModal.addEventListener('click', () => {
                galleryModal.classList.add('hidden');
            });
            
            // Close when clicking outside
            galleryModal.addEventListener('click', (e) => {
                if (e.target === galleryModal) {
                    galleryModal.classList.add('hidden');
                }
            });
        }
    }
}

function initializeConstructionSlider() {
    // Construction slider functionality with robust initialization
    const slider = document.getElementById('construction-slider');
    const prevButton = document.getElementById('construction-prev');
    const nextButton = document.getElementById('construction-next');
    const dotsContainer = document.getElementById('construction-dots');
    
    if (!slider || !dotsContainer) {
        console.warn('Construction slider elements not found');
        return;
    }
    
    let currentSlide = 0;
    const slides = slider.children;
    const slideCount = slides.length;
    let touchStartX = 0;
    let touchEndX = 0;
    let isAnimating = false;
    
    // Clear any existing dots first
    dotsContainer.innerHTML = '';
    
    // Create navigation dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('w-4', 'h-4', 'rounded-full', 'bg-white', 'bg-opacity-50', 'hover:bg-opacity-100', 'focus:outline-none', 'transition-all', 'duration-300');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        
        if (i === 0) {
            dot.classList.remove('bg-opacity-50');
            dot.classList.add('bg-green-600');
        }
        
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
    }
    
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        isAnimating = true;
        currentSlide = index;
        
        // Apply transform
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        const dots = dotsContainer.children;
        Array.from(dots).forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.remove('bg-white', 'bg-opacity-50');
                dot.classList.add('bg-green-600');
            } else {
                dot.classList.remove('bg-green-600');
                dot.classList.add('bg-white', 'bg-opacity-50');
            }
        });
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slideCount;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(prev);
    }
    
    // Add event listeners for navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
        
        // Make buttons visible and clickable
        prevButton.style.zIndex = '100';
        prevButton.style.pointerEvents = 'auto';
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
        
        // Make buttons visible and clickable
        nextButton.style.zIndex = '100';
        nextButton.style.pointerEvents = 'auto';
    }
    
    // Touch support for mobile
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    
    slider.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
        
        // Prevent vertical scrolling if horizontal swipe is detected
        if (Math.abs(distX) > Math.abs(distY)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const swipeThreshold = 50;
        
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > swipeThreshold) {
            if (distX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        distX = 0;
        distY = 0;
    }, { passive: true });
    
    // Auto-slide functionality
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on interaction
    const pauseAutoSlide = () => clearInterval(autoSlideInterval);
    const resumeAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    };
    
    slider.addEventListener('mouseenter', pauseAutoSlide);
    slider.addEventListener('mouseleave', resumeAutoSlide);
    slider.addEventListener('touchstart', pauseAutoSlide);
    slider.addEventListener('touchend', () => {
        setTimeout(resumeAutoSlide, 3000);
    });
}