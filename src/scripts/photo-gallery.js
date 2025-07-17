// src/scripts/photo-gallery.js

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

function setupPhotographySection() {
    
    // --- MARQUEE LOGIC (no changes here) ---
    const marqueeTrack = document.querySelector('.marquee-track');
    const marqueeContainer = document.querySelector('.marquee-container');
    if (marqueeTrack && marqueeContainer) {
        const marqueeWidth = marqueeTrack.scrollWidth / 2;
        if (marqueeWidth > 0) {
            const marqueeTimeline = gsap.timeline({ repeat: -1 });
            marqueeTimeline.to(marqueeTrack, { x: -marqueeWidth, duration: 80, ease: "none" });
            marqueeContainer.addEventListener('mouseenter', () => marqueeTimeline.pause());
            marqueeContainer.addEventListener('mouseleave', () => marqueeTimeline.play());
        }
    }

    // --- GRID & BUTTON LOGIC ---
    const photoGrid = document.getElementById('photo-grid');
    const toggleBtn = document.getElementById('toggle-photos-btn');
    const finaleMessage = document.getElementById('finale-message');
    
    if (photoGrid && toggleBtn && finaleMessage && window.allPhotos) {
        const gridPhotos = window.allPhotos;
        const photosPerLoad = 10;
        let photosDisplayed = 0;

        // This function now just handles the shuffle animation
        const animateNewPhotos = () => {
            const lastItems = Array.from(photoGrid.children).slice(-photosPerLoad);
            gsap.to(lastItems, {
                x: () => gsap.utils.random(-10, 10),
                y: () => gsap.utils.random(-10, 10),
                rotation: () => gsap.utils.random(-5, 5),
                stagger: { each: 0.05, from: "random" },
                duration: 0.2,
                yoyo: true,
                repeat: 3
            });
        };

        const addPhotos = () => {
            const photosToAdd = gridPhotos.slice(photosDisplayed, photosDisplayed + photosPerLoad);
            photosToAdd.forEach(photoSrc => {
                const item = document.createElement('div');
                item.className = 'grid-photo-item';
                const img = document.createElement('img');
                img.src = photoSrc;
                img.alt = "A photograph by Farhan Shahriyar";
                img.loading = "lazy";
                img.className = 'gallery-image';
                item.appendChild(img);
                photoGrid.appendChild(item);
            });

            // First, run the fade-in animation
            gsap.to(photoGrid.querySelectorAll('.grid-photo-item'), { 
                opacity: 1, 
                stagger: 0.05, 
                duration: 0.6, 
                ease: "power2.out",
                // After the fade-in is complete, run the shuffle animation
                onComplete: animateNewPhotos 
            });
            
            photosDisplayed += photosToAdd.length;

            // Check if all photos have been loaded
            if (photosDisplayed >= gridPhotos.length) {
                finaleMessage.classList.remove('hidden');
                gsap.fromTo(finaleMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.5, duration: 0.5 });
                toggleBtn.innerText = 'Show Less';
            } else {
                 toggleBtn.innerText = 'Show More';
            }
        };

        const collapseGrid = () => {
            gsap.to(photoGrid.querySelectorAll('.grid-photo-item'), {
                opacity: 0, stagger: 0.05, duration: 0.5, ease: "power2.in",
                onComplete: () => {
                    photoGrid.innerHTML = '';
                    photosDisplayed = 0;
                    toggleBtn.innerText = 'Show More';
                    finaleMessage.classList.add('hidden');
                }
            });
        };
        
        toggleBtn.addEventListener('click', () => {
            const isFullyLoaded = photosDisplayed >= gridPhotos.length;
            if (isFullyLoaded) {
                collapseGrid();
            } else {
                addPhotos();
            }
        });
    }

    // --- ANIMATED LIGHTBOX LOGIC ---
    // (This section remains unchanged from the previous version)
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('close-lightbox');
    const photographySection = document.getElementById('photography');
    let hoverTimer = null;
    if (lightbox && lightboxImage && closeBtn && photographySection) {
        const openLightboxWithAnimation = (imageElement) => {
            const startState = Flip.getState(imageElement);
            lightboxImage.src = imageElement.src;
            lightbox.classList.remove('hidden');
            Flip.from(startState, {
                target: lightboxImage,
                duration: 0.7,
                ease: "power3.inOut"
            });
        };
        photographySection.addEventListener('mouseover', (e) => {
            if (e.target && e.target.classList.contains('gallery-image')) {
                hoverTimer = setTimeout(() => {
                    openLightboxWithAnimation(e.target);
                }, 3000);
            }
        });
        photographySection.addEventListener('mouseout', (e) => {
            if (e.target && e.target.classList.contains('gallery-image')) {
                clearTimeout(hoverTimer);
            }
        });
        const closeLightbox = () => {
            clearTimeout(hoverTimer);
            lightbox.classList.add('hidden');
        };
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
}

document.addEventListener('DOMContentLoaded', setupPhotographySection);