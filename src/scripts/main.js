import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeBtn = document.querySelector('.theme-btn');
    const htmlEl = document.documentElement;

    if (themeBtn && htmlEl) {
        const applyTheme = (theme) => {
            if (theme === 'light') {
                htmlEl.classList.add('light-mode');
                htmlEl.classList.remove('dark');
            } else {
                htmlEl.classList.remove('light-mode');
                htmlEl.classList.add('dark');
            }
        };

        themeBtn.addEventListener('click', () => {
            const isDark = htmlEl.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    }

    // --- ACTIVE NAVIGATION LINK LOGIC ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.control');
    const activeLine = document.getElementById('nav-active-line');

    if (sections.length > 0 && navLinks.length > 0 && activeLine) {
        const setActive = (activeLink) => {
            if (!activeLink) return;
            navLinks.forEach(link => link.classList.remove('active-btn'));
            activeLink.classList.add('active-btn');
            
            gsap.to(activeLine, {
                top: activeLink.offsetTop,
                duration: 0.4,
                ease: 'power2.out'
            });
        };

        const homeLink = document.querySelector('.control[data-section="home"]');
        if (homeLink) {
            setActive(homeLink);
        }

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        const sectionId = section.getAttribute('id');
                        // THIS LINE IS CORRECTED to use 'data-section'
                        const correspondingLink = document.querySelector(`.control[data-section="${sectionId}"]`);
                        if (correspondingLink) {
                            setActive(correspondingLink);
                        }
                    }
                }
            });
        });
    }
});