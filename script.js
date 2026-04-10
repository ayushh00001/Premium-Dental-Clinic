document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const appointmentForm = document.getElementById('appointmentForm');
    const dateInput = document.querySelector('input[type="date"]');

    setTimeout(() => {
        loader.classList.add('loaded');
        initAnimations();
    }, 1500);

    function initAnimations() {
        animateHero();
        animateStats();
        animateOnScroll();
    }

    function animateHero() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title .line, .hero-desc, .hero-stats, .hero-btns');
        
        heroElements.forEach((elem, index) => {
            elem.style.opacity = '0';
            elem.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                elem.style.transition = 'all 0.6s ease';
                elem.style.opacity = '1';
                elem.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (!target) return;
            
            let current = 0;
            const increment = target / 60;
            const duration = 2000;
            const stepTime = duration / 60;
            
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

    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .doctor-card, .process-step, .contact-card, .gallery-item').forEach(elem => {
            elem.style.opacity = '0';
            elem.style.transform = 'translateY(40px)';
            elem.style.transition = 'all 0.6s ease';
            observer.observe(elem);
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            const name = data.get ? data.get('name') : data.name;
            const phone = data.get ? data.get('phone') : data.phone;
            const service = data.get ? data.get('service') : data.service;
            const date = data.get ? data.get('date') : data.date;
            const time = data.get ? data.get('time') : data.time;
            const message = data.get ? data.get('message') : data.message || 'None';
            
            const formattedService = formatService(service);
            const formattedDate = formatDate(date);
            const formattedTime = formatTime(time);
            
            const whatsappMsg = `Hi, I would like to book an appointment.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${formattedService}%0A*Date:* ${formattedDate}%0A*Time:* ${formattedTime}%0A%0A*Message:* ${message}`;
            
            const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMsg}`;
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 500);
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    appointmentForm.reset();
                }, 4000);
            }, 1000);
        });
    }

    function formatService(service) {
        const services = {
            'consultation': 'General Consultation',
            'whitening': 'Teeth Whitening',
            'invisalign': 'Invisalign / Braces',
            'implants': 'Dental Implants',
            'rootcanal': 'Root Canal',
            'crowns': 'Crowns & Veneers',
            'pediatric': 'Pediatric Dentistry',
            'emergency': 'Emergency Care'
        };
        return services[service] || service || 'Not specified';
    }

    function formatDate(dateStr) {
        if (!dateStr) return 'Not set';
        const date = new Date(dateStr);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    }

    function formatTime(time) {
        if (!time) return 'Not set';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }

    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((elem, index) => {
        setTimeout(() => {
            elem.style.opacity = '1';
            elem.style.transform = 'translateY(0)';
        }, index * 100);
    });

    console.log('DentaLux Dental Website Loaded Successfully!');
});
