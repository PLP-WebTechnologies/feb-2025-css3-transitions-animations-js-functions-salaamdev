// Get DOM elements
const animatedElement = document.querySelector('.animated-element');
const speedButtons = document.querySelectorAll('.speed-btn');
const colorButtons = document.querySelectorAll('.color-btn');

// Store user preferences in localStorage
function savePreferences(key, value) {
    localStorage.setItem(key, value);
}

// Retrieve user preferences from localStorage
function getPreferences(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}

// Apply saved preferences on page load
function loadSavedPreferences() {
    // Get saved preferences or use defaults
    const savedSpeed = getPreferences('animationSpeed', 'medium');
    const savedColor = getPreferences('animationColor', 'blue');
    
    // Apply saved speed
    animatedElement.classList.remove('slow', 'medium', 'fast');
    animatedElement.classList.add(savedSpeed);
    
    // Apply saved color
    animatedElement.classList.remove('red', 'blue', 'green');
    animatedElement.classList.add(savedColor);
    
    // Update button active state
    speedButtons.forEach(btn => {
        if (btn.dataset.speed === savedSpeed) {
            btn.style.opacity = '0.7';
        }
    });
    
    colorButtons.forEach(btn => {
        if (btn.dataset.color === savedColor) {
            btn.style.opacity = '0.7';
        }
    });
}

// Change animation speed
speedButtons.forEach(button => {
    button.addEventListener('click', () => {
        const speed = button.dataset.speed;
        
        // Remove all speed classes
        animatedElement.classList.remove('slow', 'medium', 'fast');
        
        // Add selected speed class
        animatedElement.classList.add(speed);
        
        // Update button active state
        speedButtons.forEach(btn => btn.style.opacity = '1');
        button.style.opacity = '0.7';
        
        // Save preference
        savePreferences('animationSpeed', speed);
    });
});

// Change animation color
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        
        // Remove all color classes
        animatedElement.classList.remove('red', 'blue', 'green');
        
        // Add selected color class
        animatedElement.classList.add(color);
        
        // Update button active state
        colorButtons.forEach(btn => btn.style.opacity = '1');
        button.style.opacity = '0.7';
        
        // Trigger a special effect when color changes
        animatedElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            animatedElement.style.transform = '';
        }, 300);
        
        // Save preference
        savePreferences('animationColor', color);
    });
});

// Load saved preferences when page loads
document.addEventListener('DOMContentLoaded', loadSavedPreferences);
