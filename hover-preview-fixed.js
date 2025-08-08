// Enhanced Hover Preview Implementation
console.log('Hover preview script loaded');

class HoverLinkPreview {
    constructor() {
        this.preview = null;
        this.img = null;
        this.isVisible = false;
        this.init();
    }
    
    init() {
        console.log('Initializing hover preview...');
        this.createPreviewElement();
        this.setupEventListeners();
    }
    
    createPreviewElement() {
        // Create preview container
        this.preview = document.createElement('div');
        this.preview.id = 'hover-preview';
        this.preview.style.cssText = `
            position: fixed;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.8) translateY(-10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            padding: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            min-width: 180px;
            max-width: 320px;
        `;
        
        // Create image element
        this.img = document.createElement('img');
        this.img.style.cssText = `
            width: 192px;
            height: 112px;
            object-fit: cover;
            border-radius: 6px;
            display: block;
        `;
        this.img.draggable = false;
        
        this.preview.appendChild(this.img);
        document.body.appendChild(this.preview);
        
        console.log('Preview element created and added to DOM');
    }
    
    setupEventListeners() {
        // Find all preview links
        const links = document.querySelectorAll('a[data-preview]');
        console.log(`Found ${links.length} links with data-preview attribute`);
        
        links.forEach((link, index) => {
            const previewUrl = link.getAttribute('data-preview');
            console.log(`Link ${index + 1}: ${link.href} -> ${previewUrl}`);
            
            link.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
            link.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
            link.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        });
    }
    
    handleMouseEnter(e) {
        const link = e.target;
        const previewUrl = link.getAttribute('data-preview');
        const altText = link.getAttribute('data-preview-alt') || 'Link preview';
        
        console.log('Mouse entered link:', link.href, 'Preview:', previewUrl);
        
        if (!previewUrl) return;
        
        // Set image source
        this.img.src = previewUrl;
        this.img.alt = altText;
        
        // Show preview
        this.isVisible = true;
        this.preview.style.opacity = '1';
        this.preview.style.transform = 'scale(1) translateY(0)';
    }
    
    handleMouseLeave(e) {
        console.log('Mouse left link:', e.target.href);
        
        this.isVisible = false;
        this.preview.style.opacity = '0';
        this.preview.style.transform = 'scale(0.8) translateY(-10px)';
    }
    
    handleMouseMove(e) {
        if (!this.isVisible) return;
        
        const previewWidth = 192;
        const previewHeight = 112;
        const offset = 20;
        
        // Position preview near cursor but avoid going off-screen
        let x = e.clientX - previewWidth / 2;
        let y = e.clientY - previewHeight - offset;
        
        // Keep preview on screen
        if (x < 0) x = 0;
        if (x + previewWidth > window.innerWidth) x = window.innerWidth - previewWidth;
        if (y < 0) y = e.clientY + offset;
        
        this.preview.style.left = x + 'px';
        this.preview.style.top = y + 'px';
    }
}

// Initialize when DOM is ready
function initHoverPreview() {
    console.log('DOM ready, creating HoverLinkPreview instance...');
    new HoverLinkPreview();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoverPreview);
} else {
    initHoverPreview();
}
