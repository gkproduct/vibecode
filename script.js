// Terrible JavaScript for Somali Messenger - Deliberately Bad UX

class TerribleSomaliMessenger {
    constructor() {
        this.messages = [];
        this.currentContact = null;
        this.isTyping = false;
        this.terribleSounds = true;
        this.autoScroll = true;
        this.badAnimations = true;
        
        this.initializeApp();
        this.setupEventListeners();
        this.addTerribleFeatures();
    }
    
    initializeApp() {
        console.log("🇸🇴 Somali Messenger initialized with terrible UX!");
        
        // Add terrible loading animation
        this.showTerribleLoading();
        
        // Initialize with first contact
        this.switchContact(document.querySelector('.contact'));
        
        // Add random terrible effects
        this.addRandomTerribleEffects();
    }
    
    setupEventListeners() {
        // Send message functionality
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Contact switching
        document.querySelectorAll('.contact').forEach(contact => {
            contact.addEventListener('click', () => this.switchContact(contact));
        });
        
        // Search functionality (terrible implementation)
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => this.terribleSearch(e.target.value));
        
        // Add terrible hover effects
        this.addTerribleHoverEffects();
    }
    
    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value.trim();
        
        if (!messageText) {
            this.showTerribleError("Fariinta waa madhan!");
            return;
        }
        
        // Add terrible delay
        setTimeout(() => {
            this.addMessage(messageText, 'sent');
            messageInput.value = '';
            
            // Terrible auto-reply with random delay
            setTimeout(() => {
                this.addTerribleAutoReply();
            }, Math.random() * 3000 + 1000);
            
            // Show terrible popup
            this.showTerriblePopup();
            
        }, Math.random() * 2000 + 500);
    }
    
    addMessage(text, type) {
        const messagesContainer = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        // Add terrible animation
        if (this.badAnimations) {
            messageDiv.style.animation = 'slideIn 0.5s ease';
            messageDiv.style.transform = 'scale(0)';
            setTimeout(() => {
                messageDiv.style.transform = 'scale(1)';
            }, 100);
        }
        
        messagesContainer.appendChild(messageDiv);
        
        // Terrible auto-scroll
        if (this.autoScroll) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
        
        // Add terrible sound effect
        if (this.terribleSounds) {
            this.playTerribleSound();
        }
        
        // Store message
        this.messages.push({
            text: text,
            type: type,
            timestamp: now,
            contact: this.currentContact
        });
    }
    
    addTerribleAutoReply() {
        const terribleReplies = [
            "Haa, waan fahmay!",
            "Waa runtaa!",
            "Maanta waa maalin fiican",
            "Waxaan rabaa inaan ku sheego...",
            "Subax wanaagsan!",
            "Mahadsanid!",
            "Waa maxay?",
            "Haa, waan fiicanahay",
            "Waxaan rabaa inaan...",
            "Maanta waa...",
            "Waa runtaa, mahadsanid!",
            "Haa, waan fahmay!",
            "Waxaan rabaa inaan ku sheego wax...",
            "Maanta waa maalin...",
            "Waa maxay, sidee tahay?"
        ];
        
        const randomReply = terribleReplies[Math.floor(Math.random() * terribleReplies.length)];
        this.addMessage(randomReply, 'received');
    }
    
    switchContact(contactElement) {
        // Remove active class from all contacts
        document.querySelectorAll('.contact').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked contact
        contactElement.classList.add('active');
        
        // Terrible animation
        contactElement.style.animation = 'glow 2s infinite';
        
        // Update chat header
        const name = contactElement.querySelector('.name').textContent;
        const avatar = contactElement.querySelector('.avatar').textContent;
        
        document.querySelector('.user-name').textContent = name;
        document.querySelector('.chat-header .avatar').textContent = avatar;
        
        // Clear messages and add terrible loading
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = '<div class="terrible-loading">Loading terrible messages...</div>';
        
        // Add terrible delay before showing messages
        setTimeout(() => {
            this.loadTerribleMessages();
        }, Math.random() * 2000 + 1000);
        
        this.currentContact = name;
    }
    
    loadTerribleMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = '';
        
        // Add some terrible sample messages
        const sampleMessages = [
            { text: "Subax wanaagsan! Sidee tahay?", type: "received", time: "12:30" },
            { text: "Waan fiicanahay, mahadsanid! Adiguna sidee tahay?", type: "sent", time: "12:32" },
            { text: "Waan fiicanahay, mahadsanid! Waxaan rabaa inaan ku sheego...", type: "received", time: "12:34" },
            { text: "Waa maxay?", type: "received", time: "12:35" },
            { text: "Waxaan rabaa inaan ku sheego wax muhiim ah", type: "sent", time: "12:36" }
        ];
        
        sampleMessages.forEach((msg, index) => {
            setTimeout(() => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${msg.type}`;
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                `;
                messagesContainer.appendChild(messageDiv);
                
                // Terrible animation
                if (this.badAnimations) {
                    messageDiv.style.animation = 'slideIn 0.5s ease';
                }
            }, index * 200);
        });
    }
    
    terribleSearch(query) {
        const contacts = document.querySelectorAll('.contact');
        
        contacts.forEach(contact => {
            const name = contact.querySelector('.name').textContent.toLowerCase();
            const message = contact.querySelector('.last-message').textContent.toLowerCase();
            
            if (name.includes(query.toLowerCase()) || message.includes(query.toLowerCase())) {
                contact.style.display = 'flex';
                // Add terrible highlight effect
                contact.style.background = 'linear-gradient(45deg, #ffff00, #ff00ff)';
                setTimeout(() => {
                    contact.style.background = '';
                }, 1000);
            } else {
                contact.style.display = 'none';
            }
        });
    }
    
    showTerriblePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'flex';
        
        // Add terrible animation
        popup.style.animation = 'popupAppear 0.5s ease';
        
        // Auto-hide after terrible delay
        setTimeout(() => {
            this.closePopup();
        }, Math.random() * 3000 + 2000);
    }
    
    closePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }
    
    showTerribleError(message) {
        // Create terrible error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'terrible-error';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff0000, #ff6b6b);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            border: 3px solid #ffff00;
            z-index: 1000;
            animation: shake 0.5s ease infinite;
            font-weight: bold;
            text-shadow: 2px 2px 0px #000;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after terrible delay
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    showTerribleLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'terrible-loading';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            border: 5px solid #ffff00;
            z-index: 1000;
            font-size: 18px;
            font-weight: bold;
            animation: pulse 1s infinite;
        `;
        loadingDiv.textContent = "Loading terrible Somali Messenger...";
        
        document.body.appendChild(loadingDiv);
        
        setTimeout(() => {
            loadingDiv.remove();
        }, 2000);
    }
    
    playTerribleSound() {
        // Create terrible beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    addTerribleHoverEffects() {
        // Add terrible hover effects to all interactive elements
        document.querySelectorAll('button, .contact, .message').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.1) rotate(5deg)';
                element.style.filter = 'hue-rotate(180deg)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg)';
                element.style.filter = 'hue-rotate(0deg)';
            });
        });
    }
    
    addRandomTerribleEffects() {
        // Add random terrible effects every few seconds
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance
                this.addRandomTerribleEffect();
            }
        }, 5000);
    }
    
    addRandomTerribleEffect() {
        const effects = [
            () => {
                // Random color change
                document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 2000);
            },
            () => {
                // Random shake
                document.body.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
            },
            () => {
                // Random popup
                this.showTerriblePopup();
            }
        ];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    }
    
    addTerribleFeatures() {
        // Add terrible keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                this.showTerriblePopup();
            }
            
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.showTerribleError("Waxaan ku jiraa terrible save!");
            }
        });
        
        // Add terrible right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showTerribleError("Right-click waa qaab xun!");
        });
        
        // Add terrible double-click effects
        document.addEventListener('dblclick', (e) => {
            e.target.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                e.target.style.animation = '';
            }, 500);
        });
    }
}

// Initialize the terrible messenger when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerribleSomaliMessenger();
});

// Add terrible global functions
window.closePopup = function() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
};

// Add terrible CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .terrible-loading {
        text-align: center;
        padding: 20px;
        color: #ff00ff;
        font-weight: bold;
        animation: pulse 1s infinite;
    }
`;
document.head.appendChild(style);
