/*!
* Start Bootstrap - Stylish Portfolio v6.0.2 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

anime({
    targets:'#logo-svg path',
    strokeDashoffset: [anime.setDashoffset,0],
    easing:'easeInOutQuad',
    duration:5000,
    stroke: '#534898',
    direction:'aternate',
    loop:true
})

anime({
    targets:'.inline',
    duration:400,
    scale:1.8,
    loop: true,
    direction: 'alternate',
    easing: 'easeOutElastic(1, .6)'
})


anime({
    targets: '.battery',
    points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
    baseFrequency: 0,
    scale: 1,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutExpo'
    });


var logEl = document.querySelector('.data-elem');
var data = {
  temperatura: '12.3',
  presencia: 0
}

anime({
  targets: data,
  temperatura: '25.0',
  presencia: 1,
  round: 1,
  easing: 'linear',
  loop:true,
  duration:2000,
  direction:'alternate',

  update: function() {
    logEl.innerHTML = 'Temp : ' + data.temperatura + '°C,     ' + 'Presencia : ' + data.presencia;
  }
});

anime({
    targets: '.item-ball-1',
    keyframes: [
      
        {translateX: 200,
          duration: 5000
        },
        {translateY: 10,
        duration: 1000,},
        {translateX: 0,
        duration: 1000,},
        {translateY: 0,
        duration: 3000},
        
      ],
      //duration: 6000,
      easing: 'easeOutElastic(1, .8)',
      loop: true,
})

anime({
    targets: '.item-ball-2',
    keyframes: [

        {translateY: 10,
        duration: 2000,},

        {translateX: -20,
          duration: 5000
        },
        {translateX: 0,
        duration: 1000,},
        {translateY: 0,
        duration: 3000},
        
      ],
      //duration: 6000,
      easing: 'easeOutElastic(1, .8)',
      loop: true,
})

anime({
    targets: '.item-ball-2',
    keyframes: [

        {translateY: 10,
        duration: 2000,},

        {translateX: -20,
          duration: 5000
        },
        {translateX: 0,
        duration: 1000,},
        {translateY: 0,
        duration: 3000},
        
      ],
      //duration: 6000,
      easing: 'easeOutElastic(1, .8)',
      loop: true,
})

anime({
    targets: '.thermo',
    keyframes: [

        {height: '40%',
        duration: 500,},

        {height: '0%',
          duration: 1000
        },
        
      ],
      //duration: 6000,
      easing: 'easeOutElastic(1, .8)',
      loop: true,
})

anime({
    targets:'.circle__back-1',
    keyframes: [
        {scale: 2, opacity: 1, duration:700},
        {scale: 4, opacity: 1, duration:700},
        {scale: 8, opacity: 0, duration:1000},

      ],
    easing: 'linear',
    loop: true,
    autoplay:true
})