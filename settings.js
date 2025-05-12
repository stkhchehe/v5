// settings.js

const themes = {
  default: {
    sidebar: '#3d4060',
    vanta: {
      highlightColor: 0x4d5080,
      midtoneColor: 0x3d4060,
      lowlightColor: 0x2d3040,
      baseColor: 0x353555
    }
  },
  black: {
    sidebar: '#000000',
    vanta: {
      highlightColor: 0x222222,
      midtoneColor: 0x000000,
      lowlightColor: 0x111111,
      baseColor: 0x0a0a0a
    }
  },
  white: {
    sidebar: '#ffffff',
    vanta: {
      highlightColor: 0xffffff,
      midtoneColor: 0xf0f0f0,
      lowlightColor: 0xe0e0e0,
      baseColor: 0xf5f5f5
    }
  },
  orange: {
    sidebar: '#ffcf7b',
    vanta: {
      highlightColor: 0xffd54f,
      midtoneColor: 0xffcf7b,
      lowlightColor: 0xffc107,
      baseColor: 0xffa000
    }
  },
  tan: {
    sidebar: '#d2b48c',
    vanta: {
      highlightColor: 0xe6c9a8,
      midtoneColor: 0xd2b48c,
      lowlightColor: 0xbc9d70,
      baseColor: 0xc49e6c
    }
  },
  'light-purple': {
    sidebar: '#b39ddb',
    vanta: {
      highlightColor: 0xc5b3e6,
      midtoneColor: 0xb39ddb,
      lowlightColor: 0x9575cd,
      baseColor: 0xa087d0
    }
  },
  brown: {
    sidebar: '#795548',
    vanta: {
      highlightColor: 0x8d6e63,
      midtoneColor: 0x795548,
      lowlightColor: 0x5d4037,
      baseColor: 0x6d4c41
    }
  },
  'light-green': {
    sidebar: '#3d704f',
    vanta: {
      highlightColor: 0x4d8b62,
      midtoneColor: 0x3d704f,
      lowlightColor: 0x2d553c,
      baseColor: 0x356946
    }
  },
  pink: {
    sidebar: '#f48fb1',
    vanta: {
      highlightColor: 0xf6a5c0,
      midtoneColor: 0xf48fb1,
      lowlightColor: 0xf06292,
      baseColor: 0xf279a1
    }
  },
  'light-blue': {
    sidebar: '#81d4fa',
    vanta: {
      highlightColor: 0x9ee1ff,
      midtoneColor: 0x81d4fa,
      lowlightColor: 0x4fc3f7,
      baseColor: 0x67cef8
    }
  },
  // Add more themes here with similar structure
  galaxy: {
    sidebar: '#2c3e50',
    vanta: {
      highlightColor: 0x3498db,
      midtoneColor: 0x2c3e50,
      lowlightColor: 0x8e44ad,
      baseColor: 0x2c3e50
    }
  },
  hacker: {
    sidebar: '#1b1b1b',
    vanta: {
      highlightColor: 0x00ff00,
      midtoneColor: 0x1b1b1b,
      lowlightColor: 0x003300,
      baseColor: 0x0a0a0a
    }
  },
  sunset: {
    sidebar: '#ff7e5f',
    vanta: {
      highlightColor: 0xff7e5f,
      midtoneColor: 0xfeb47b,
      lowlightColor: 0xff5e3a,
      baseColor: 0xff6b4a
    }
  }
  // Add more themes as needed
};

// Add this CSS to your existing styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .theme-changer {
    position: fixed;
    top: 80px;
    right: 40px;
    background: rgba(61, 64, 96, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    width: 800px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
                0 0 40px rgba(255, 255, 255, 0.1);
    z-index: 1000;
    transition: transform 0.3s ease;
  }

  .theme-changer:hover {
    transform: scale(1.02);
  }

  .theme-circles {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 15px;
    margin-top: 20px;
  }

  .theme-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid white;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .theme-circle:hover {
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }

  .theme-circle.active {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }
`;
document.head.appendChild(styleSheet);

// Theme management functions
let vantaEffect = null;

function initVanta(theme) {
  if (vantaEffect) vantaEffect.destroy();
  vantaEffect = VANTA.FOG({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    ...theme.vanta,
    blurFactor: 0.52,
    speed: 1.60,
    zoom: 0.90
  });
}

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  // Update sidebar color
  document.querySelector('.sidebar').style.background = theme.sidebar;
  
  // Update Vanta background
  initVanta(theme);
  
  // Update active circle
  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.classList.remove('active');
    if (circle.dataset.theme === themeName) {
      circle.classList.add('active');
    }
  });

  // Save theme preference
  localStorage.setItem('selectedTheme', themeName);
}

// Create and append theme changer HTML
document.addEventListener('DOMContentLoaded', () => {
  const themeChanger = document.createElement('div');
  themeChanger.className = 'theme-changer';
  
  let html = `
    <div class="theme-title">theme changer</div>
    <div class="theme-divider"></div>
    <div class="theme-circles">
  `;

  // First row
  Object.keys(themes).slice(0, 10).forEach(themeName => {
    html += `<div class="theme-circle" data-theme="${themeName}" style="background: ${themes[themeName].sidebar}"></div>`;
  });

  // Second row
  Object.keys(themes).slice(10, 20).forEach(themeName => {
    html += `<div class="theme-circle" data-theme="${themeName}" style="background: ${themes[themeName].sidebar}"></div>`;
  });

  html += `</div>`;
  themeChanger.innerHTML = html;
  document.body.appendChild(themeChanger);

  // Add click handlers
  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const themeName = circle.dataset.theme;
      applyTheme(themeName);
    });
  });

  // Apply saved theme or default
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  applyTheme(savedTheme);
});
