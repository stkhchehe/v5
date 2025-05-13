document.addEventListener('DOMContentLoaded', () => {
    const themeChanger = document.querySelector('.theme-changer');
    let vantaEffect = null;

    // Complete theme configurations
    const themes = {
        default: {
            sidebar: '#3d4060',
            vanta: {
                highlightColor: 0x3b4057,
                midtoneColor: 0x4d5389,
                lowlightColor: 0x5b5b7f,
                baseColor: 0x353555
            }
        },
        black: {
            sidebar: '#000000',
            vanta: {
                highlightColor: 0x000000,
                midtoneColor: 0x1a1a1a,
                lowlightColor: 0x333333,
                baseColor: 0x000000
            }
        },
        blue: {
            sidebar: '#1e90ff',
            vanta: {
                highlightColor: 0x1e90ff,
                midtoneColor: 0x0000cd,
                lowlightColor: 0x4169e1,
                baseColor: 0x0000ff
            }
        },
        pink: {
            sidebar: '#ff69b4',
            vanta: {
                highlightColor: 0xff69b4,
                midtoneColor: 0xff1493,
                lowlightColor: 0xffc0cb,
                baseColor: 0xff69b4
            }
        },
        purple: {
            sidebar: '#800080',
            vanta: {
                highlightColor: 0x800080,
                midtoneColor: 0x4b0082,
                lowlightColor: 0x8b008b,
                baseColor: 0x800080
            }
        },
        red: {
            sidebar: '#ff0000',
            vanta: {
                highlightColor: 0xff0000,
                midtoneColor: 0xdc143c,
                lowlightColor: 0xff4500,
                baseColor: 0xff0000
            }
        },
        green: {
            sidebar: '#008000',
            vanta: {
                highlightColor: 0x008000,
                midtoneColor: 0x006400,
                lowlightColor: 0x228b22,
                baseColor: 0x008000
            }
        },
        yellow: {
            sidebar: '#ffd700',
            vanta: {
                highlightColor: 0xffd700,
                midtoneColor: 0xffa500,
                lowlightColor: 0xffff00,
                baseColor: 0xffd700
            }
        },
        orange: {
            sidebar: '#ff8c00',
            vanta: {
                highlightColor: 0xff8c00,
                midtoneColor: 0xff4500,
                lowlightColor: 0xffa500,
                baseColor: 0xff8c00
            }
        },
        brown: {
            sidebar: '#8b4513',
            vanta: {
                highlightColor: 0x8b4513,
                midtoneColor: 0xa0522d,
                lowlightColor: 0xd2691e,
                baseColor: 0x8b4513
            }
        },
        sunset: {
            sidebar: '#ff7e5f',
            vanta: {
                highlightColor: 0xff7e5f,
                midtoneColor: 0xff5f40,
                lowlightColor: 0xfeb47b,
                baseColor: 0xff7e5f
            }
        },
        hacker: {
            sidebar: '#00ff00',
            vanta: {
                highlightColor: 0x00ff00,
                midtoneColor: 0x008000,
                lowlightColor: 0x32cd32,
                baseColor: 0x000000
            }
        },
        ocean: {
            sidebar: '#00bfff',
            vanta: {
                highlightColor: 0x00bfff,
                midtoneColor: 0x0000ff,
                lowlightColor: 0x87ceeb,
                baseColor: 0x00bfff
            }
        },
        "iced coffee": {
            sidebar: '#b18f6a',
            vanta: {
                highlightColor: 0xb18f6a,
                midtoneColor: 0x967259,
                lowlightColor: 0xc4a484,
                baseColor: 0xb18f6a
            }
        },
        "night time": {
            sidebar: '#191970',
            vanta: {
                highlightColor: 0x191970,
                midtoneColor: 0x000080,
                lowlightColor: 0x483d8b,
                baseColor: 0x191970
            }
        },
        galaxy: {
            sidebar: '#4b0082',
            vanta: {
                highlightColor: 0x4b0082,
                midtoneColor: 0x800080,
                lowlightColor: 0x9400d3,
                baseColor: 0x4b0082
            }
        },
        forest: {
            sidebar: '#228b22',
            vanta: {
                highlightColor: 0x228b22,
                midtoneColor: 0x006400,
                lowlightColor: 0x32cd32,
                baseColor: 0x228b22
            }
        },
        "retro y2k": {
            sidebar: '#ff1493',
            vanta: {
                highlightColor: 0xff1493,
                midtoneColor: 0xff69b4,
                lowlightColor: 0xffc0cb,
                baseColor: 0xff1493
            }
        },
        bubblegum: {
            sidebar: '#ff69b4',
            vanta: {
                highlightColor: 0xff69b4,
                midtoneColor: 0xff1493,
                lowlightColor: 0xffc0cb,
                baseColor: 0xff69b4
            }
        },
        christmas: {
            sidebar: '#ff0000',
            vanta: {
                highlightColor: 0xff0000,
                midtoneColor: 0x008000,
                lowlightColor: 0xffffff,
                baseColor: 0xff0000
            }
        }
    };

    // Initialize Vanta effect
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

    // Apply saved theme or default on page load
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    applyTheme(savedTheme);

    // Add CSS for animations and styling
    const style = document.createElement('style');
    style.textContent = `
        .theme-changer {
            right: 20px;
            left: auto !important;
            width: 800px;
            transform: translateX(100%);
            animation: slideIn 0.5s forwards;
            transition: all 0.3s ease;
        }

        .theme-changer:hover {
            transform: scale(1.02);
            box-shadow: 0 0 40px rgba(0,0,0,0.5);
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
            cursor: pointer;
        }

        .theme-circle:hover {
            transform: scale(1.15);
            box-shadow: 0 0 20px rgba(255,255,255,0.6);
        }

        .theme-circle.active {
            border: 3px solid #fff;
            box-shadow: 0 0 25px rgba(255,255,255,0.8);
        }

        .theme-title {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 32px;
            text-transform: lowercase;
            letter-spacing: 1px;
            margin-bottom: 25px;
            color: white;
            transition: all 0.3s ease;
        }

        .theme-divider {
            height: 3px;
            background: linear-gradient(to right, transparent, #fff, transparent);
            margin: 20px 0;
            transition: all 0.3s ease;
        }

        .theme-circles {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
});
