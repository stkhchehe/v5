let vantaEffect = null;

const themes = {
    default: {
        effect: 'FOG',
        config: {
            highlightColor: 0x3b4057,
            midtoneColor: 0x4d5389,
            lowlightColor: 0x5b5b7f,
            baseColor: 0x353555,
            blurFactor: 0.52,
            speed: 1.60,
            zoom: 0.90
        }
    },
    cyberpunk: {
        effect: 'NET',
        config: {
            color: 0xff00ff,
            backgroundColor: 0x000000,
            points: 15,
            maxDistance: 25,
            spacing: 15,
            showDots: true
        }
    },
    ocean: {
        effect: 'WAVES',
        config: {
            color: 0x006994,
            shininess: 30,
            waveHeight: 15,
            waveSpeed: 0.75,
            zoom: 0.75
        }
    },
    matrix: {
        effect: 'NET',
        config: {
            color: 0x00ff00,
            backgroundColor: 0x001100,
            points: 20,
            maxDistance: 15,
            spacing: 15,
            showDots: true
        }
    },
    cosmos: {
        effect: 'DOTS',
        config: {
            color: 0xffffff,
            backgroundColor: 0x000000,
            size: 2,
            spacing: 40,
            showLines: true
        }
    },
    aurora: {
        effect: 'FOG',
        config: {
            highlightColor: 0x00ffbb,
            midtoneColor: 0x00ff9f,
            lowlightColor: 0x00cc7f,
            baseColor: 0x00e68f,
            blurFactor: 0.7,
            speed: 2.0
        }
    },
    sunset: {
        effect: 'CLOUDS',
        config: {
            backgroundColor: 0xff7e5f,
            skyColor: 0xff5e3a,
            cloudColor: 0xfeb47b,
            cloudShadowColor: 0xff5e3a,
            speed: 1.5
        }
    },
    neon: {
        effect: 'RINGS',
        config: {
            backgroundColor: 0x000000,
            color: 0xff00ff,
            scale: 1,
            scaleMobile: 1
        }
    },
    birds: {
        effect: 'BIRDS',
        config: {
            backgroundColor: 0x191970,
            color1: 0x2a2a8c,
            color2: 0x0f0f4b,
            birdSize: 1.5,
            wingSpan: 20,
            speedLimit: 3,
            separation: 50
        }
    },
    cells: {
        effect: 'CELLS',
        config: {
            color1: 0x0,
            color2: 0x3b4057,
            size: 2,
            speed: 1
        }
    },
    synthwave: {
        effect: 'WAVES',
        config: {
            color: 0xff00ff,
            shininess: 80,
            waveHeight: 25,
            waveSpeed: 1.5,
            zoom: 0.7
        }
    },
    digital: {
        effect: 'NET',
        config: {
            color: 0x00ffff,
            backgroundColor: 0x001414,
            points: 12,
            maxDistance: 20,
            spacing: 18,
            showDots: true
        }
    },
    nebula: {
        effect: 'FOG',
        config: {
            highlightColor: 0x8a2be2,
            midtoneColor: 0x4b0082,
            lowlightColor: 0x800080,
            baseColor: 0x483d8b,
            blurFactor: 0.6,
            speed: 1.8,
            zoom: 1.0
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

        // Save the selected theme to localStorage
        localStorage.setItem('selectedTheme', themeName);
        
        // Update sidebar color if applicable
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.backgroundColor = `#${theme.config.backgroundColor?.toString(16) || '3d4060'}`;
        }
    } catch (error) {
        console.error(`Failed to initialize theme: ${themeName}`, error);
        // Fallback to default theme if there's an error
        if (themeName !== 'default') {
            initVantaEffect('default');
        }
    }
}

// Add click event listeners to theme circles
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage or use default
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

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        const savedTheme = localStorage.getItem('selectedTheme') || 'default';
        initVantaEffect(savedTheme);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (vantaEffect) {
        vantaEffect.resize();
    }
});

// Optional: Add theme preview on hover
document.querySelectorAll('.theme-circle').forEach(circle => {
    let originalTheme;
    
    circle.addEventListener('mouseenter', () => {
        originalTheme = localStorage.getItem('selectedTheme');
        initVantaEffect(circle.dataset.theme);
    });

    circle.addEventListener('mouseleave', () => {
        if (originalTheme) {
            initVantaEffect(originalTheme);
        }
    });
});
