document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const appointmentForm = document.getElementById('appointmentForm');

    // Loader
    setTimeout(() => {
        loader.classList.add('loaded');
        initAnimations();
    }, 1500);

    function initAnimations() {
        animateHero();
        animateStats();
    }

    function animateHero() {
        const elements = document.querySelectorAll('.hero-subtitle, .hero-title .line, .hero-desc, .hero-btns');
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (i * 150));
        });
    }

    function animateStats() {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (!target) return;
            
            let current = 0;
            const increment = target / 80;
            const duration = 2500;
            const stepTime = duration / 80;
            
            setTimeout(() => {
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, stepTime);
            }, 1000);
        });
    }

    // Scroll effects
    window.addEventListener('scroll', () => {
        // Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            const name = data[0] || 'Not provided';
            const phone = data[1] || 'Not provided';
            const email = data[2] || 'Not provided';
            const service = this.querySelector('select').value || 'Not specified';
            const message = this.querySelector('textarea').value || 'None';
            
            const serviceMap = {
                'consultation': 'General Consultation',
                'whitening': 'Teeth Whitening',
                'implants': 'Dental Implants',
                'invisalign': 'Invisalign',
                'veneers': 'Veneers',
                'other': 'Other'
            };
            
            const whatsappMsg = `Hi, I would like to book a consultation.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${serviceMap[service] || service}%0A%0A*Message:* ${message}`;
            
            const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMsg}`;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = '#25D366';
                
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 500);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    appointmentForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    console.log('DentaLux - Premium Dental Studio Loaded!');
});
