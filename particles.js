particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40,          // Reduced number for better separation
      "density": {
        "enable": true,
        "value_area": 2000  // Increased area for more separation
      }
    },
    "color": {
      "value": "#ffffff"    // White particles
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5,        // Increased opacity
      "random": false,     // Consistent opacity
      "anim": {
        "enable": false
      }
    },
    "size": {
      "value": 4,          // Larger particle size
      "random": true,
      "anim": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": false      // No connecting lines
    },
    "move": {
      "enable": true,
      "speed": 1.5,       // Moderate speed
      "direction": "right",
      "random": false,
      "straight": true,    // Straight movement
      "out_mode": "wrap", // Loop back when reaching edge
      "bounce": false,
      "attract": {
        "enable": false
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    }
  },
  "retina_detect": true
});
