document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const controls = document.querySelectorAll('.control');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                // Remove active class from all controls
                controls.forEach(control => {
                    control.classList.remove('active-btn');
                });

                // Add active class to the matching control
                const matchingControl = document.querySelector(`.control[data-id="${id}"]`);
                if (matchingControl) {
                    matchingControl.classList.add('active-btn');
                }
            }
        });
    }, {
        root: null,
        threshold: 0.5 // Section is considered active when 50% is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add click listeners to scroll to section
    controls.forEach(control => {
        control.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        });
    });
});