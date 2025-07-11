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
            
            // Skip empty links and sample buttons
            if (href === '#' || this.classList.contains('sample-cta')) return;
            
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
    
    // Initialize gallery
    initializeGallery();
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
        
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
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