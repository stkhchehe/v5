// settings.js

// ========== Theme Configuration ==========
const themes = {
  default: {
    sidebar: '#343a40',
    header: '#343a40',
    urlBar: '#2b3035',
    sidebarHover: '#495057',
    tabBg: '#343a40',
    tabActiveBg: '#495057',
    background: 'https://images.unsplash.com/photo-1707924962886-12ad20367315'
  },
  black: {
    sidebar: '#000000',
    header: '#000000',
    urlBar: '#1a1a1a',
    sidebarHover: '#333333',
    tabBg: '#000000',
    tabActiveBg: '#212121',
    background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUs55nkjiEFR-2RL9nfedkXcYZCAcWNlfLpg&s'
  },
  white: {
    sidebar: '#ffffff',
    header: '#ffffff',
    urlBar: '#f5f5f5',
    sidebarHover: '#e0e0e0',
    tabBg: '#ffffff',
    tabActiveBg: '#f0f0f0',
    background: 'https://img.freepik.com/free-vector/white-gray-abstract-gradient-background_69286-550.jpg'
  },
  orange: {
    sidebar: '#ffcf7b',
    header: '#ffcf7b',
    urlBar: '#e6b85f',
    sidebarHover: '#ffd991',
    tabBg: '#ffcf7b',
    tabActiveBg: '#ffd54f',
    background: 'https://img.freepik.com/free-photo/background-gradient-lights_23-2149304997.jpg'
  },
  tan: {
    sidebar: '#d2b48c',
    header: '#d2b48c',
    urlBar: '#bca07c',
    sidebarHover: '#e0c4a0',
    tabBg: '#d2b48c',
    tabActiveBg: '#c49e6c',
    background: 'https://t3.ftcdn.net/jpg/09/14/74/04/360_F_914740449_kGiQ9SryhURbePRwE53Nvh4DK6R3WS40.jpg'
  },
  'light-purple': {
    sidebar: '#b39ddb',
    header: '#b39ddb',
    urlBar: '#9c85c9',
    sidebarHover: '#c4b2e5',
    tabBg: '#b39ddb',
    tabActiveBg: '#9575cd',
    background: 'https://images.unsplash.com/photo-1617957689233-207e3cd3c610'
  },
  brown: {
    sidebar: '#795548',
    header: '#795548',
    urlBar: '#654437',
    sidebarHover: '#8d6e63',
    tabBg: '#795548',
    tabActiveBg: '#6d4c41',
    background: 'https://img.freepik.com/free-photo/abstract-smooth-brown-wall-background-layout-design-studio-room-web-template-business-report-with-smooth-circle-gradient-color_1258-55653.jpg'
  },
  'light-green': {
    sidebar: '#3d704f',
    header: '#3d704f',
    urlBar: '#2f5b3e',
    sidebarHover: '#4d8761',
    tabBg: '#3d704f',
    tabActiveBg: '#2c6e3b',
    background: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d'
  },
  pink: {
    sidebar: '#f48fb1',
    header: '#f48fb1',
    urlBar: '#e07a9b',
    sidebarHover: '#f7a4c1',
    tabBg: '#f48fb1',
    tabActiveBg: '#f06292',
    background: 'https://img.freepik.com/premium-vector/pink-gradient-color-background-illustration-pink-radial-gradient-background-wallpapers_1199668-67.jpg'
  },
  'light-blue': {
    sidebar: '#81d4fa',
    header: '#81d4fa',
    urlBar: '#69bfe6',
    sidebarHover: '#97ddff',
    tabBg: '#81d4fa',
    tabActiveBg: '#4fc3f7',
    background: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3773.jpg'
  }
};

// ========== Theme Application ==========
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  // Set CSS variables
  document.documentElement.style.setProperty('--theme-sidebar', theme.sidebar);
  document.documentElement.style.setProperty('--theme-header', theme.header);
  document.documentElement.style.setProperty('--theme-url-bar', theme.urlBar);
  document.documentElement.style.setProperty('--theme-sidebar-hover', theme.sidebarHover);
  document.documentElement.style.setProperty('--theme-tab-bg', theme.tabBg);
  document.documentElement.style.setProperty('--theme-tab-active', theme.tabActiveBg);

  // Apply theme to elements
  const elements = {
    sidebar: document.querySelector('.sidebar'),
    header: document.querySelector('.browser-header'),
    urlBar: document.querySelector('.url-bar-wrapper'),
    tabs: document.querySelector('.tabs-container'),
    themeContainers: document.querySelectorAll('.theme-container')
  };

  requestAnimationFrame(() => {
    // Apply colors
    elements.sidebar.style.backgroundColor = theme.sidebar;
    elements.header.style.backgroundColor = theme.header;
    elements.urlBar.style.backgroundColor = theme.urlBar;
    elements.tabs.style.backgroundColor = theme.tabBg;

    // Apply to theme containers
    elements.themeContainers.forEach(container => {
      container.style.backgroundColor = theme.sidebar;
    });

    // Update background
    document.body.style.backgroundImage = `url(${theme.background})`;
  });

  // Handle white theme specific styles
  const isWhiteTheme = themeName === 'white';
  document.body.classList.toggle('white-theme', isWhiteTheme);

  // Update text colors
  const textColor = isWhiteTheme ? '#000000' : '#ffffff';
  document.querySelectorAll('.theme-title, .particle-label, .blank-button').forEach(el => {
    el.style.color = textColor;
  });

  // Save theme preference
  localStorage.setItem('currentTheme', themeName);
}

// ========== Particle Effects ==========
function updateParticles(type = 'default') {
  const configs = {
    default: {
      particles: {
        number: { value: 20 },
        color: { value: '#ffffff' },
        size: { value: 3 },
        line_linked: { enable: true }
      }
    },
    floating: {
      particles: {
        number: { value: 50 },
        color: { value: '#ffffff' },
        size: { value: 2 },
        line_linked: { enable: false },
        move: { direction: 'top', speed: 1 }
      }
    },
    none: {
      particles: { number: { value: 0 } }
    }
  };

  if (window.pJSDom && window.pJSDom[0]) {
    if (type === 'none') {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      return;
    }
    particlesJS('particles-js', configs[type]);
  }
}

// ========== Event Listeners ==========
document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme
  const savedTheme = localStorage.getItem('currentTheme');
  if (savedTheme) applyTheme(savedTheme);

  // Theme circle clicks
  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      applyTheme(circle.dataset.theme);
    });
  });

  // Particle option clicks
  document.querySelectorAll('.particle-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.particle-option').forEach(opt => 
        opt.classList.remove('active'));
      option.classList.add('active');
      updateParticles(option.dataset.particle);
      localStorage.setItem('particlePreference', option.dataset.particle);
    });
  });

  // Load saved particle preference
  const savedParticleType = localStorage.getItem('particlePreference') || 'default';
  document.querySelector(`[data-particle="${savedParticleType}"]`)?.classList.add('active');
  updateParticles(savedParticleType);
});

// ========== About:blank Launcher ==========
function launchBlank() {
  const win = window.open('about:blank', '_blank');
  win.document.write(`
    <html>
      <head>
        <title>about:blank</title>
      </head>
      <body>
        <iframe src="${window.location.href}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
        </iframe>
      </body>
    </html>
  `);
}
