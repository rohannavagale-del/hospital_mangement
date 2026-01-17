document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supportForm');
    const responseBox = document.getElementById('response');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        responseBox.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Analyzing your request...</p>
            </div>
        `;
        responseBox.style.display = 'block';
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            issue: document.getElementById('issue').value.trim().toLowerCase(),
            urgency: document.getElementById('urgency').value
        };
        
        // Simulate API call delay
        try {
            const response = await simulateAICall(formData);
            showResponse(response);
        } catch (error) {
            showError("Sorry, we encountered an error. Please try again.");
        }
    });
    
    function simulateAICall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Basic response generation
                let category = "general health concern";
                let message = "";
                
                // Categorize the issue
                if (data.issue.includes("fever")) {
                    category = "fever-related issue";
                    message = `Thank you ${data.name}, for reporting your fever. `;
                    message += data.urgency === "High" 
                        ? "Given the high urgency, we recommend seeing a healthcare provider immediately." 
                        : "Please monitor your temperature and rest. If it persists beyond 3 days, consult a doctor.";
                } 
                else if (data.issue.includes("pain")) {
                    category = "pain-related issue";
                    message = `We understand you're experiencing pain, ${data.name}. `;
                    message += data.urgency === "High"
                        ? "Given the high urgency level, we recommend seeking immediate medical attention."
                        : "Consider over-the-counter pain relief if appropriate, and consult a doctor if symptoms persist.";
                }
                else if (data.issue.includes("appointment")) {
                    category = "appointment request";
                    message = `Your appointment request has been received, ${data.name}. `;
                    message += `We'll contact you at ${data.email} to confirm your appointment details.`;
                } 
                else {
                    message = `Thank you for your message, ${data.name}. `;
                    message += "Our healthcare team will review your concern and get back to you soon.";
                }
                
                resolve({
                    success: true,
                    category: category,
                    message: message,
                    urgency: data.urgency
                });
            }, 1500); // 1.5 second delay
        });
    }
    
    function showResponse(response) {
        const urgencyClass = response.urgency.toLowerCase();
        
        responseBox.innerHTML = `
            <div class="response-content ${urgencyClass}">
                <h3>AI-Assisted Response</h3>
                <p>${response.message}</p>
                <div class="response-meta">
                    <span class="category">Category: <strong>${response.category}</strong></span>
                    <span class="urgency-level">Urgency: <strong>${response.urgency}</strong></span>
                </div>
            </div>
        `;
    }
    
    function showError(message) {
        responseBox.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
                <button onclick="location.reload()">Try Again</button>
            </div>
        `;
    }
});
