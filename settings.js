// ========== Theme Configuration ==========
const themes = {
  default: {
    sidebar: '#343a40',
    header: '#343a40',
    tabBg: '#343a40',
    tabActiveBg: '#495057',
    background: 'https://images.unsplash.com/photo-1707924962886-12ad20367315'
  },
  black: {
    sidebar: '#000000',
    header: '#000000',
    tabBg: '#000000',
    tabActiveBg: '#212121',
    background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUs55nkjiEFR-2RL9nfedkXcYZCAcWNlfLpg&s'
  },
  white: {
    sidebar: '#ffffff',
    header: '#ffffff',
    tabBg: '#ffffff',
    tabActiveBg: '#f0f0f0',
    background: 'https://img.freepik.com/free-vector/white-gray-abstract-gradient-background_69286-550.jpg'
  },
  orange: {
    sidebar: '#ffcf7b',
    header: '#ffcf7b',
    tabBg: '#ffcf7b',
    tabActiveBg: '#ffd54f',
    background: 'https://img.freepik.com/free-photo/background-gradient-lights_23-2149304997.jpg'
  },
  tan: {
    sidebar: '#d2b48c',
    header: '#d2b48c',
    tabBg: '#d2b48c',
    tabActiveBg: '#c49e6c',
    background: 'https://t3.ftcdn.net/jpg/09/14/74/04/360_F_914740449_kGiQ9SryhURbePRwE53Nvh4DK6R3WS40.jpg'
  },
  'light-purple': {
    sidebar: '#b39ddb',
    header: '#b39ddb',
    tabBg: '#b39ddb',
    tabActiveBg: '#9575cd',
    background: 'https://images.unsplash.com/photo-1617957689233-207e3cd3c610'
  },
  brown: {
    sidebar: '#795548',
    header: '#795548',
    tabBg: '#795548',
    tabActiveBg: '#6d4c41',
    background: 'https://img.freepik.com/free-photo/abstract-smooth-brown-wall-background-layout-design-studio-room-web-template-business-report-with-smooth-circle-gradient-color_1258-55653.jpg'
  },
  'light-green': {
    sidebar: '#3d704f',
    header: '#3d704f',
    tabBg: '#3d704f',
    tabActiveBg: '#2c6e3b',
    background: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d'
  },
  pink: {
    sidebar: '#f48fb1',
    header: '#f48fb1',
    tabBg: '#f48fb1',
    tabActiveBg: '#f06292',
    background: 'https://img.freepik.com/premium-vector/pink-gradient-color-background-illustration-pink-radial-gradient-background-wallpapers_1199668-67.jpg'
  },
  'light-blue': {
    sidebar: '#81d4fa',
    header: '#81d4fa',
    tabBg: '#81d4fa',
    tabActiveBg: '#4fc3f7',
    background: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3773.jpg'
  }
};

const customThemes = {};

document.querySelector('.custom-upload')?.addEventListener('click', () => {
  document.getElementById('theme-upload')?.click();
});

document.getElementById('theme-upload')?.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1;
        canvas.height = 1;
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        const dominantColor = `rgb(${r},${g},${b})`;

        const customTheme = {
          sidebar: dominantColor,
          header: dominantColor,
          tabBg: dominantColor,
          tabActiveBg: getDarkerShade(dominantColor),
          background: event.target.result
        };

        localStorage.setItem('userCustomTheme', JSON.stringify(customTheme));
        customThemes['user-custom'] = customTheme;

        const lastCustomCircle = document.querySelector('.last-custom');
        if (lastCustomCircle) {
          lastCustomCircle.style.backgroundImage = `url(${event.target.result})`;
          lastCustomCircle.innerHTML = '';
        }

        applyTheme('user-custom');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function applyTheme(themeName) {
  const theme = themes[themeName] || customThemes[themeName];
  if (!theme) return;

  const sidebar = document.querySelector('.sidebar');
  const header = document.querySelector('.browser-header');
  const tabsContainer = document.querySelector('.tabs-container');
  const updatesPopup = document.querySelector('.updates-popup');
  const themeContainers = document.querySelectorAll('.theme-container');

  const darkerShade = getDarkerShade(theme.sidebar);
  const evenDarkerShade = getDarkerShade(theme.sidebar, 60);

  // Particle color
  if (window.pJSDom && window.pJSDom[0]) {
    const particleColor = themeName === 'white' ? '#000000' : '#ffffff';
    window.pJSDom[0].pJS.particles.color.value = particleColor;
    window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }

  // Apply root variables
  document.documentElement.style.setProperty('--theme-color', theme.sidebar);
  document.documentElement.style.setProperty('--theme-darker', darkerShade);
  document.documentElement.style.setProperty('--theme-darkest', evenDarkerShade);
  document.documentElement.style.setProperty('--tab-bg', theme.tabBg);
  document.documentElement.style.setProperty('--tab-active-bg', theme.tabActiveBg);
  document.documentElement.style.setProperty('--header-bg', theme.header);

  const oldStyle = document.getElementById('dynamic-theme-style');
  if (oldStyle) oldStyle.remove();

  const style = document.createElement('style');
  style.id = 'dynamic-theme-style';
  style.textContent = `
    .tab { background: var(--theme-darker); }
    .tab.active { background: var(--theme-darkest); }
    .tab:hover { background: var(--theme-darkest); }
    .sidebar a:hover { background: var(--theme-darker) !important; }
    .action-btn:hover { background: var(--theme-darker); }
    .new-tab-btn:hover { background: var(--theme-darker); }
    .url-bar-wrapper { background: var(--theme-darker); }
  `;

  if (themeName === 'white') {
    document.body.classList.add('white-theme');
    style.textContent += `
      .tab { color: #000000; }
      .sidebar a:hover { background: #e9ecef !important; }
      .action-btn:hover, .new-tab-btn:hover { background: #e9ecef; }
      .url-bar-wrapper { background: #ffffff; }
    `;
  } else {
    document.body.classList.remove('white-theme');
  }

  document.head.appendChild(style);

  requestAnimationFrame(() => {
    if (sidebar) sidebar.style.backgroundColor = theme.sidebar;
    if (header) header.style.backgroundColor = theme.sidebar;
    if (tabsContainer) tabsContainer.style.backgroundColor = theme.sidebar;
    if (updatesPopup) updatesPopup.style.backgroundColor = theme.sidebar;

    themeContainers.forEach(container => {
      container.style.backgroundColor = theme.sidebar;
    });

    const textColor = themeName === 'white' ? '#000000' : '#ffffff';
    document.querySelectorAll('.theme-title, .particle-label, .blank-button, .tab-title').forEach(el => {
      el.style.color = textColor;
    });

    document.body.style.backgroundImage = `url(${theme.background})`;
  });

  localStorage.setItem('currentTheme', themeName);
}

// ========== Utility Functions ==========
function getDarkerShade(color, amount = 30) {
  if (color.startsWith('#')) color = hexToRgb(color);
  const rgb = color.match(/\d+/g);
  if (!rgb) return color;
  const darker = rgb.map(c => Math.max(0, parseInt(c) - amount));
  return `rgb(${darker.join(',')})`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
}
