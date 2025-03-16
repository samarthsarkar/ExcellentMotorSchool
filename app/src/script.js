// JavaScript for dark mode toggle, hamburger menu, and interactive testimonials
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const desktopNav = document.querySelector('.desktop-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            desktopNav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (desktopNav && desktopNav.classList.contains('active') && 
            !desktopNav.contains(event.target) && 
            !hamburger.contains(event.target)) {
            desktopNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Interactive testimonials
    const reviews = document.querySelectorAll('.review');
    
    reviews.forEach(review => {
        review.addEventListener('click', function() {
            // Toggle expanded class
            this.classList.toggle('expanded');
            
            // If this review is expanded, collapse others
            if (this.classList.contains('expanded')) {
                reviews.forEach(otherReview => {
                    if (otherReview !== this) {
                        otherReview.classList.remove('expanded');
                    }
                });
            }
        });
    });
    
    // Testimonial carousel functionality
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const container = carousel.querySelector('.testimonial-container');
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Initialize carousel
        updateCarousel();
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Update carousel position and active dot
        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto-advance carousel
        setInterval(function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
    }
    
    // Add page transition effect
    document.body.classList.add('page-transition');
});

// Add staggered animation to elements when they enter viewport
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card, .container, .review');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with staggered delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all elements
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});
