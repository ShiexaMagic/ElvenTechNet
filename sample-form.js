// sample-form.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // 1. Select all elements needed
    const allSampleButtons = document.querySelectorAll('.sample-cta');
    const sampleFormContainer = document.getElementById('sample-form-container');
    const sampleForm = document.getElementById('sample-form');
    const closeSampleFormButton = document.getElementById('close-sample-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const closeThankYouButton = document.getElementById('close-thank-you');
    const sampleFormElement = document.querySelector('#sample-form form');
    
    console.log("Sample buttons found:", allSampleButtons.length);
    console.log("Form container found:", !!sampleFormContainer);
    
    // 2. Function to open the form
    function openSampleForm(e) {
        e.preventDefault();
        console.log("Opening sample form");
        sampleFormContainer.classList.remove('hidden');
        
        // Use setTimeout to ensure the transition works
        setTimeout(() => {
            sampleForm.classList.add('active');
        }, 10);
    }
    
    // 3. Function to close the form
    function closeSampleForm() {
        console.log("Closing sample form");
        sampleForm.classList.remove('active');
        
        // Use setTimeout to wait for the transition to finish
        setTimeout(() => {
            sampleFormContainer.classList.add('hidden');
        }, 300);
    }
    
    // 4. Function to show thank you message
    function showThankYou() {
        console.log("Showing thank you message");
        closeSampleForm();
        thankYouMessage.classList.remove('hidden');
    }
    
    // 5. Add click event to ALL sample buttons
    allSampleButtons.forEach(button => {
        button.addEventListener('click', openSampleForm);
        console.log("Added click handler to button");
    });
    
    // 6. Close form when close button is clicked
    if (closeSampleFormButton) {
        closeSampleFormButton.addEventListener('click', closeSampleForm);
    }
    
    // 7. Close thank you message when close button is clicked
    if (closeThankYouButton) {
        closeThankYouButton.addEventListener('click', function() {
            thankYouMessage.classList.add('hidden');
        });
    }
    
    // 8. Close form when clicking outside
    if (sampleFormContainer) {
        sampleFormContainer.addEventListener('click', function(e) {
            if (e.target === sampleFormContainer) {
                closeSampleForm();
            }
        });
    }
    
    // 9. Handle form submission
    if (sampleFormElement) {
        sampleFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submitted");
            
            // Collect form data
            const formData = {
                from_name: document.getElementById('sample-name').value,
                company: document.getElementById('sample-company').value,
                reply_to: document.getElementById('sample-email').value,
                phone: document.getElementById('sample-phone').value,
                sample_type: document.getElementById('sample-type').value,
                shipping_address: document.getElementById('sample-address').value,
                message: `Sample request for ${document.getElementById('sample-type').value}`,
                to_name: "Elven Team"
            };
            
            console.log("Sending email with data:", formData);
            
            // Send email via EmailJS
            emailjs.send("service_anf05h6", "template_sample_request", formData)
                .then(function(response) {
                    console.log("Email sent successfully:", response);
                    showThankYou();
                })
                .catch(function(error) {
                    console.error("Email failed to send:", error);
                    alert("There was a problem sending your request. Please try again or contact us directly.");
                });
        });
    }
});

<!-- Replace your current scripts with these -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.19/dist/lenis.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
   (function() {
      emailjs.init("qAFa7520_W9R7h2HK");
   })();
</script>
<script src="sample-form.js"></script>
<script src="fixed-script.js"></script>