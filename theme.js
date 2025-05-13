// Add this function at the start of your theme.js file
function getDarkerShade(color, percent = 20) {
    // Convert hex to RGB
    let r = parseInt(color.slice(1,3), 16),
        g = parseInt(color.slice(3,5), 16),
        b = parseInt(color.slice(5,7), 16);

    // Darken each component
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Update your theme configurations to include hover colors
const themes = {
    default: {
        sidebar: '#3d4060',
        sidebarHover: '#2d3048', // Darker shade
        searchBar: '#343654',    // Slightly darker than sidebar
        popup: '#2d3048',        // Even darker for popups
        vanta: {
            effect: VANTA.FOG,
            options: {
                highlightColor: 0x3b4057,
                midtoneColor: 0x4d5389,
                lowlightColor: 0x5b5b7f,
                baseColor: 0x353555
            }
        }
    },
    // ... other themes with similar structure
};

// Update your applyTheme function
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Get darker shades
    const darkerShade = getDarkerShade(theme.sidebar);
    const evenDarker = getDarkerShade(theme.sidebar, 30);

    // Update CSS variables
    document.documentElement.style.setProperty('--sidebar-color', theme.sidebar);
    document.documentElement.style.setProperty('--sidebar-hover', theme.sidebarHover);
    document.documentElement.style.setProperty('--search-bar-color', theme.searchBar);
    document.documentElement.style.setProperty('--popup-color', theme.popup);

    // Add this CSS to handle all hover effects and UI elements
    const style = document.createElement('style');
    style.textContent = `
        .sidebar a:hover {
            background: ${theme.sidebarHover};
        }

        .url-bar-wrapper,
        .search-bar-small {
            background: ${theme.searchBar};
        }

        .popup,
        .theme-changer,
        .cursor-options-popup {
            background: ${theme.popup};
        }

        .tab:hover,
        .action-btn:hover,
        .new-tab-btn:hover {
            background: ${theme.sidebarHover};
        }

        .welcometwo button {
            background: ${theme.sidebar};
        }

        .welcometwo button:hover {
            background: ${theme.sidebarHover};
        }

        .tabs-container {
            background: ${theme.searchBar};
        }

        .tab {
            background: ${theme.popup};
        }

        .tab.active {
            background: ${theme.sidebar};
        }

        .url-bar-icons i:hover,
        .sidebar-bottom-button:hover {
            background: ${theme.sidebarHover};
        }

        .popup .close-button:hover {
            background: ${theme.sidebarHover};
        }

        .theme-circle:hover {
            border-color: ${theme.sidebar};
            box-shadow: 0 0 20px ${theme.sidebar}80;
        }

        .theme-circle.active {
            border-color: ${theme.sidebar};
            box-shadow: 0 0 25px ${theme.sidebar}80;
        }
    `;

    // Apply the style
    document.head.appendChild(style);

    // Update Vanta background
    initVanta(theme);

    // Save theme preference
    localStorage.setItem('selectedTheme', themeName);

    // Update active state of theme circles
    document.querySelectorAll('.theme-circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.dataset.theme === themeName) {
            circle.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const themeChanger = document.querySelector('.theme-changer');
    let vantaEffect = null;

    // Complete theme configurations with Vanta settings
    const themes = {
        default: {
            sidebar: '#3d4060',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x3b4057,
                    midtoneColor: 0x4d5389,
                    lowlightColor: 0x5b5b7f,
                    baseColor: 0x353555,
                    blurFactor: 0.52,
                    speed: 1.60,
                    zoom: 0.90
                }
            }
        },
        black: {
            sidebar: '#000000',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x000000,
                    midtoneColor: 0x1a1a1a,
                    lowlightColor: 0x333333,
                    baseColor: 0x000000,
                    blurFactor: 0.60,
                    speed: 1.50,
                    zoom: 0.80
                }
            }
        },
        blue: {
            sidebar: '#1e90ff',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x1e90ff,
                    midtoneColor: 0x0000cd,
                    lowlightColor: 0x4169e1,
                    baseColor: 0x0000ff,
                    blurFactor: 0.55,
                    speed: 1.70,
                    zoom: 0.85
                }
            }
        },
        pink: {
            sidebar: '#ff69b4',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff69b4,
                    midtoneColor: 0xff1493,
                    lowlightColor: 0xffc0cb,
                    baseColor: 0xff69b4,
                    blurFactor: 0.45,
                    speed: 1.80,
                    zoom: 0.95
                }
            }
        },
        purple: {
            sidebar: '#800080',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x800080,
                    midtoneColor: 0x4b0082,
                    lowlightColor: 0x8b008b,
                    baseColor: 0x800080,
                    blurFactor: 0.50,
                    speed: 1.65,
                    zoom: 0.88
                }
            }
        },
        red: {
            sidebar: '#ff0000',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff0000,
                    midtoneColor: 0xdc143c,
                    lowlightColor: 0xff4500,
                    baseColor: 0xff0000,
                    blurFactor: 0.48,
                    speed: 1.75,
                    zoom: 0.92
                }
            }
        },
        green: {
            sidebar: '#008000',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x008000,
                    midtoneColor: 0x006400,
                    lowlightColor: 0x228b22,
                    baseColor: 0x008000,
                    blurFactor: 0.54,
                    speed: 1.62,
                    zoom: 0.87
                }
            }
        },
        yellow: {
            sidebar: '#ffd700',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xffd700,
                    midtoneColor: 0xffa500,
                    lowlightColor: 0xffff00,
                    baseColor: 0xffd700,
                    blurFactor: 0.46,
                    speed: 1.58,
                    zoom: 0.93
                }
            }
        },
        orange: {
            sidebar: '#ff8c00',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff8c00,
                    midtoneColor: 0xff4500,
                    lowlightColor: 0xffa500,
                    baseColor: 0xff8c00,
                    blurFactor: 0.51,
                    speed: 1.72,
                    zoom: 0.86
                }
            }
        },
        brown: {
            sidebar: '#8b4513',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x8b4513,
                    midtoneColor: 0xa0522d,
                    lowlightColor: 0xd2691e,
                    baseColor: 0x8b4513,
                    blurFactor: 0.57,
                    speed: 1.55,
                    zoom: 0.89
                }
            }
        },
        sunset: {
            sidebar: '#ff7e5f',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff7e5f,
                    midtoneColor: 0xff5f40,
                    lowlightColor: 0xfeb47b,
                    baseColor: 0xff7e5f,
                    blurFactor: 0.49,
                    speed: 1.68,
                    zoom: 0.91
                }
            }
        },
        hacker: {
            sidebar: '#00ff00',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x00ff00,
                    midtoneColor: 0x008000,
                    lowlightColor: 0x32cd32,
                    baseColor: 0x000000,
                    blurFactor: 0.53,
                    speed: 1.90,
                    zoom: 0.84
                }
            }
        },
        ocean: {
            sidebar: '#00bfff',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x00bfff,
                    midtoneColor: 0x0000ff,
                    lowlightColor: 0x87ceeb,
                    baseColor: 0x00bfff,
                    blurFactor: 0.44,
                    speed: 1.65,
                    zoom: 0.94
                }
            }
        },
        "iced coffee": {
            sidebar: '#b18f6a',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xb18f6a,
                    midtoneColor: 0x967259,
                    lowlightColor: 0xc4a484,
                    baseColor: 0xb18f6a,
                    blurFactor: 0.56,
                    speed: 1.52,
                    zoom: 0.88
                }
            }
        },
        "night time": {
            sidebar: '#191970',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x191970,
                    midtoneColor: 0x000080,
                    lowlightColor: 0x483d8b,
                    baseColor: 0x191970,
                    blurFactor: 0.58,
                    speed: 1.45,
                    zoom: 0.83
                }
            }
        },
        galaxy: {
            sidebar: '#4b0082',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x4b0082,
                    midtoneColor: 0x800080,
                    lowlightColor: 0x9400d3,
                    baseColor: 0x4b0082,
                    blurFactor: 0.55,
                    speed: 1.85,
                    zoom: 0.87
                }
            }
        },
        forest: {
            sidebar: '#228b22',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0x228b22,
                    midtoneColor: 0x006400,
                    lowlightColor: 0x32cd32,
                    baseColor: 0x228b22,
                    blurFactor: 0.47,
                    speed: 1.70,
                    zoom: 0.92
                }
            }
        },
        "retro y2k": {
            sidebar: '#ff1493',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff1493,
                    midtoneColor: 0xff69b4,
                    lowlightColor: 0xffc0cb,
                    baseColor: 0xff1493,
                    blurFactor: 0.43,
                    speed: 1.95,
                    zoom: 0.96
                }
            }
        },
        bubblegum: {
            sidebar: '#ff69b4',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff69b4,
                    midtoneColor: 0xff1493,
                    lowlightColor: 0xffc0cb,
                    baseColor: 0xff69b4,
                    blurFactor: 0.45,
                    speed: 1.75,
                    zoom: 0.93
                }
            }
        },
        christmas: {
            sidebar: '#ff0000',
            vanta: {
                effect: VANTA.FOG,
                options: {
                    highlightColor: 0xff0000,
                    midtoneColor: 0x008000,
                    lowlightColor: 0xffffff,
                    baseColor: 0xff0000,
                    blurFactor: 0.50,
                    speed: 1.80,
                    zoom: 0.90
                }
            }
        }
    };

    // Initialize Vanta effect
    function initVanta(theme) {
        if (vantaEffect) vantaEffect.destroy();
        
        vantaEffect = theme.vanta.effect({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            ...theme.vanta.options
        });
    }

    // Apply theme function
    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return;

        // Update sidebar color with transition
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.transition = 'background-color 0.5s ease';
        sidebar.style.backgroundColor = theme.sidebar;

        // Update Vanta background
        initVanta(theme);

        // Save theme preference
        localStorage.setItem('selectedTheme', themeName);

        // Update active state of theme circles
        document.querySelectorAll('.theme-circle').forEach(circle => {
            circle.classList.remove('active');
            if (circle.dataset.theme === themeName) {
                circle.classList.add('active');
            }
        });
    }

    // Add click handlers to theme circles
    document.querySelectorAll('.theme-circle').forEach(circle => {
        circle.addEventListener('click', () => {
            const themeName = circle.dataset.theme;
            applyTheme(themeName);

            // Add animation to the clicked circle
            circle.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                circle.style.animation = '';
            }, 500);
        });
    });

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    applyTheme(savedTheme);

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .theme-changer {
            right: 20px;
            left: auto !important;
            width: 800px;
            transform: translateX(100%);
            animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .theme-circle {
            transition: all 0.3s ease;
        }

        .theme-circle:hover {
            transform: scale(1.15);
            box-shadow: 0 0 20px rgba(255,255,255,0.6);
        }

        .theme-circle.active {
            border: 3px solid #fff;
            box-shadow: 0 0 25px rgba(255,255,255,0.8);
        }
    `;
    document.head.appendChild(style);
});
