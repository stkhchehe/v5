let vantaEffect = null;

const themes = {
    default: {
        fogConfig: {
            highlightColor: 0x3b4057,
            midtoneColor: 0x4d5389,
            lowlightColor: 0x5b5b7f,
            baseColor: 0x353555,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#3d4060',
            sidebarHover: '#2d3048',
            tabsContainer: '#2b3035',
            searchBar: '#343a40',
            text: '#ffffff'
        }
    },
    dark: {
        fogConfig: {
            highlightColor: 0x222222,
            midtoneColor: 0x111111,
            lowlightColor: 0x000000,
            baseColor: 0x000000,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#000000',
            sidebarHover: '#1a1a1a',
            tabsContainer: '#000000',
            searchBar: '#000000',
            text: '#ffffff'
        }
    },
    red: {
        fogConfig: {
            highlightColor: 0xff0000,
            midtoneColor: 0xcc0000,
            lowlightColor: 0x990000,
            baseColor: 0xff0000,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff0000',
            sidebarHover: '#cc0000',
            tabsContainer: '#ff0000',
            searchBar: '#ff0000',
            text: '#ffffff'
        }
    },
    blue: {
        fogConfig: {
            highlightColor: 0x0066cc,
            midtoneColor: 0x004d99,
            lowlightColor: 0x003366,
            baseColor: 0x0066cc,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#0066cc',
            sidebarHover: '#004d99',
            tabsContainer: '#0066cc',
            searchBar: '#0066cc',
            text: '#ffffff'
        }
    },
    purple: {
        fogConfig: {
            highlightColor: 0x800080,
            midtoneColor: 0x660066,
            lowlightColor: 0x400040,
            baseColor: 0x800080,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#800080',
            sidebarHover: '#660066',
            tabsContainer: '#800080',
            searchBar: '#800080',
            text: '#ffffff'
        }
    },
    green: {
        fogConfig: {
            highlightColor: 0x008000,
            midtoneColor: 0x006600,
            lowlightColor: 0x004d00,
            baseColor: 0x008000,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#008000',
            sidebarHover: '#006600',
            tabsContainer: '#008000',
            searchBar: '#008000',
            text: '#ffffff'
        }
    },
    orange: {
        fogConfig: {
            highlightColor: 0xff6600,
            midtoneColor: 0xcc5200,
            lowlightColor: 0x993d00,
            baseColor: 0xff6600,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff6600',
            sidebarHover: '#cc5200',
            tabsContainer: '#ff6600',
            searchBar: '#ff6600',
            text: '#ffffff'
        }
    },
    brown: {
        fogConfig: {
            highlightColor: 0x8b4513,
            midtoneColor: 0x6b3410,
            lowlightColor: 0x4b240c,
            baseColor: 0x8b4513,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#8b4513',
            sidebarHover: '#6b3410',
            tabsContainer: '#8b4513',
            searchBar: '#8b4513',
            text: '#ffffff'
        }
    },
    pink: {
        fogConfig: {
            highlightColor: 0xff69b4,
            midtoneColor: 0xff1493,
            lowlightColor: 0xff1493,
            baseColor: 0xff69b4,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff69b4',
            sidebarHover: '#ff1493',
            tabsContainer: '#ff69b4',
            searchBar: '#ff69b4',
            text: '#ffffff'
        }
    },
    white: {
        fogConfig: {
            highlightColor: 0xffffff,
            midtoneColor: 0xf0f0f0,
            lowlightColor: 0xe0e0e0,
            baseColor: 0xffffff,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ffffff',
            sidebarHover: '#f0f0f0',
            tabsContainer: '#ffffff',
            searchBar: '#ffffff',
            text: '#000000'
        }
    },
    sunset: {
        fogConfig: {
            highlightColor: 0xff6b6b,
            midtoneColor: 0xffd93d,
            lowlightColor: 0xff8c00,
            baseColor: 0xff6b6b,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff6b6b',
            sidebarHover: '#ff5252',
            tabsContainer: '#ff8c00',
            searchBar: '#ff8c00',
            text: '#ffffff'
        }
    },
    hacker: {
        fogConfig: {
            highlightColor: 0x00ff00,
            midtoneColor: 0x008000,
            lowlightColor: 0x003300,
            baseColor: 0x000000,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#000000',
            sidebarHover: '#003300',
            tabsContainer: '#000000',
            searchBar: '#000000',
            text: '#00ff00'
        }
    },
    bubblegum: {
        fogConfig: {
            highlightColor: 0xff69b4,
            midtoneColor: 0x87ceeb,
            lowlightColor: 0xff69b4,
            baseColor: 0xff69b4,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff69b4',
            sidebarHover: '#ff1493',
            tabsContainer: '#87ceeb',
            searchBar: '#ff69b4',
            text: '#ffffff'
        }
    },
    // Additional themes...
    galaxy: {
        fogConfig: {
            highlightColor: 0x4b0082,
            midtoneColor: 0x800080,
            lowlightColor: 0x483d8b,
            baseColor: 0x2b0245,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#4b0082',
            sidebarHover: '#380061',
            tabsContainer: '#483d8b',
            searchBar: '#4b0082',
            text: '#ffffff'
        }
    },
    ocean: {
        fogConfig: {
            highlightColor: 0x00bfff,
            midtoneColor: 0x0099cc,
            lowlightColor: 0x006699,
            baseColor: 0x00bfff,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#00bfff',
            sidebarHover: '#0099cc',
            tabsContainer: '#00bfff',
            searchBar: '#00bfff',
            text: '#ffffff'
        }
    },
    forest: {
        fogConfig: {
            highlightColor: 0x228b22,
            midtoneColor: 0x006400,
            lowlightColor: 0x004d00,
            baseColor: 0x228b22,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#228b22',
            sidebarHover: '#006400',
            tabsContainer: '#228b22',
            searchBar: '#228b22',
            text: '#ffffff'
        }
    },
    neon: {
        fogConfig: {
            highlightColor: 0xff00ff,
            midtoneColor: 0xff00cc,
            lowlightColor: 0xcc00cc,
            baseColor: 0xff00ff,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        },
        uiColors: {
            sidebar: '#ff00ff',
            sidebarHover: '#cc00cc',
            tabsContainer: '#ff00ff',
            searchBar: '#ff00ff',
            text: '#ffffff'
        }
    }
};

function initVantaEffect(themeName) {
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    const theme = themes[themeName];
    if (!theme) return;

    try {
        vantaEffect = VANTA[theme.effect]({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            ...theme.config
        });

        // Update UI colors
        updateUIColors(theme.uiColors);

        // Save the selected theme
        localStorage.setItem('selectedTheme', themeName);

    } catch (error) {
        console.error(`Failed to initialize theme: ${themeName}`, error);
        if (themeName !== 'default') {
            initVantaEffect('default');
        }
    }
}

function updateUIColors(colors) {
    // Update sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundColor = colors.sidebar;
    }

    // Update tabs container
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        tabsContainer.style.backgroundColor = colors.tabsContainer;
    }

    // Update search bar
    const urlBarWrapper = document.querySelector('.url-bar-wrapper');
    if (urlBarWrapper) {
        urlBarWrapper.style.backgroundColor = colors.searchBar;
    }

    // Update text color
    document.documentElement.style.setProperty('--theme-text-color', colors.text);

    // Update hover styles
    const style = document.createElement('style');
    style.innerHTML = `
        .sidebar a:hover {
            background: ${colors.sidebarHover} !important;
        }
        .tab:hover {
            background: ${colors.sidebarHover} !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize theme from localStorage or default
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    initVantaEffect(savedTheme);

    // Add click handlers to theme circles
    document.querySelectorAll('.theme-circle').forEach(circle => {
        circle.addEventListener('click', () => {
            const themeName = circle.dataset.theme;
            initVantaEffect(themeName);
        });
    });
});
