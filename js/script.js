// ============================================================================
// PORTFOLIO JAVASCRIPT - FINAL CLEAN VERSION
// ============================================================================

document.addEventListener('DOMContentLoaded', init);

function init() {
    setupThemeToggle(); // Set theme first
    setupVisitorName();
    setupProjectsToggle();
    setupSmoothScrolling();
    setupScrollAnimations();
    setup3DProjectCards();
    setupSkillsCarousel();
    setupBlobBackgrounds();
    displayGreeting();
    addInteractiveFeatures();
    triggerTypingEffect();
    setupContactForm();
    setupSendMessageButton();
    loadDynamicContent();
    setupVisitorTimer();
}

// ============================================================================
// PARALLAX STARS BACKGROUND
// ============================================================================

function multipleBoxShadow(n, color) {
    let value = '';
    for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        value += `${x}px ${y}px ${color}`;
        if (i < n - 1) {
            value += ', ';
        }
    }
    return value;
}

function setupParallaxStars() {
    const stars = document.getElementById('stars');
    const stars2 = document.getElementById('stars2');
    const stars3 = document.getElementById('stars3');
    
    // Check if dark mode is active
    const isDarkMode = document.body.classList.contains('dark');
    const starColor = isDarkMode ? '#FFF' : '#4A5568'; // White for dark mode, dark gray for light mode
    
    if (stars) {
        const shadowsSmall = multipleBoxShadow(700, starColor);
        stars.style.setProperty('--star-shadow', shadowsSmall);
        stars.style.boxShadow = shadowsSmall;
        // Force opacity for dark mode
        if (isDarkMode) {
            stars.style.opacity = '1';
        }
    }
    
    if (stars2) {
        const shadowsMedium = multipleBoxShadow(200, starColor);
        stars2.style.setProperty('--star-shadow', shadowsMedium);
        stars2.style.boxShadow = shadowsMedium;
        // Force opacity for dark mode
        if (isDarkMode) {
            stars2.style.opacity = '1';
        }
    }
    
    if (stars3) {
        const shadowsBig = multipleBoxShadow(100, starColor);
        stars3.style.setProperty('--star-shadow', shadowsBig);
        stars3.style.boxShadow = shadowsBig;
        // Force opacity for dark mode
        if (isDarkMode) {
            stars3.style.opacity = '1';
        }
    }
}

// ============================================================================
// VISITOR TIMER
// ============================================================================

function setupVisitorTimer() {
    const timerElement = document.getElementById('visitorTimer');
    if (!timerElement) return;
    
    // Get start time from sessionStorage (persists during session)
    let startTime = sessionStorage.getItem('visitorStartTime');
    
    if (!startTime) {
        // First visit - set start time
        startTime = Date.now();
        sessionStorage.setItem('visitorStartTime', startTime);
    } else {
        startTime = parseInt(startTime);
    }
    
    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        
        let timeText;
        if (minutes === 0) {
            timeText = `You've been here for ${seconds} second${seconds !== 1 ? 's' : ''}`;
        } else if (minutes === 1) {
            timeText = `You've been here for 1 minute`;
        } else {
            timeText = `You've been here for ${minutes} minutes`;
        }
        
        timerElement.textContent = timeText;
    }
    
    // Update immediately
    updateTimer();
    
    // Update every second for accurate display
    setInterval(updateTimer, 1000);
    
    // Handle page visibility - pause/resume tracking
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, but we'll keep the timer running
            // User might come back to see their total time
        } else {
            // Page is visible again - timer continues from where it left off
            updateTimer();
        }
    });
}

// ============================================================================
// THEME TOGGLE - LOCAL STORAGE
// ============================================================================

function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('portfolioTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        html.classList.add('dark-mode');
        toggle.checked = true;
    }
    
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark');
            html.classList.add('dark-mode');
            localStorage.setItem('portfolioTheme', 'dark');
        } else {
            body.classList.remove('dark');
            html.classList.remove('dark-mode');
            localStorage.setItem('portfolioTheme', 'light');
        }
        // Update submission count color when theme changes
        if (typeof displaySubmissionCount === 'function') {
            displaySubmissionCount();
        }
    });
}

// ============================================================================
// GITHUB API INTEGRATION WITH LOADING & ERROR HANDLING
// ============================================================================

function loadDynamicContent() {
    fetchGitHubStats();
}

async function fetchGitHubStats() {
    const username = 'arway26'; // Replace with your actual GitHub username
    const githubContactCard = document.getElementById('githubContactCard');
    const githubContactInfo = document.getElementById('githubContactInfo');
    
    if (!githubContactCard || !githubContactInfo) return;
    
    // Show loading state
    githubContactInfo.textContent = 'Loading...';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        // Update the contact card with GitHub info including stats
        githubContactInfo.innerHTML = `
            <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; margin-bottom: 0.3rem;">@${username}</a>
            <div style="font-size: 0.85rem; opacity: 0.9; text-align: center;">${data.public_repos} repos • ${data.followers} followers</div>
        `;
    } catch (error) {
        console.error('Error:', error);
        // Fallback: just show the username link
        githubContactInfo.innerHTML = `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer">@${username}</a>`;
    }
}

function createGitHubStatsSection() {
    const contactSection = document.getElementById('contact');
    const contactContent = contactSection.querySelector('.contact-content');
    const contactInfo = contactContent.querySelector('.contact-info');
    let container = document.querySelector('.github-stats-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'github-stats-container';
        
        container.style.cssText = `
            margin-top: 2rem; padding: 1rem; background: transparent;
            border-radius: var(--radius); box-shadow: none;
            max-width: 400px; margin-left: auto; margin-right: auto;
        `;
        if (contactInfo) {
            contactInfo.parentNode.insertBefore(container, contactInfo.nextSibling);
        } else {
            contactContent.appendChild(container);
        }
    }
    return container;
}

function displayGitHubLoading(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #666;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; font-weight: 600; color: var(--primary);">Loading GitHub Stats...</p>
        </div>
    `;
}

function displayGitHubStats(container, data, username) {
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 0.75rem;">
            <h3 style="color: var(--primary); margin-bottom: 0.25rem; font-size: 1rem;">Connect on GitHub</h3>
            <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" 
               style="color: var(--secondary); text-decoration: none; font-weight: 600; font-size: 0.9rem;">
                @${username} 🔗
            </a>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; text-align: center;">
            <div><div style="font-size: 1.5rem;">🎯</div><div style="font-size: 1.1rem; font-weight: bold; color: var(--primary);">${data.public_repos}</div><div style="color: #666; font-size: 0.8rem;">Repos</div></div>
            <div><div style="font-size: 1.5rem;">👥</div><div style="font-size: 1.1rem; font-weight: bold; color: var(--secondary);">${data.followers}</div><div style="color: #666; font-size: 0.8rem;">Followers</div></div>
            <div><div style="font-size: 1.5rem;">✨</div><div style="font-size: 1.1rem; font-weight: bold; color: var(--primary);">${data.following}</div><div style="color: #666; font-size: 0.8rem;">Following</div></div>
        </div>
    `;
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.transition = 'opacity 0.6s ease';
        container.style.opacity = '1';
    }, 100);
}

function displayGitHubStatsFallback(container, username) {
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Unable to Load GitHub Stats</h3>
            <p style="margin-bottom: 1rem;">We couldn't fetch the latest data. This might be due to:</p>
            <ul style="text-align: left; display: inline-block; margin-bottom: 1.5rem;">
                <li>Network connection issues</li>
                <li>GitHub API rate limit</li>
                <li>Temporary server error</li>
            </ul>
            <div>
                <button onclick="window.location.reload()" style="
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white; padding: 0.8rem 1.5rem; border: none;
                    border-radius: var(--radius); font-weight: 600;
                    cursor: pointer; margin-right: 0.5rem; transition: all 0.3s ease;
                ">
                    🔄 Retry
                </button>
                <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" style="
                    display: inline-block; padding: 0.8rem 1.5rem;
                    background: #333; color: white; text-decoration: none;
                    border-radius: var(--radius); font-weight: 600; transition: all 0.3s ease;
                ">
                    Visit GitHub Profile →
                </a>
            </div>
        </div>
    `;
}

// ============================================================================
// CONTACT FORM WITH VALIDATION & ERROR HANDLING
// ============================================================================

function setupContactForm() {
    const form = document.querySelector('#contactForm form');
    if (!form) return;
    
    displaySubmissionCount();
    loadSavedFormData(form);
    setupFormAutoSave(form);
    addCharacterCounter(form);
    addAIAssistant(form);
    form.addEventListener('submit', handleFormSubmit);
}

function displaySubmissionCount() {
    const submissions = getFormSubmissions();
    const contactSection = document.getElementById('contact');
    let countDisplay = document.querySelector('.submission-count');
    
    if (countDisplay) countDisplay.remove();
    
    const isDark = document.body.classList.contains('dark');
    const textColor = isDark ? '#fff' : '#000';
    
    if (submissions.length === 0) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'submission-count empty-state';
        countDisplay.style.cssText = `
            text-align: center; padding: 1.5rem;
            background: transparent;
            color: ${textColor}; border-radius: var(--radius); margin-bottom: 1rem;
            border: none;
        `;
        countDisplay.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
            <p style="margin: 0; font-weight: 600; color: ${textColor};">No messages sent yet</p>
            <p style="margin: 0.5rem 0 0; font-size: 0.9rem; color: ${textColor};">Be the first to send a message using the form below!</p>
        `;
    } else {
        countDisplay = document.createElement('div');
        countDisplay.className = 'submission-count';
        countDisplay.style.cssText = `
            text-align: center; padding: 1rem;
            background: transparent;
            color: ${textColor} !important; border-radius: var(--radius); margin-bottom: 1rem; font-weight: 600;
        `;
        countDisplay.innerHTML = `<span style="color: ${textColor} !important;">📬 You've sent ${submissions.length} message${submissions.length !== 1 ? 's' : ''}!</span>`;
    }
    
    const contactContent = contactSection.querySelector('.contact-content');
    const sendMessageBtnContainer = contactContent.querySelector('.send-message-btn-container');
    
    // Insert after contact-info and before send-message-btn-container
    if (sendMessageBtnContainer) {
        contactContent.insertBefore(countDisplay, sendMessageBtnContainer);
    } else {
        // Fallback: insert at the end if button container not found
        contactContent.appendChild(countDisplay);
    }
}

function addCharacterCounter(form) {
    const messageInput = form.querySelector('#message');
    const formGroup = messageInput.closest('.form-group');
    
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right; font-size: 0.85rem;
        color: #666; margin-top: 0.3rem;
    `;
    
    formGroup.appendChild(counter);
    
    const updateCounter = () => {
        const length = messageInput.value.length;
        const min = 10;
        counter.textContent = `${length} characters`;
        
        if (length < min) {
            counter.style.color = '#e74c3c';
            counter.textContent = `${length} / ${min} characters (minimum)`;
        } else {
            counter.style.color = '#2ecc71';
        }
    };
    
    messageInput.addEventListener('input', updateCounter);
    updateCounter();
}

function getFormSubmissions() {
    try {
        const data = localStorage.getItem('contactFormSubmissions');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

function loadSavedFormData(form) {
    try {
        const saved = localStorage.getItem('contactFormDraft');
        if (!saved) return;
        
        const data = JSON.parse(saved);
        if (data.name) form.querySelector('#name').value = data.name;
        if (data.email) form.querySelector('#email').value = data.email;
        if (data.message) form.querySelector('#message').value = data.message;
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

function setupFormAutoSave(form) {
    const inputs = form.querySelectorAll('#name, #email, #message');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            try {
                const formData = {
                    name: form.querySelector('#name').value,
                    email: form.querySelector('#email').value,
                    message: form.querySelector('#message').value
                };
                localStorage.setItem('contactFormDraft', JSON.stringify(formData));
            } catch (error) {
                console.error('Error saving draft:', error);
            }
            
            validateFieldRealtime(input);
        }, 500));
    });
}

function validateFieldRealtime(input) {
    const value = input.value.trim();
    const fieldName = input.id;
    
    const existingIcon = input.parentElement.querySelector('.validation-icon');
    if (existingIcon) existingIcon.remove();
    
    let isValid = false;
    
    if (fieldName === 'name' && value.length >= 2) {
        isValid = true;
    } else if (fieldName === 'email' && isValidEmail(value)) {
        isValid = true;
    } else if (fieldName === 'message' && value.length >= 10) {
        isValid = true;
    }
    
    if (value.length > 0) {
        const icon = document.createElement('span');
        icon.className = 'validation-icon';
        icon.textContent = isValid ? '✓' : '✗';
        icon.style.cssText = `
            position: absolute; right: 1rem; top: 50%;
            transform: translateY(-50%); font-size: 1.2rem;
            font-weight: bold; color: ${isValid ? '#2ecc71' : '#e74c3c'};
            pointer-events: none;
        `;
        
        const formGroup = input.closest('.form-group');
        formGroup.style.position = 'relative';
        formGroup.appendChild(icon);
        
        input.style.borderColor = isValid ? '#2ecc71' : '#ddd';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = e.target.querySelector('.submit-btn');
    
    clearFormErrors();
    
    let isValid = true;
    
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '📤 Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        
        setTimeout(() => {
            try {
                saveFormSubmission(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim());
                showSuccessMessage(nameInput.value.trim());
                e.target.reset();
                localStorage.removeItem('contactFormDraft');
                displaySubmissionCount();
                
                // Hide form and show button again after successful submission
                const contactForm = document.getElementById('contactForm');
                const sendMessageBtn = document.getElementById('sendMessageBtn');
                if (contactForm && sendMessageBtn) {
                    contactForm.classList.remove('show');
                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        sendMessageBtn.style.display = 'block';
                        // Delay scrolling to button so user can see the thank you message
                        // Scroll after the success message has been visible for a while
                        setTimeout(() => {
                            sendMessageBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 5000);
                    }, 400);
                }
            } catch (error) {
                showErrorMessage('Failed to save your message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        }, 1000);
    }
}

function saveFormSubmission(name, email, message) {
    const submission = { name, email, message, timestamp: new Date().toISOString() };
    const submissions = getFormSubmissions();
    submissions.push(submission);
    localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions.slice(-10)));
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    input.classList.add('error');
    formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function showSuccessMessage(name) {
    const contactSection = document.getElementById('contact');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <h3>Thank you, ${name}!</h3>
            <p>Your message has been saved. I'll get back to you soon!</p>
        </div>
    `;
    contactSection.insertBefore(successDiv, contactSection.firstChild);
    // Scroll to success message and keep it in view
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Keep the message visible longer so user can read it
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 300);
    }, 7000);
}

function showErrorMessage(message) {
    const contactSection = document.getElementById('contact');
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white; padding: 1.5rem; border-radius: var(--radius);
        margin-bottom: 1rem; text-align: center;
    `;
    errorDiv.innerHTML = `<p style="margin: 0;">❌ ${message}</p>`;
    contactSection.insertBefore(errorDiv, contactSection.firstChild);
    setTimeout(() => errorDiv.remove(), 4000);
}

// ============================================================================
// AI WRITING ASSISTANT FOR CONTACT FORM
// ============================================================================

function addAIAssistant(form) {
    const messageGroup = form.querySelector('#message').closest('.form-group');
    
    const aiContainer = document.createElement('div');
    aiContainer.className = 'ai-assistant';
    aiContainer.style.cssText = `
        margin-top: 1rem; padding: 1rem;
        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
        border-radius: var(--radius); border: 2px solid var(--primary);
    `;
    
    aiContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="font-size: 1.5rem;">✨</span>
            <strong style="color: var(--primary);">AI Writing Assistant</strong>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600;">What would you like help with?</label>
            <select id="aiPurpose" style="
                width: 100%; padding: 0.6rem; border: 2px solid var(--primary);
                border-radius: var(--radius); font-size: 0.9rem;
                background: white; cursor: pointer;
            ">
                <option value="">-- Select a purpose --</option>
                <option value="job">Job Inquiry / Opportunity</option>
                <option value="collaboration">Project Collaboration</option>
                <option value="question">General Question</option>
                <option value="feedback">Feedback / Suggestion</option>
            </select>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" id="generateMessage" style="
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white; padding: 0.6rem 1.2rem; border: none;
                border-radius: var(--radius); font-weight: 600;
                cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;
            ">
                🤖 Generate Message
            </button>
            <button type="button" id="improveMessage" style="
                background: white; color: var(--primary);
                padding: 0.6rem 1.2rem; border: 2px solid var(--primary);
                border-radius: var(--radius); font-weight: 600;
                cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;
            ">
                ✍️ Improve My Message
            </button>
        </div>
    `;
    
    messageGroup.appendChild(aiContainer);
    
    document.getElementById('generateMessage').addEventListener('click', generateAIMessage);
    document.getElementById('improveMessage').addEventListener('click', improveAIMessage);
}

function generateAIMessage() {
    const purpose = document.getElementById('aiPurpose').value;
    const messageField = document.getElementById('message');
    const nameField = document.getElementById('name');
    const name = nameField.value.trim() || 'there';
    
    if (!purpose) {
        showAIFeedback('Please select a purpose first!', 'warning');
        return;
    }
    
    const btn = document.getElementById('generateMessage');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        const message = getAITemplate(purpose, name);
        messageField.value = message;
        messageField.style.borderColor = '#2ecc71';
        
        messageField.dispatchEvent(new Event('input'));
        
        btn.textContent = originalText;
        btn.disabled = false;
        
        showAIFeedback('Message generated! Feel free to customize it.', 'success');
    }, 1500);
}

function improveAIMessage() {
    const messageField = document.getElementById('message');
    const currentMessage = messageField.value.trim();
    
    if (!currentMessage || currentMessage.length < 10) {
        showAIFeedback('Please write a message first, then I can improve it!', 'warning');
        return;
    }
    
    const btn = document.getElementById('improveMessage');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Improving...';
    btn.disabled = true;
    
    setTimeout(() => {
        const improved = improveMessageText(currentMessage);
        messageField.value = improved;
        messageField.style.borderColor = '#2ecc71';
        
        messageField.dispatchEvent(new Event('input'));
        
        btn.textContent = originalText;
        btn.disabled = false;
        
        showAIFeedback('Message improved! More professional and clear.', 'success');
    }, 1500);
}

function getAITemplate(purpose, name) {
    const templates = {
        job: `Hello Arwa,

I hope this message finds you well. I came across your portfolio and was impressed by your skills in computer science and web development.

I'm reaching out to discuss potential opportunities where your expertise could be valuable. I believe your experience with ${['Python', 'Java', 'web technologies'][Math.floor(Math.random() * 3)]} would be a great fit.

Would you be available for a brief conversation to explore this further?

Best regards,
${name}`,
        
        collaboration: `Hi Arwa,

I've been exploring your portfolio and I'm really impressed by your projects, particularly your ${['software engineering', 'data science', 'web development'][Math.floor(Math.random() * 3)]} work.

I'm working on an exciting project and I think your skills could add tremendous value. Would you be interested in collaborating?

I'd love to discuss the details and see if this aligns with your interests.

Looking forward to hearing from you!
${name}`,
        
        question: `Hello Arwa,

I came across your portfolio and I'm curious about your experience in ${['AI and machine learning', 'web development', 'software engineering'][Math.floor(Math.random() * 3)]}.

I have a few questions about your approach and methodology, and I'd appreciate your insights.

Would you have time for a quick chat?

Thanks in advance,
${name}`,
        
        feedback: `Hi Arwa,

I recently visited your portfolio and wanted to share some thoughts. Your work showcases impressive technical skills and creativity.

I particularly appreciated ${['your project presentations', 'your clean design approach', 'your diverse skill set'][Math.floor(Math.random() * 3)]}.

I thought you might find this feedback helpful as you continue developing your portfolio.

Best wishes,
${name}`
    };
    
    return templates[purpose] || templates.question;
}

function improveMessageText(message) {
    let improved = message.trim();
    
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    
    if (!improved.match(/[.!?]$/)) {
        improved += '.';
    }
    
    const replacements = {
        'hey': 'Hello',
        'hi': 'Hello',
        'wanna': 'would like to',
        'gonna': 'going to',
        'ur': 'your',
        'u': 'you',
        'plz': 'please',
        'thx': 'thank you',
        'thanks': 'thank you'
    };
    
    Object.keys(replacements).forEach(casual => {
        const regex = new RegExp(`\\b${casual}\\b`, 'gi');
        improved = improved.replace(regex, replacements[casual]);
    });
    
    if (!improved.match(/^(Hello|Hi|Dear|Greetings)/i)) {
        improved = 'Hello,\n\n' + improved;
    }
    
    if (!improved.match(/(regards|sincerely|thanks|cheers)/i)) {
        improved += '\n\nBest regards';
    }
    
    return improved;
}

function showAIFeedback(message, type) {
    const existingFeedback = document.querySelector('.ai-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    const feedback = document.createElement('div');
    feedback.className = 'ai-feedback';
    
    const colors = {
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    const icons = {
        success: '✓',
        warning: '⚠️',
        error: '✗'
    };
    
    feedback.style.cssText = `
        margin-top: 0.5rem; padding: 0.8rem;
        background: ${colors[type]}; color: white;
        border-radius: var(--radius); font-size: 0.9rem;
        font-weight: 600; animation: slideInDown 0.3s ease;
    `;
    
    feedback.textContent = `${icons[type]} ${message}`;
    
    const aiContainer = document.querySelector('.ai-assistant');
    aiContainer.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-10px)';
        setTimeout(() => feedback.remove(), 300);
    }, 4000);
}

// ============================================================================
// UI FEATURES
// ============================================================================

function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight - 20, behavior: 'smooth' });
                updateActiveNavLink(this);
            }
        });
    });
    window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 10));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPos = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
        
        if (scrollPos >= top && scrollPos < bottom && navLink) {
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.id === 'about') triggerTypingEffect();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

// ============================================================================
// 3D PROJECT CARDS ROTATION
// ============================================================================

function setup3DProjectCards() {
    // Cards now flip on hover via CSS, no JavaScript needed
}

// ============================================================================
// SKILLS CAROUSEL
// ============================================================================

function setupSkillsCarousel() {
    const carouselList = document.querySelector('.carousel__list');
    const carouselItems = document.querySelectorAll('.carousel__item');
    
    if (!carouselList || !carouselItems.length) {
        return;
    }
    
    const elems = Array.from(carouselItems);
    
    carouselList.addEventListener('click', function (event) {
        var clickedElement = event.target;
        var carouselItem = clickedElement.closest('.carousel__item');
        
        if (!carouselItem) {
            return;
        }
        
        var currentPos = parseInt(carouselItem.dataset.pos);
        if (currentPos === 0) {
            return; // Already active
        }
        
        update(carouselItem);
    });
    
    const update = function(newActive) {
        const newActivePos = parseInt(newActive.dataset.pos);
        
        const current = elems.find((elem) => parseInt(elem.dataset.pos) === 0);
        const prev = elems.find((elem) => parseInt(elem.dataset.pos) === -1);
        const next = elems.find((elem) => parseInt(elem.dataset.pos) === 1);
        const first = elems.find((elem) => parseInt(elem.dataset.pos) === -2);
        const last = elems.find((elem) => parseInt(elem.dataset.pos) === 2);
        const second = elems.find((elem) => parseInt(elem.dataset.pos) === -3);
        const secondLast = elems.find((elem) => parseInt(elem.dataset.pos) === 3);
        
        if (current) {
            current.classList.remove('carousel__item_active');
        }
        
        const itemsToUpdate = [current, prev, next, first, last, second, secondLast].filter(Boolean);
        
        itemsToUpdate.forEach(item => {
            var itemPos = parseInt(item.dataset.pos);
            item.dataset.pos = getPos(itemPos, newActivePos);
        });
    };
    
    const getPos = function (current, active) {
        const diff = current - active;
        
        if (Math.abs(current - active) > 3) {
            return -current;
        }
        
        return diff;
    };
}

// ============================================================================
// BLOB BACKGROUND SETUP
// ============================================================================

function setupBlobBackgrounds() {
    const blobContainers = document.querySelectorAll('.blob-bg');
    if (!blobContainers.length) return;

    const getSafePercentage = (margin) =>
        Math.round(Math.random() * (100 - 2 * margin)) + margin;

    blobContainers.forEach(blobBg => {
        if (blobBg.dataset.initialized === 'true') return;
        blobBg.dataset.initialized = 'true';

        const safeArea = 6;
        let colors = [];
        const colorAttr = blobBg.getAttribute('data-colors');

        try {
            colors = JSON.parse(colorAttr);
        } catch (error) {
            colors = [];
        }

        if (!Array.isArray(colors) || colors.length === 0) {
            colors = ['#667eea', '#764ba2'];
        }

        const blobCount = parseInt(blobBg.getAttribute('data-blob-count'), 10) || 3;

        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.classList.add('blob');
            blob.style.top = `${getSafePercentage(safeArea)}%`;
            blob.style.left = `${getSafePercentage(safeArea)}%`;
            blob.style.animationDelay = `${(Math.random() - 0.5) * 8 * (i + 1)}s`;
            blob.style.backgroundColor = colors[i % colors.length];
            blobBg.appendChild(blob);
        }
    });
}

// ============================================================================
// VISITOR NAME GREETING
// ============================================================================

function setupVisitorName() {
    const nameInput = document.getElementById('visitorNameInput');
    const saveBtn = document.getElementById('saveNameBtn');
    
    if (!nameInput || !saveBtn) {
        return;
    }
    
    // Load saved name and populate input if exists
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        nameInput.value = savedName;
    }
    
    // Save button click handler
    saveBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Save name button clicked!');
        
        const name = nameInput.value.trim();
        console.log('Name value:', name);
        
        if (!name) {
            // Show error feedback
            nameInput.style.borderColor = 'rgba(231, 76, 60, 0.8)';
            setTimeout(() => {
                nameInput.style.borderColor = '';
            }, 2000);
            console.log('Name is empty, showing error');
            return false;
        }
        
        // Capitalize first letter
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        console.log('Capitalized name:', capitalizedName);
        
        // Save to localStorage
        localStorage.setItem('visitorName', capitalizedName);
        console.log('Name saved to localStorage:', capitalizedName);
        
        // Update greeting
        displayGreeting();
        
        // Show success popup
        showWelcomeNotification(capitalizedName);
        
        return false;
    };
    
    // Enter key to save
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveBtn.click();
        }
    });
}

function displayGreeting() {
    const greeting = document.getElementById('greeting');
    if (!greeting) return;
    
    // Get saved visitor name
    const visitorName = localStorage.getItem('visitorName');
    
    // Get time-based greeting
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour < 12) {
        timeGreeting = 'Good morning';
    } else if (hour < 18) {
        timeGreeting = 'Good afternoon';
    } else {
        timeGreeting = 'Good evening';
    }
    
    // Display greeting with or without name
    if (visitorName) {
        greeting.textContent = `${timeGreeting}, ${visitorName}! Welcome to my portfolio.`;
    } else {
        greeting.textContent = `${timeGreeting}! Welcome to my portfolio.`;
    }
}

function showWelcomeNotification(name) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.welcome-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.textContent = `✅ Welcome, ${name}! Your name has been saved.`;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================================================
// SHOW/HIDE PROJECTS TOGGLE
// ============================================================================

function setupProjectsToggle() {
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const projectsContent = document.getElementById('projectsContent');
    
    if (!toggleBtn || !projectsContent) {
        return;
    }
    
        // Get saved visibility state (default to visible/false)
        const isHidden = localStorage.getItem('projectsHidden') === 'true';
        
        // Update initial state
        updateProjectsVisibility(isHidden);
        
        // Add click event listener
        toggleBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get current state
            const currentHidden = localStorage.getItem('projectsHidden') === 'true';
            const newHidden = !currentHidden;
        
        // Save to localStorage
        localStorage.setItem('projectsHidden', newHidden ? 'true' : 'false');
        
        // Update UI
        updateProjectsVisibility(newHidden);
        
        // Show popup notification when hiding
        if (newHidden) {
            showProjectsNotification('✅ Projects section hidden');
        }
        
        return false;
    };
    
    function updateProjectsVisibility(hidden) {
        if (hidden) {
            // Hide projects section
            projectsContent.style.display = 'none';
            toggleBtn.textContent = '👁️ Show Projects';
            toggleBtn.classList.add('show-projects');
            toggleBtn.classList.remove('hide-projects');
            toggleBtn.title = 'Click to show projects';
        } else {
            // Show projects section
            projectsContent.style.display = '';
            toggleBtn.textContent = '🙈 Hide Projects';
            toggleBtn.classList.add('hide-projects');
            toggleBtn.classList.remove('show-projects');
            toggleBtn.title = 'Click to hide projects';
        }
    }
}

function showProjectsNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.projects-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'projects-notification';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function addInteractiveFeatures() {
    document.querySelectorAll('.project-card, .hobby-card, .achievement-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('collapsed')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function triggerTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (tagline && !tagline.classList.contains('typed')) {
        tagline.classList.add('typed');
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        setTimeout(type, 500);
    }
}

// ============================================================================
// SEND MESSAGE BUTTON
// ============================================================================

function setupSendMessageButton() {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const contactForm = document.getElementById('contactForm');
    const hideMessageBtn = document.getElementById('hideMessageBtn');
    
    if (!sendMessageBtn || !contactForm) {
        return;
    }
    
    // Show form when "Send a Message" is clicked
    sendMessageBtn.addEventListener('click', () => {
        // Hide button
        sendMessageBtn.style.display = 'none';
        
        // Show form with animation
        contactForm.style.display = 'block';
        setTimeout(() => {
            contactForm.classList.add('show');
        }, 10);
        
        // Scroll to form smoothly
        setTimeout(() => {
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    
    // Hide form when "Hide Form" is clicked
    if (hideMessageBtn) {
        hideMessageBtn.addEventListener('click', () => {
            // Hide form with animation
            contactForm.classList.remove('show');
            setTimeout(() => {
                contactForm.style.display = 'none';
                // Show button again
                sendMessageBtn.style.display = 'block';
                // Scroll to button
                sendMessageBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}