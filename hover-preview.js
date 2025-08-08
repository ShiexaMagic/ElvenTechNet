/**
 * Vanilla JavaScript implementation of Hover Link Preview
 * Equivalent to the React component functionality
 */

class HoverLinkPreview {
    constructor() {
        this.showPreview = false;
        this.prevX = null;
        this.previewElement = null;
        this.currentLink = null;
        
        // Animation values
        this.motionTop = 0;
        this.motionLeft = 0;
        this.motionRotate = 0;
        
        this.init();
    }
    
    init() {
        this.createPreviewElement();
        this.setupEventListeners();
    }
    
    createPreviewElement() {
        // Create preview container
        this.previewElement = document.createElement('div');
        this.previewElement.className = 'hover-link-preview';
        this.previewElement.style.cssText = `
            position: fixed;
            z-index: 50;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.8) translateY(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        // Create preview content with inline styles instead of Tailwind classes
        this.previewElement.innerHTML = `
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 0.5rem; min-width: 180px; max-width: 20rem;">
                <img style="width: 192px; height: 112px; object-fit: cover; border-radius: 0.375rem;" draggable="false" alt="Link preview" />
            </div>
        `;
        
        document.body.appendChild(this.previewElement);
        console.log('Preview element created and added to body');
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Find all links with data-preview attribute
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('a[data-preview]')) {
                console.log('Mouse entered link with preview:', e.target.href);
                this.handleMouseEnter(e);
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('a[data-preview]')) {
                console.log('Mouse left link with preview:', e.target.href);
                this.handleMouseLeave(e);
            }
        }, true);
        
        document.addEventListener('mousemove', (e) => {
            if (e.target.matches('a[data-preview]') && this.showPreview) {
                this.handleMouseMove(e);
            }
        }, true);
        
        // Log all links with data-preview for debugging
        const previewLinks = document.querySelectorAll('a[data-preview]');
        console.log(`Found ${previewLinks.length} links with data-preview:`, previewLinks);
    }
    
    handleMouseEnter(e) {
        console.log('handleMouseEnter called');
        this.currentLink = e.target;
        const previewImage = e.target.getAttribute('data-preview');
        const imageAlt = e.target.getAttribute('data-preview-alt') || 'Link preview';
        
        console.log('Preview image URL:', previewImage);
        
        if (!previewImage) {
            console.log('No preview image found');
            return;
        }
        
        this.showPreview = true;
        this.prevX = null;
        
        // Update preview image
        const img = this.previewElement.querySelector('img');
        img.src = previewImage;
        img.alt = imageAlt;
        
        console.log('Showing preview...');
        
        // Show preview with animation
        this.previewElement.style.opacity = '1';
        this.previewElement.style.transform = 'scale(1) translateY(0)';
    }
    
    handleMouseLeave(e) {
        this.showPreview = false;
        this.prevX = null;
        this.currentLink = null;
        
        // Hide preview with animation
        this.previewElement.style.opacity = '0';
        this.previewElement.style.transform = 'scale(0.8) translateY(-10px) rotate(0deg)';
    }
    
    handleMouseMove(e) {
        const PREVIEW_WIDTH = 192;
        const PREVIEW_HEIGHT = 112;
        const OFFSET_Y = 40;
        
        // Position the preview
        this.motionTop = e.clientY - PREVIEW_HEIGHT - OFFSET_Y;
        this.motionLeft = e.clientX - PREVIEW_WIDTH / 2;
        
        // Calculate tilt based on horizontal movement
        if (this.prevX !== null) {
            const deltaX = e.clientX - this.prevX;
            const newRotate = Math.max(-15, Math.min(15, deltaX * 1.2));
            this.motionRotate = newRotate;
        }
        this.prevX = e.clientX;
        
        // Apply smooth animation
        this.animateToPosition();
    }
    
    animateToPosition() {
        const transform = `translate3d(${this.motionLeft}px, ${this.motionTop}px, 0) rotate(${this.motionRotate}deg)`;
        this.previewElement.style.transform = transform;
        this.previewElement.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing HoverLinkPreview...');
    new HoverLinkPreview();
});

// Also try immediate initialization in case DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded (via readyState check), initializing HoverLinkPreview...');
        new HoverLinkPreview();
    });
} else {
    console.log('DOM already loaded, initializing HoverLinkPreview immediately...');
    new HoverLinkPreview();
}

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HoverLinkPreview;
}
