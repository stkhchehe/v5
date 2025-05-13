// Add these color utility functions at the start of your theme.js file
function getDarkerShade(color, percent = 20) {
    let r = parseInt(color.slice(1,3), 16),
        g = parseInt(color.slice(3,5), 16),
        b = parseInt(color.slice(5,7), 16);

    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getLighterShade(color, percent = 20) {
    let r = parseInt(color.slice(1,3), 16),
        g = parseInt(color.slice(3,5), 16),
        b = parseInt(color.slice(5,7), 16);

    r = Math.min(255, Math.floor(r * (100 + percent) / 100));
    g = Math.min(255, Math.floor(g * (100 + percent) / 100));
    b = Math.min(255, Math.floor(b * (100 + percent) / 100));

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Update the applyTheme function
function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Generate color variants
    const sidebarColor = theme.sidebar;
    const darkerShade = getDarkerShade(sidebarColor, 20);
    const evenDarker = getDarkerShade(sidebarColor, 30);
    const slightlyDarker = getDarkerShade(sidebarColor, 10);
    const muchDarker = getDarkerShade(sidebarColor, 40);
    const lighterShade = getLighterShade(sidebarColor, 10);

    // Create and apply dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        .sidebar {
            background: ${sidebarColor};
            transition: background-color 0.5s ease;
        }

        .sidebar a:hover {
            background: ${darkerShade};
        }

        .url-bar-wrapper,
        .search-bar-small,
        .tabs-container {
            background: ${evenDarker};
        }

        .popup,
        .theme-changer,
        .cursor-options-popup {
            background: ${darkerShade};
            border: 1px solid ${slightlyDarker};
        }

        .tab {
            background: ${evenDarker};
        }

        .tab.active {
            background: ${sidebarColor};
        }

        .tab:hover,
        .action-btn:hover,
        .new-tab-btn:hover {
            background: ${darkerShade};
        }

        .welcometwo button {
            background: ${sidebarColor};
        }

        .welcometwo button:hover {
            background: ${darkerShade};
        }

        .url-bar-icons i:hover,
        .sidebar-bottom-button:hover,
        .popup .close-button:hover {
            background: ${darkerShade};
        }

        .theme-circle:hover {
            border-color: ${sidebarColor};
            box-shadow: 0 0 20px ${sidebarColor}80;
        }

        .theme-circle.active {
            border-color: ${lighterShade};
            box-shadow: 0 0 25px ${sidebarColor}80;
        }

        .browser-header {
            background: ${darkerShade};
        }

        .popup-header {
            background: ${darkerShade};
        }

        .popup-content {
            background: ${evenDarker};
        }

        .extension-toggle:hover,
        .bookmark-item:hover,
        .history-item:hover {
            background: ${darkerShade};
        }

        .clear-history-button {
            background: ${darkerShade};
        }

        .clear-history-button:hover {
            background: ${muchDarker};
        }

        /* Update Vanta colors */
        #vanta-bg {
            --highlight-color: ${sidebarColor};
            --midtone-color: ${darkerShade};
            --lowlight-color: ${evenDarker};
            --base-color: ${muchDarker};
        }
    `;

    // Remove any previous dynamic styles
    const previousStyle = document.getElementById('dynamic-theme');
    if (previousStyle) {
        previousStyle.remove();
    }

    // Add ID to new style element and append it
    style.id = 'dynamic-theme';
    document.head.appendChild(style);

    // Update Vanta background
    initVanta({
        ...theme,
        vanta: {
            ...theme.vanta,
            options: {
                ...theme.vanta.options,
                highlightColor: parseInt(sidebarColor.slice(1), 16),
                midtoneColor: parseInt(darkerShade.slice(1), 16),
                lowlightColor: parseInt(evenDarker.slice(1), 16),
                baseColor: parseInt(muchDarker.slice(1), 16)
            }
        }
    });

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
            sidebar: '#385dae',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x1855af,
                midtoneColor: 0x6176be,
                lowlightColor: 0x5417c3,
                baseColor: 0x2f2727,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        pink: {
            sidebar: '#c67cd9',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xca8ee6,
                midtoneColor: 0xd37ee8,
                lowlightColor: 0xe887d6,
                baseColor: 0x623f6b,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        purple: {
            sidebar: '#ac74cd',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xca8ee6,
                midtoneColor: 0xbc7ee8,
                lowlightColor: 0x630ea0,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        red: {
            sidebar: '#cc2231',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xbe2f46,
                midtoneColor: 0xe61925,
                lowlightColor: 0xeb3841,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        green: {
            sidebar: '#23bb3f',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x2fbe50,
                midtoneColor: 0x19e63d,
                lowlightColor: 0x38eb38,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        yellow: {
            sidebar: '#bdc124',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xb5be2f,
                midtoneColor: 0xe6e519,
                lowlightColor: 0xcbeb38,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        orange: {
            sidebar: '#dc8827',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xfc9d34,
                midtoneColor: 0xe69119,
                lowlightColor: 0xeb6c38,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 1.30
                }
            }
        },
        brown: {
            sidebar: '#6a3f24',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x7f4f24,
                midtoneColor: 0x8c522b,
                lowlightColor: 0x612e1a,
                baseColor: 0x1c141e,
                blurFactor: 0.57,
                speed: 1.90,
                zoom: 0.90
                }
            }
        },
        sunset: {
            sidebar: '#d6ab64',
            vanta: {
               effect: VANTA.FOG,
                options: {
                highlightColor: 0xe82c37,
                midtoneColor: 0xb7de8a,
                lowlightColor: 0xc47ed9,
                baseColor: 0xdec65c,
                blurFactor: 0.51,
                speed: 2.00,
                zoom: 1.10
                }
            }
        },
        hacker: {
            sidebar: '#106509',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x1eff0f,
                midtoneColor: 0x0,
                lowlightColor: 0x54c83d,
                baseColor: 0x0,
                speed: 2.40,
                zoom: 1.10
                }
            }
        },
        ocean: {
            sidebar: '#4779ad',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x7a7bb6,
                midtoneColor: 0x3e8dc5,
                lowlightColor: 0x407dd7,
                baseColor: 0x0,
                speed: 2.40,
                zoom: 1.10
                }
            }
        },
        "iced coffee": {
            sidebar: '#e0ca95',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xe3daa3,
                midtoneColor: 0xe3c794,
                lowlightColor: 0xe6c9b0,
                baseColor: 0xbe9747,
                speed: 2.40,
                zoom: 1.10
                }
            }
        },
        "night time": {
            sidebar: '#400758',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x10041b,
                midtoneColor: 0x6a0993,
                lowlightColor: 0x590d51,
                baseColor: 0x0,
                speed: 2.40,
                zoom: 1.10
                }
            }
        },
        galaxy: {
            sidebar: '#571d97',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0x684389,
                midtoneColor: 0x55119b,
                lowlightColor: 0x22067d,
                baseColor: 0x0,
                blurFactor: 0.59,
                speed: 0.90,
                zoom: 1.10
                }
            }
        },
        forest: {
            sidebar: '#579d58',
            vanta: {
                effect: VANTA.FOG,
                options: {
                highlightColor: 0xb4c37d,
                midtoneColor: 0x25b34d,
                lowlightColor: 0x3d9b52,
                baseColor: 0x335c3d,
                speed: 2.40,
                zoom: 1.10
                }
            }
        },
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
