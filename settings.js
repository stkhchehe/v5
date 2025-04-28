// ========== Theme Configuration ==========
const themes = {
  default: {
    sidebar: '#343a40',
    header: '#343a40',
    background: 'https://images.unsplash.com/photo-1707924962886-12ad20367315'
  },
  black: {
    sidebar: '#000000',
    header: '#000000',
    background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDVYJojRxO5cWsb5Y5pcnSqnNyHpPb8TeELw&s'
  },
  white: {
    sidebar: '#ffffff',
    header: '#ffffff',
    background: 'https://img.freepik.com/free-vector/white-gray-abstract-gradient-background_69286-550.jpg?semt=ais_hybrid&w=740'
  },
  orange: {
    sidebar: '#ffcf7b',
    header: '#ffcf7b',
    background: 'https://img.freepik.com/free-photo/background-gradient-lights_23-2149304997.jpg'
  },
  tan: {
    sidebar: '#d2b48c',
    header: '#d2b48c',
    background: 'https://t3.ftcdn.net/jpg/09/14/74/04/360_F_914740449_kGiQ9SryhURbePRwE53Nvh4DK6R3WS40.jpg'
  },
  'light-purple': {
    sidebar: '#b39ddb',
    header: '#b39ddb',
    background: 'https://images.unsplash.com/photo-1617957689233-207e3cd3c610?fm=jpg&q=60&w=3000'
  },
  brown: {
    sidebar: '#795548',
    header: '#795548',
    background: 'https://media.istockphoto.com/id/675719502/photo/abstract-luxury-brown-background-border-frame-with-copy-space-blank-web-or-template-brochure.jpg'
  },
  'light-green': {
    sidebar: '#3d704f',
    header: '#3d704f',
    background: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d'
  },
  pink: {
    sidebar: '#f48fb1',
    header: '#f48fb1',
    background: 'https://img.freepik.com/premium-vector/pink-gradient-color-background-illustration-pink-radial-gradient-background-wallpapers_1199668-67.jpg'
  },
  'light-blue': {
    sidebar: '#81d4fa',
    header: '#81d4fa',
    background: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3773.jpg'
  }
};

const customThemes = {
  custom1: {
    sidebar: '#4a148c',
    header: '#4a148c',
    background: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'
  }
};

// ========== Theme Management ==========
function applyTheme(themeName) {
  const theme = themes[themeName] || customThemes[themeName];
  if (!theme) return;

  const sidebar = document.querySelector('.sidebar');
  const header = document.querySelector('.browser-header');
  const tabsContainer = document.querySelector('.tabs-container');
  const updatesPopup = document.querySelector('.updates-popup');
  const themeContainers = document.querySelectorAll('.theme-container');

  // Add particle color control
  const particleColor = themeName === 'white' ? '#000000' : '#ffffff';
  if (window.pJSDom && window.pJSDom[0]) {
    window.pJSDom[0].pJS.particles.color.value = particleColor;
    window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }

  // Calculate darker hover color
  const hoverColor = darkenColor(theme.sidebar);

  requestAnimationFrame(() => {
    if (sidebar) sidebar.style.backgroundColor = theme.sidebar;
    if (header) header.style.backgroundColor = theme.sidebar;
    if (tabsContainer) tabsContainer.style.backgroundColor = theme.sidebar;
    if (updatesPopup) updatesPopup.style.backgroundColor = theme.sidebar;

    themeContainers.forEach(container => {
      container.style.backgroundColor = theme.sidebar;
    });

    // Inject hover styles
    const style = document.createElement('style');
    style.textContent = `
      .sidebar a:hover, .tab:hover {
        background: ${hoverColor} !important;
      }
    `;
    document.head.appendChild(style);

    // Handle text color
    const textColor = themeName === 'white' ? '#000000' : '#ffffff';
    document.querySelectorAll('.theme-title, .particle-label, .blank-button, .updates-popup, .tab-title').forEach(element => {
      element.style.color = textColor;
    });

    // Background image
    document.body.style.backgroundImage = `url(${theme.background})`;

    // Special case for white theme
    if (themeName === 'white') {
      document.body.classList.add('white-theme');
    } else {
      document.body.classList.remove('white-theme');
    }
  });

  localStorage.setItem('currentTheme', themeName);
}

// ========== Utilities ==========
function darkenColor(color, amount = 30) {
  if (color.startsWith('#')) {
    color = hexToRgb(color);
  }
  const rgb = color.match(/\d+/g);
  if (rgb) {
    const darker = rgb.map(c => Math.max(0, parseInt(c) - amount));
    return `rgb(${darker.join(',')})`;
  }
  return color;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
}

// ========== Tab Cloaking ==========
function applyTabCloak(name, icon) {
  document.title = name;
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = icon;
  localStorage.setItem('tabCloak', JSON.stringify({ name, icon }));
}

function initializeTabCloaking() {
  const savedCloak = localStorage.getItem('tabCloak');
  if (savedCloak) {
    const { name, icon } = JSON.parse(savedCloak);
    applyTabCloak(name, icon);
  }
}

// ========== Custom Theme Upload ==========
document.querySelector('.custom-upload')?.addEventListener('click', () => {
  document.getElementById('theme-upload').click();
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
          background: event.target.result
        };

        localStorage.setItem('userCustomTheme', JSON.stringify(customTheme));

        const lastCustomCircle = document.querySelector('.last-custom');
        if (lastCustomCircle) {
          lastCustomCircle.style.backgroundImage = `url(${event.target.result})`;
          lastCustomCircle.innerHTML = '';
        }

        themes['user-custom'] = customTheme;
        applyTheme('user-custom');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// ========== Updates Popup ==========
function showUpdatesPopup() {
  const popup = document.getElementById('updates-popup');
  popup.classList.add('show');

  const badge = document.querySelector('.notification-badge');
  if (badge) {
    badge.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => badge.remove(), 300);
  }

  const items = document.querySelectorAll('.update-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = 'slideInUp 0.3s ease forwards';
    }, index * 100);
  });
}

function closeUpdatesPopup() {
  const popup = document.getElementById('updates-popup');
  popup.classList.remove('show');
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('currentTheme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }
  initializeTabCloaking();

  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      applyTheme(circle.dataset.theme);
    });
  });

  document.querySelectorAll('.cloaker-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const name = circle.dataset.name;
      const icon = circle.dataset.icon;
      applyTabCloak(name, icon);
    });
  });
});
