gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const appointmentForm = document.getElementById('appointmentForm');
    const dateInput = document.getElementById('date');
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    setTimeout(() => {
        loader.classList.add('loaded');
        initParticles();
        initAnimations();
    }, 1500);

    function initParticles() {
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resize();
        window.addEventListener('resize', resize);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 201, 167, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    function initAnimations() {
        gsap.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.2
        });

        gsap.from('.title-small', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: 0.4
        });

        gsap.from('.title-large', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: 0.5
        });

        gsap.from('.hero-desc', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.7
        });

        gsap.from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.9
        });

        gsap.from('.hero-actions', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 1.1
        });

        gsap.from('.hero-trust', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 1.3
        });

        gsap.from('.hero-image', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero-card', {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            stagger: 0.2,
            delay: 1
        });

        animateStats();
        initScrollAnimations();
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (!target) return;
            
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                delay: 1,
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    stat.innerHTML = Math.ceil(parseFloat(stat.innerHTML)) + '+';
                }
            });
        });
    }

    function initScrollAnimations() {
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveNavLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            updateActiveNavLink();
        });

        gsap.utils.toArray('.section-label, .section-title, .about-lead, .about-desc, .about-highlights, .services-desc').forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        });

        gsap.from('.about-main', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -80,
            duration: 1.2
        });

        gsap.from('.about-exp', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0,
            duration: 0.8,
            delay: 0.5
        });

        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                delay: i * 0.1
            });
        });

        gsap.utils.toArray('.step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: '.how-it-works',
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: i * 0.2
            });
        });

        gsap.utils.toArray('.team-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                delay: i * 0.15
            });
        });

        gsap.utils.toArray('.info-card, .contact-form-wrapper').forEach(elem => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.8
            });
        });

        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '.gallery',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.1
        });

        gsap.from('.cta-box', {
            scrollTrigger: {
                trigger: '.cta',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 1
        });

        gsap.from('.map-grid', {
            scrollTrigger: {
                trigger: '.map',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 1
        });
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
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

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            const name = data.name;
            const phone = data.phone;
            const service = data.service;
            const date = data.date;
            const time = data.time;
            
            const whatsappMsg = `Hi, I would like to book an appointment.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${formatService(service)}%0A*Date:* ${formatDate(date)}%0A*Time:* ${formatTime(time)}%0A%0A*Message:* ${data.message || 'None'}`;
            
            const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMsg}`;
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                appointmentForm.reset();
            }, 4000);
        });
    }

    function formatService(service) {
        const services = {
            'consultation': 'General Consultation',
            'whitening': 'Teeth Whitening',
            'braces': 'Braces / Aligners',
            'implants': 'Dental Implants',
            'root-canal': 'Root Canal',
            'crowns': 'Crowns & Bridges',
            'cosmetic': 'Cosmetic Dentistry',
            'pediatric': 'Pediatric Dentistry',
            'emergency': 'Emergency Care',
            'other': 'Other'
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

    if (document.querySelector('.newsletter-form')) {
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const btn = this.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            input.value = '';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }, 3000);
        });
    }

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.querySelectorAll('a, button, .service-card, .team-card, .gallery-item').forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            elem.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    document.querySelectorAll('[data-lightbox]').forEach(item => {
        item.addEventListener('click', () => {
            const svg = item.querySelector('svg');
            if (svg) {
                lightboxContent.innerHTML = '';
                lightboxContent.appendChild(svg.cloneNode(true));
                lightbox.classList.add('active');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialsTrack = document.getElementById('testimonialsTrack');

    if (testimonialPrev && testimonialNext && testimonialsTrack) {
        let scrollPosition = 0;
        const cardWidth = 404;

        testimonialPrev.addEventListener('click', () => {
            scrollPosition = Math.max(0, scrollPosition - cardWidth);
            testimonialsTrack.style.animation = 'none';
            testimonialsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });

        testimonialNext.addEventListener('click', () => {
            const maxScroll = testimonialsTrack.scrollWidth - testimonialsTrack.parentElement.offsetWidth;
            scrollPosition = Math.min(maxScroll, scrollPosition + cardWidth);
            testimonialsTrack.style.animation = 'none';
            testimonialsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
    }

    console.log('Premium Dental Clinic Website Loaded Successfully!');
});
