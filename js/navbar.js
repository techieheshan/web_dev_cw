// Shared navigation behaviour (all pages).
// At the top of the page, the thin utility bar is visible above the main nav row.
// Once the user scrolls down, the utility bar animates away and the header (which
// is CSS position: sticky) stays pinned to the top of the viewport with a shadow
// that fades in, so the main navigation is always reachable while scrolling.

const siteHeader = document.querySelector('header');

// Two different thresholds (hysteresis), not one: collapsing the utility bar shrinks
// the header's height, which shifts the page content and can nudge the scroll
// position back across a single shared threshold — flipping the state straight back
// and causing a visible "vibrating" loop. A gap between the enter/exit points stops
// that feedback loop.
const ENTER_SCROLLED_AT = 60;
const EXIT_SCROLLED_AT = 20;

let isScrolled = false;
let ticking = false;

function updateHeaderState() {
    const y = window.scrollY;

    if (!isScrolled && y > ENTER_SCROLLED_AT) {
        isScrolled = true;
        siteHeader.classList.add('header-scrolled');
    } else if (isScrolled && y < EXIT_SCROLLED_AT) {
        isScrolled = false;
        siteHeader.classList.remove('header-scrolled');
    }

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
    }
}

if (siteHeader) {
    updateHeaderState();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile hamburger toggle: on narrow screens the nav links/CTA are collapsed by
// default (see the max-width: 860px rules in css/navbar.css) and only appear once
// the toggle button is clicked and .nav-open is added to .main-nav.
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu automatically if the viewport is widened past the mobile
    // breakpoint while it's open, so it doesn't stay stuck open on desktop.
    window.addEventListener('resize', function () {
        if (window.innerWidth > 860 && mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}
