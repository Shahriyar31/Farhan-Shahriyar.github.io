// src/scripts/animations.js

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // A general function for animating cards that fade and slide up
    const animateCardsUp = (selector, staggerAmount = 0.1) => {
        const cards = gsap.utils.toArray(selector);
        if (cards.length === 0) return;

        // Set the initial invisible state
        gsap.set(cards, { autoAlpha: 0, y: 50 });

        // Create a ScrollTrigger for the batch of cards
        ScrollTrigger.batch(cards, {
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                stagger: staggerAmount,
                ease: "power3.out",
                duration: 0.8
            }),
            start: "top 85%",
        });
    };

    // A general function for the timeline's alternating slide-in animation
    const animateTimelineItems = (selector) => {
        const items = gsap.utils.toArray(selector);
        if (items.length === 0) return;

        items.forEach(item => {
            const isLeft = item.classList.contains('lg:timeline-item-left');
            
            // Set the initial invisible state
            gsap.set(item, { autoAlpha: 0, x: isLeft ? -50 : 50 });

            // Animate to the final state
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                autoAlpha: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    };

    // --- Apply all animations across the site ---
    animateCardsUp('.project-card');
    animateCardsUp('.skill-card-container', 0.05);
    animateCardsUp('.detail-card', 0.1); // For the hero section details
    animateTimelineItems('#experience .timeline-item');
    animateTimelineItems('#education .timeline-item');
});