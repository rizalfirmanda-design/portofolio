// Portfolio Script
// Uses standard JS with AOS for scroll animations

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate On Scroll)
    // This gives the "Framer Motion" feel of elements fading in as you scroll
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 2. Navbar Scroll Effect (Disabled as per request)
    // const navbar = document.getElementById('navbar');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 20) {
    //         navbar.classList.add('glass-nav', 'shadow-lg');
    //         navbar.classList.remove('py-4');
    //         navbar.classList.add('py-2');
    //     } else {
    //         navbar.classList.remove('glass-nav', 'shadow-lg');
    //         navbar.classList.remove('py-2');
    //         navbar.classList.add('py-4');
    //     }
    // });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        // Toggle body scroll
        if (!mobileMenu.classList.contains('translate-x-full')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // 4. Update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Starfield Animation (Space Travel Effect)
    initStarAnimation();
});

function initStarAnimation() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Star class
    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = (Math.random() - 0.5) * width; // Random x centered at 0
            this.y = (Math.random() - 0.5) * height; // Random y centered at 0
            this.z = Math.random() * width; // Random depth
            this.pz = this.z; // Previous z for trail
        }

        update() {
            // Speed factor
            const speed = 2; // Adjust for faster/slower stars

            this.z = this.z - speed;

            // Reset if star passes the viewer
            if (this.z < 1) {
                this.reset();
                this.z = width;
                this.pz = this.z;
            }
        }

        draw() {
            // Perspective projection formula
            // x_screen = (x / z) * fov + center_x

            const x = (this.x / this.z) * width + width / 2;
            const y = (this.y / this.z) * height + height / 2;

            const radius = (1 - this.z / width) * 2; // Size based on depth

            // Simple check bounds
            if (x < 0 || x > width || y < 0 || y > height) return;

            ctx.beginPath();
            ctx.arc(x, y, radius > 0 ? radius : 0, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.globalAlpha = (1 - this.z / width); // Fade in as it gets closer
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    // Create stars array
    const stars = [];
    const starCount = 200; // Number of stars

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.fillStyle = "#0b1121"; // Dark background to clear (match bg color)
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle Window Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    animate();
}
