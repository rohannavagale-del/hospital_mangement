document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // DOM Elements with null checks
    const elements = {
        chatbotToggle: document.getElementById('chatbotToggle'),
        chatbotContainer: document.getElementById('chatbotContainer'),
        closeChatbot: document.getElementById('closeChatbot'),
        chatMessages: document.getElementById('chatMessages'),
        userInput: document.getElementById('userInput'),
        sendButton: document.getElementById('sendMessage'),
        quickQuestions: document.querySelectorAll('.quick-question')
    };
    
    // Check if all required elements exist
    for (const [key, element] of Object.entries(elements)) {
        if (!element && key !== 'quickQuestions') {
            console.error(`Element not found: ${key}`);
            return;
        }
    }
    
    const { 
        chatbotToggle, 
        chatbotContainer, 
        closeChatbot, 
        chatMessages, 
        userInput, 
        sendButton, 
        quickQuestions 
    } = elements;

    // Toggle chat window
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.style.display = 'none';
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        setTimeout(() => {
            chatbotToggle.style.display = 'flex';
        }, 300);
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Simulate typing indicator
        const typingIndicator = addTypingIndicator();

        // Simulate bot response after a delay
        setTimeout(() => {
            typingIndicator.remove();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
            scrollToBottom();
        }, 1000);
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    // Generate bot response
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Simple response logic - you can expand this with more sophisticated responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm your healthcare assistant. How can I help you today?";
        } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
            return "To book an appointment, please provide your preferred date and time. You can also call our reception at (555) 123-4567.";
        } else if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
            return "Our clinic is open:\n\nMonday - Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed";
        } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
            return "We offer a wide range of healthcare services including:\n- General check-ups\n- Specialist consultations\n- Diagnostic tests\n- Emergency care\n- Vaccinations\n- And more!";
        } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
            return "For medical emergencies, please call 911 or go to the nearest emergency room immediately.";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            const responses = [
                "I'm here to help with your healthcare needs. Could you provide more details?",
                "I'm not sure I understand. Could you rephrase your question?",
                "I'm still learning! Could you ask me something else?",
                "For more specific medical advice, I recommend speaking with one of our healthcare professionals."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', (e) => {
            const question = e.target.getAttribute('data-question');
            userInput.value = question;
            sendMessage();
        });
    });

    // Send message on button click or Enter key
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Auto-scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initial scroll to bottom
    scrollToBottom();
});
