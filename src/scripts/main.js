import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Smooth Scrolling ---
const lenis = new Lenis({ lerp: 0.1 });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- Main Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector('.theme-btn');
    const sections = gsap.utils.toArray('section');
    const navLinks = gsap.utils.toArray('.control');

    // --- Theme Toggle Logic ---
    if (themeBtn) {
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        themeBtn.addEventListener('click', () => {
            const isDarkMode = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // --- Navigation Logic ---
    if (navLinks.length > 0) {
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        const id = section.getAttribute('id');
                        document.querySelector('.active-btn')?.classList.remove('active-btn');
                        document.querySelector(`.control[href="#${id}"]`)?.classList.add('active-btn');
                    }
                }
            });
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 50 }, ease: "power2.inOut" });
            });
        });
    }

    // --- Animation Logic ---
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            }
        });
    });
});