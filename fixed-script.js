// fixed-script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
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
    
    // Initialize construction slider first with multiple attempts
    console.log('Starting slider initialization...');
    
    function tryInitializeSlider() {
        const slider = document.getElementById('construction-slider');
        const dotsContainer = document.getElementById('construction-dots');
        
        if (slider && dotsContainer) {
            console.log('Elements found, initializing construction slider...');
            initializeConstructionSlider();
            return true;
        } else {
            console.log('Slider elements not found yet, retrying...');
            return false;
        }
    }
    
    // Try immediately
    if (!tryInitializeSlider()) {
        // Try again after 100ms
        setTimeout(() => {
            if (!tryInitializeSlider()) {
                // Try again after 500ms
                setTimeout(() => {
                    if (!tryInitializeSlider()) {
                        console.warn('Could not initialize construction slider after multiple attempts');
                    }
                }, 500);
            }
        }, 100);
    }
    
    // Initialize gallery
    setTimeout(() => {
        initializeGallery();
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
    // Construction slider functionality with enhanced mobile support
    const slider = document.getElementById('construction-slider');
    const dotsContainer = document.getElementById('construction-dots');
    const container = document.querySelector('.construction-main-gallery');
    
    if (!slider || !dotsContainer) {
        console.warn('Construction slider elements not found');
        return;
    }
    
    console.log('Initializing construction slider with', slider.children.length, 'slides');
    
    // Disable Lenis smooth scrolling for this container
    if (container) {
        container.setAttribute('data-lenis-prevent', 'true');
    }
    
    let currentSlide = 0;
    const slides = Array.from(slider.children);
    const slideCount = slides.length;
    let isAnimating = false;
    let autoSlideInterval = null;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Ensure slider has proper initial styles
    slider.style.width = '100%';
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = 'translateX(0%)';
    
    // Set up individual slides
    slides.forEach((slide, index) => {
        slide.style.width = '100%';
        slide.style.flexShrink = '0';
        slide.style.minWidth = '100%';
    });
    
    // Clear any existing dots first
    dotsContainer.innerHTML = '';
    
    // Create navigation dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('w-4', 'h-4', 'rounded-full', 'bg-white', 'bg-opacity-50', 'hover:bg-opacity-100', 'focus:outline-none', 'transition-all', 'duration-300');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.style.pointerEvents = 'auto';
        dot.style.zIndex = '30';
        
        if (i === 0) {
            dot.classList.remove('bg-opacity-50');
            dot.classList.add('bg-green-600');
        }
        
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
    }
    
    function goToSlide(index) {
        if (isAnimating || index === currentSlide || index < 0 || index >= slideCount) return;
        
        isAnimating = true;
        currentSlide = index;
        
        console.log('Going to slide', currentSlide);
        
        // Apply transform
        const translateValue = -currentSlide * 100;
        slider.style.transform = `translateX(${translateValue}%)`;
        
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
        }, 600);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slideCount;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(prev);
    }
    
    // Enhanced touch support for mobile
    const touchTarget = container || slider;
    
    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        currentX = startX;
        currentY = startY;
        
        pauseAutoSlide();
        
        console.log('Touch start:', startX, startY);
    }
    
    function handleTouchMove(e) {
        if (e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // If horizontal movement is greater than vertical, prevent default scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            e.preventDefault();
        }
    }
    
    function handleTouchEnd(e) {
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        const swipeThreshold = 50;
        
        console.log('Touch end - deltaX:', deltaX, 'deltaY:', deltaY);
        
        // Check for valid swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                console.log('Swiping to previous slide');
                prevSlide();
            } else {
                console.log('Swiping to next slide');
                nextSlide();
            }
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        currentX = 0;
        currentY = 0;
        
        setTimeout(resumeAutoSlide, 3000);
    }
    
    // Add touch event listeners
    touchTarget.addEventListener('touchstart', handleTouchStart, { passive: true });
    touchTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
    touchTarget.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function pauseAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    function resumeAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Mouse events for auto-slide control
    if (container) {
        container.addEventListener('mouseenter', pauseAutoSlide);
        container.addEventListener('mouseleave', resumeAutoSlide);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    console.log('Construction slider initialization complete');
}