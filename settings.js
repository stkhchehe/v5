// settings.js

// Theme Management
function initializeThemeSystem() {
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    document.body.style.backgroundImage = `url(${theme.background})`;
    document.querySelector('.sidebar').style.backgroundColor = theme.sidebar;
    document.querySelector('.browser-header').style.backgroundColor = theme.header;

    if (themeName === 'white') {
        document.body.classList.add('white-theme');
    } else {
        document.body.classList.remove('white-theme');
    }

    localStorage.setItem('currentTheme', themeName);
}

// Tab Cloaking System
function initializeTabCloaking() {
    const savedCloak = localStorage.getItem('tabCloak');
    if (savedCloak) {
        const {name, icon} = JSON.parse(savedCloak);
        applyTabCloak(name, icon);
    }
}

function applyTabCloak(name, icon) {
    document.title = name;
    
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
    favicon.href = icon;

    localStorage.setItem('tabCloak', JSON.stringify({name, icon}));
}

// Initialize both systems
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeSystem();
    initializeTabCloaking();
});

// Event Listeners for Theme Circles
document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        applyTheme(circle.dataset.theme);
    });
});

// Event Listeners for Tab Cloak Circles
document.querySelectorAll('.cloaker-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        const name = circle.dataset.name;
        const icon = circle.dataset.icon;
        applyTabCloak(name, icon);
    });
});
