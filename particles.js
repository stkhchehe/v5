particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 30,          // Reduced number for better separation
      "density": {
        "enable": true,
        "value_area": 2500  // Increased area for more separation
      }
    },
    "color": {
      "value": "#ffffff"    // White particles
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.6,        // Medium opacity
      "random": false,     // Consistent opacity
      "anim": {
        "enable": true,
        "speed": 0.5,
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 5,          // Larger particle size
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "size_min": 3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false      // No connecting lines
    },
    "move": {
      "enable": true,
      "speed": 2,         // Moderate speed
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
