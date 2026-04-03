
document.querySelectorAll('.overlayDiv').forEach(overlay => {
  overlay.addEventListener('mouseenter', function() {
    this.style.opacity = 1;
  });
  
  overlay.addEventListener('mouseleave', function() {
    this.style.opacity = 0;
  });
});

// Top hero section animation
const topHeroAnimation = () => {
  if (!window.gsap) return;

  // Intro pop-in
  gsap.from(".top-hero-triangle", {
    duration: 1.4,
    scale: 0.7,
    rotation: -12,
    opacity: 0,
    ease: "power3.out",
  });

  // Subtle floating loop
  gsap.to(".top-hero-triangle", {
    y: -20,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};


const CanAnimation = () => {
  // Kill any existing ScrollTriggers to prevent conflicts
  ScrollTrigger.killAll();
  
  // Force scroll position refresh
  ScrollTrigger.refresh();
  
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#mainWrapperPage",
      scroller: "body",
      start: "top -5%",
      end: "top -330%",
      scrub: 1.2,
      ease: "power2.out",
      invalidateOnRefresh: true, // Recalculate on refresh
      anticipatePin: 1, // Better performance
      refreshPriority: -1, // Lower priority for smoother experience
    },
  });

  // Initial state setup - optimized with individual properties
  gsap.set(".box-1", {
      left: "50%",
    top: "50%", 
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    opacity: 0.7,
    zIndex: 1,
  });
  gsap.set(".box-2", {
    x: "-50%",
    y: "-50%",
         left: "0%",
    top: "50%", 
    scale: 1,
    opacity: 1,
    zIndex: 1,
  });
  gsap.set(".box-3", {
         left: "100%",
    top: "50%", 
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
    zIndex: 1,
  });

  // Phase A: Box rotation with smooth easing
  tl.to(".box-1", {
    ease: "power2.inOut",
    left: "0%",
    top: "50%", 
    opacity: 0.7,
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 3,
    duration: 0.8,
  }, 'a')
  .to(".box-2", {
    ease: "power2.inOut",
    left: "50%",
    top: "50%",
    opacity: 1,
    x: "-50%",
    y: "-50%",
    scale: 1,
    zIndex: 3,
    duration: 0.8,
  }, 'a')
  .to(".box-3", {
    ease: "power2.inOut",
    left: "100%",
    top: "50%",
    opacity: 0.7,
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 1,
    duration: 0.8,
  }, 'a');

  // Phase B: Next rotation with enhanced smoothness
  tl.to(".box-1", {
    ease: "power2.inOut",
    left: "50%",
    top: "50%",
    opacity: 1,
    x: "-50%",
    y: "-50%",
    scale: 1,
    zIndex: 3,
    duration: 0.8,
  }, 'b')
  .to(".box-2", {
    ease: "power2.inOut",
    left: "100%",
    top: "50%",
    opacity: 0.8,
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 1,
    duration: 0.8,
  }, 'b')
  .to(".box-3", {
    ease: "power2.inOut",
    left: "0%",
    top: "50%",
    opacity: 0.7,
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 1,
    duration: 0.8,
  }, 'b');

  // Phase C: Third rotation with optimized performance
  tl.to(".box-1", {
    ease: "power2.inOut",
    left: "100%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    opacity: 0.7,
    zIndex: 1,
    duration: 0.8,
  }, 'c')
  .to(".box-2", {
    ease: "power2.inOut",
    left: "0%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 1,
    opacity: 0.7,
    duration: 0.8,
  }, 'c')
  .to(".box-3", {
    ease: "power2.inOut",
    left: "50%",
    top: "50%",
    opacity: 1,
    x: "-50%",
    y: "-50%",
    scale: 1,
    zIndex: 3,
    duration: 0.8,
  }, 'c');

  // Phase D: Final rotation with smooth completion
  tl.to(".box-1", {
    ease: "power2.inOut",
    left: "0%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    opacity: 0.7,
    zIndex: 1,
    duration: 0.8,
  }, 'd')
  .to(".box-2", {
    ease: "power2.inOut",
    left: "50%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 1,
    zIndex: 3,
    opacity: 1,
    duration: 0.8,
  }, 'd')
  .to(".box-3", {
    ease: "power2.inOut",
    left: "100%",
    top: "50%",
    opacity: 0.7,
    x: "-50%",
    y: "-50%",
    scale: 0.6,
    zIndex: 1,
    duration: 0.8,
  }, 'd');

  // Optional: Add performance optimization
  gsap.set([".box-1", ".box-2", ".box-3"], {
    force3D: true,
    transformOrigin: "center center",
     pointerEvents: "auto"
  });
};

// Proper initialization with scroll position handling
const initAnimation = () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Handle page reload at different scroll positions
  ScrollTrigger.addEventListener("refresh", () => {
    // Reset scroll position awareness
    ScrollTrigger.batch([".box-1", ".box-2", ".box-3"], {
      once: true,
      onEnter: () => ScrollTrigger.refresh()
    });
  });
  
  // Initialize animations
  topHeroAnimation();
  CanAnimation();
  
  // Handle window resize and orientation change
  window.addEventListener('resize', ScrollTrigger.refresh);
  window.addEventListener('orientationchange', () => {
    setTimeout(ScrollTrigger.refresh, 100);
  });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimation);
} else {
  initAnimation();
}

// Additional fix for page reload at scroll position
window.addEventListener('beforeunload', () => {
  ScrollTrigger.killAll();
});

// Refresh ScrollTrigger after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});




const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");
  const closeOverlay = document.getElementById("closeOverlay");

  hamburger.addEventListener("click", () => {
    overlay.style.display = "block";
  });

  closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });