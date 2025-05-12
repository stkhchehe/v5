const themes = {
  default: {
    name: "Default",
    sidebar: '#3d4060',
    vantaEffect: {
      effect: 'fog',
      options: {
        highlightColor: 0x4d5080,
        midtoneColor: 0x3d4060,
        lowlightColor: 0x2d3040,
        baseColor: 0x353555,
        blurFactor: 0.52,
        speed: 1.60,
        zoom: 0.90
      }
    }
  },
  galaxy: {
    name: "Galaxy",
    sidebar: '#2c3e50',
    vantaEffect: {
      effect: 'net',
      options: {
        color: 0x3498db,
        backgroundColor: 0x2c3e50,
        points: 10,
        maxDistance: 20,
        spacing: 20
      }
    }
  },
  hacker: {
    name: "Hacker",
    sidebar: '#1b1b1b',
    vantaEffect: {
      effect: 'dots',
      options: {
        color: 0x00ff00,
        backgroundColor: 0x000000,
        size: 3,
        spacing: 35,
        showLines: true
      }
    }
  },
  sunset: {
    name: "Sunset",
    sidebar: '#ff7e5f',
    vantaEffect: {
      effect: 'clouds',
      options: {
        backgroundColor: 0xff7e5f,
        skyColor: 0xff5e3a,
        cloudColor: 0xfeb47b,
        speed: 1.5
      }
    }
  },
  ocean: {
    name: "Ocean",
    sidebar: '#006994',
    vantaEffect: {
      effect: 'waves',
      options: {
        color: 0x006994,
        shininess: 30,
        waveHeight: 15,
        waveSpeed: 0.75,
        zoom: 0.75
      }
    }
  },
  forest: {
    name: "Forest",
    sidebar: '#2d5a27',
    vantaEffect: {
      effect: 'trunk',
      options: {
        backgroundColor: 0x2d5a27,
        color: 0x3a7233,
        spacing: 4,
        quantity: 3
      }
    }
  },
  neon: {
    name: "Neon",
    sidebar: '#ff00ff',
    vantaEffect: {
      effect: 'rings',
      options: {
        backgroundColor: 0x000000,
        color: 0xff00ff,
        scale: 1,
        scaleMobile: 1
      }
    }
  },
  midnight: {
    name: "Midnight",
    sidebar: '#191970',
    vantaEffect: {
      effect: 'birds',
      options: {
        backgroundColor: 0x191970,
        color1: 0x2a2a8c,
        color2: 0x0f0f4b,
        birdSize: 1.5,
        wingSpan: 20,
        speedLimit: 3
      }
    }
  },
  volcanic: {
    name: "Volcanic",
    sidebar: '#8b0000',
    vantaEffect: {
      effect: 'halo',
      options: {
        backgroundColor: 0x8b0000,
        baseColor: 0xa80000,
        amplitudeFactor: 2,
        size: 1.5
      }
    }
  },
  arctic: {
    name: "Arctic",
    sidebar: '#e0ffff',
    vantaEffect: {
      effect: 'fog',
      options: {
        highlightColor: 0xffffff,
        midtoneColor: 0xe0ffff,
        lowlightColor: 0xb0e0e6,
        baseColor: 0xc8e6e9,
        blurFactor: 0.6
      }
    }
  },
  cyberpunk: {
    name: "Cyberpunk",
    sidebar: '#ff00aa',
    vantaEffect: {
      effect: 'net',
      options: {
        color: 0xff00ff,
        backgroundColor: 0x000000,
        points: 15,
        maxDistance: 25,
        spacing: 15
      }
    }
  },
  desert: {
    name: "Desert",
    sidebar: '#deb887',
    vantaEffect: {
      effect: 'halo',
      options: {
        backgroundColor: 0xdeb887,
        baseColor: 0xc19a6b,
        amplitudeFactor: 1,
        size: 1.2
      }
    }
  },
  space: {
    name: "Space",
    sidebar: '#000033',
    vantaEffect: {
      effect: 'dots',
      options: {
        color: 0xffffff,
        backgroundColor: 0x000033,
        size: 2,
        spacing: 40,
        showLines: true
      }
    }
  },
  rainbow: {
    name: "Rainbow",
    sidebar: '#ff0000',
    vantaEffect: {
      effect: 'waves',
      options: {
        color: 0xff3366,
        shininess: 60,
        waveHeight: 20,
        waveSpeed: 1,
        zoom: 0.8
      }
    }
  },
  matrix: {
    name: "Matrix",
    sidebar: '#003300',
    vantaEffect: {
      effect: 'net',
      options: {
        color: 0x00ff00,
        backgroundColor: 0x001100,
        points: 20,
        maxDistance: 15,
        spacing: 15
      }
    }
  },
  synthwave: {
    name: "Synthwave",
    sidebar: '#ff00ff',
    vantaEffect: {
      effect: 'waves',
      options: {
        color: 0xff00ff,
        shininess: 80,
        waveHeight: 25,
        waveSpeed: 1.5,
        zoom: 0.7
      }
    }
  },
  aurora: {
    name: "Aurora",
    sidebar: '#00ff9f',
    vantaEffect: {
      effect: 'fog',
      options: {
        highlightColor: 0x00ffbb,
        midtoneColor: 0x00ff9f,
        lowlightColor: 0x00cc7f,
        baseColor: 0x00e68f,
        blurFactor: 0.7,
        speed: 2.0
      }
    }
  },
  twilight: {
    name: "Twilight",
    sidebar: '#4b0082',
    vantaEffect: {
      effect: 'clouds',
      options: {
        backgroundColor: 0x4b0082,
        skyColor: 0x2a004d,
        cloudColor: 0x6b238e,
        speed: 1.2
      }
    }
  },
  crimson: {
    name: "Crimson",
    sidebar: '#dc143c',
    vantaEffect: {
      effect: 'rings',
      options: {
        backgroundColor: 0xdc143c,
        color: 0xff1744,
        scale: 1,
        scaleMobile: 1
      }
    }
  },
  emerald: {
    name: "Emerald",
    sidebar: '#50c878',
    vantaEffect: {
      effect: 'trunk',
      options: {
        backgroundColor: 0x50c878,
        color: 0x40a060,
        spacing: 5,
        quantity: 4
      }
    }
  }
};

// Update the initVantaEffect function:
function initVantaEffect(theme) {
  if (vantaEffect) vantaEffect.destroy();
  
  const effectName = theme.vantaEffect.effect.toUpperCase();
  if (VANTA[effectName]) {
    vantaEffect = VANTA[effectName]({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      ...theme.vantaEffect.options
    });
  }
}

// Update the applyTheme function:
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  // Update colors
  document.querySelector('.sidebar').style.background = theme.sidebar;
  document.querySelector('.browser-header').style.background = theme.sidebar;
  
  // Update tabs
  const tabsContainer = document.querySelector('.tabs-container');
  if (tabsContainer) {
    tabsContainer.style.background = adjustColor(theme.sidebar, -20);
  }
  
  // Initialize the Vanta effect
  initVantaEffect(theme);
  
  // Update active state
  document.querySelectorAll('.theme-circle').forEach(circle => {
    circle.classList.remove('active');
    if (circle.dataset.theme === themeName) {
      circle.classList.add('active');
    }
  });

  localStorage.setItem('selectedTheme', themeName);
}

// Add necessary script tags to your HTML:
