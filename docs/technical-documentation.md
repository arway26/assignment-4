# Technical Documentation – Assignment 3 Portfolio Website


## 🧩 Project Overview

This interactive portfolio website serves as a personal showcase of skills, projects, achievements, and contact information. It is built using HTML, CSS (Flexbox/Grid), and JavaScript, and is designed to be responsive, clean, and easy to navigate. Features include state management, API integration, form validation, and performance optimizations.

---

## 📁 File Structure
```
assignment-3/
├── index.html                          # Main HTML file
├── css/
│   └── styles.css                      # Stylesheet
├── js/
│   └── script.js                       # JavaScript for interactivity
├── assets/
│   └── images/                         # Image assets (favicon, profile, logos, skill icons)
├── docs/
│   ├── ai-usage-report.md             # Details AI tools, benefits, challenges, and learning outcomes
│   └── technical-documentation.md      # Technical details, structure, and implementation overview
└── README.md                           # Project description and overview
```


## 🏗 Architecture

**HTML Structure:** Defines layout sections including header, about, education, skills, projects, achievements, extracurricular, and contact form.

**CSS Organization:** Uses modular organization with sections for layout, typography, responsive design, and theme support.

**JavaScript Modules:** Handles interactivity, animations, API integration, state management, and theme toggle functionality.


## 🧱 HTML Structure

**Header:** Contains website title, navigation menu, theme toggle, login/logout button, visitor name input, and visitor timer.

**About Me Section:** Brief introduction, tagline, and emoji profile image.

**Education Section:** Displays the degree and relevant courses.

**Skills Section:** Displays computer and language skills.

**Projects Section:** Displays project cards with title, description, and technologies. Includes toggle button to show/hide section.

**Achievements Section:** Display achievements with their description and dates.

**Extracurricular Section:** Displays extracurricular activities and their descriptions.

**Contact Section:** Includes validated form with fields for Name, Email, and Message. Features submission counter, GitHub stats, and AI message assistant.

**Footer:** Contains copyright information.



## 🎨 CSS Structure

**Layout:** Built using Flexbox and CSS Grid for a responsive layout.

**Typography:** Uses consistent font families, weights, and spacing for readability.

**Colors & Themes:** Supports light and dark modes using CSS variables.

**Responsive Design:** Media queries ensure adaptability across desktop, tablet, and mobile devices.

**Animations:** Uses GPU-accelerated transforms and Intersection Observer for smooth, performant animations.


## ⚙️ JavaScript Functionality

### Key Functions

**init()**  
Purpose: Initializes all features when DOM loads.

**setupThemeToggle()**  
Purpose: Manages switching between dark and light modes using localStorage.

**setupLoginLogout()**  
Purpose: Handles login/logout state simulation with localStorage persistence.

**setupVisitorName()**  
Purpose: Saves visitor name and displays personalized greeting.

**setupProjectsToggle()**  
Purpose: Controls projects section visibility with state persistence.

**setupVisitorTimer()**  
Purpose: Tracks and displays session duration using sessionStorage.

**fetchGitHubStats()**  
Purpose: Fetches user data from the GitHub API to display repository statistics.

**handleFormSubmit()**  
Purpose: Validates form fields and handles submission with multi-step checks.

**setupFormAutoSave()**  
Purpose: Auto-saves form data to localStorage with debouncing.

**improveMessageText()**  
Purpose: AI-powered text transformation for professional message formatting.

**setupScrollAnimations()**  
Purpose: Implements Intersection Observer for scroll-triggered animations.

**setupCollapsibleProjects()**  
Purpose: Expands or collapses project details dynamically when clicked.

**debounce()**  
Purpose: Performance optimization utility for preventing excessive function calls.


## 🌐 API References

**GitHub API:** https://api.github.com/users/arway26

Used to fetch GitHub profile information including repositories, followers, and following counts dynamically with error handling and retry functionality.


## 💾 State Management

**localStorage Keys:**
- `portfolioTheme` - Saves theme preference (light/dark)
- `userLoggedIn` - Saves login status (true/false)
- `visitorName` - Saves visitor's name
- `projectsHidden` - Saves projects visibility (true/false)
- `contactFormDraft` - Saves form draft data
- `contactFormSubmissions` - Saves submission history (last 10)

**sessionStorage Keys:**
- `visitorStartTime` - Tracks session start time for visitor timer


## 🚀 Performance Optimizations

**Defer Script Loading:** Non-blocking JavaScript with defer attribute.

**DNS Prefetch:** Faster external API connections with preconnect and dns-prefetch.

**GPU Acceleration:** Smooth scrolling with transform translateZ(0) and backface-visibility.

**Intersection Observer:** Efficient scroll animations only when elements are visible.

**Debouncing:** Prevents excessive function calls for form auto-save and scroll events.

**No Images:** Uses emoji icons for instant loading with zero image data.


## 🧰 Development Tools

**Code Editor:** Visual Studio Code (recommended)

**Version Control:** Git and GitHub for repository management

**AI Assistance:** ChatGPT and Claude AI were responsibly used for drafting content, refining ideas, and coding suggestions.

**Testing Tools:** Lighthouse for performance testing, Chrome DevTools for debugging.

**CodePen.io:** Community examples referenced for design patterns and animation techniques including 3D card flip animations, interactive UI components, and CSS transform effects.


## 🚀 Deployment

Open index.html in any modern web browser.

Optionally, run a local web server for testing:
```bash
python -m http.server
```

Then navigate to `http://localhost:8000`
