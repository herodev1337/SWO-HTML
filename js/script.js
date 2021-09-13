/* LETTERIZE START */

var textWrapper = document.querySelector('.letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  });

/* LETTERIZE END */

/* INVIEWPORT START */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          if($(entry.target).attr('aria-loaded')) return;
          
          var bar = new ProgressBar.SemiCircle(entry.target, {
              strokeWidth: 6,
              color: '#ED6A5A',
              trailColor: '#eee',
              trailWidth: 1,
              easing: 'easeInOut',
              duration: 2000,
              svgStyle: null,
              text: {
                  value: '',
                  alignToBottom: false
              },
              from: {color: '#ED6A5A'},
              to: {color: '#32CD32'},
              
              step: (state, bar) => {
                  bar.path.setAttribute('stroke', state.color);
                  var value = Math.round(bar.value() * 100);
                  if (value === 0) {
                      bar.setText('');
                  } else {
                      bar.setText(value);
                  }
              
                  bar.text.style.color = state.color;
              }
          });
  
          bar.animate($(entry.target).attr('aria-valuenow')/100);
          $(entry.target).attr('aria-loaded', true);
        return;
      }
    });
  });
  
  $('*[id^="progress-animated-"]').each(function(i, obj) {
      observer.observe(document.getElementById($(this)[0].id));
  });

/* INVIEWPORT END */

/* RESIZENAVBAR START */

window.onscroll = function() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $('*[class^="section"]').each(function( index ) {
            $(this).addClass('d-none');
          });
      } else {
        $('*[class^="section"]').each(function( index ) {
            $(this).removeClass('d-none');
          });
      }
};

/* RESIZENAVBAR END */

/* PARTICLEJS START */
particlesJS('particle-js',
  
{
    "particles": {
      "number": {
        "value": 5,
        "density": {
          "enable": true,
          "value_area": 80
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }

);

/* PARTICLEJS END*/