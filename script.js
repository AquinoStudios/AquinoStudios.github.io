// ==========================================
// AQUINO STUDIOS - SCRIPT ACTUALIZADO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initCounters();
    initScrollEffects();
    initBackToTop();
    initSmoothScroll();
});

// ------------------------------------------
// 1. SISTEMA DE PARTÍCULAS MEJORADO
// ------------------------------------------
function initParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };
    
    const particleCount = 30;
    const connectionDistance = 120;
    const mouseDistance = 150;
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Seguir mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.baseOpacity = Math.random() * 0.5 + 0.2;
            this.opacity = this.baseOpacity;
        }
        
        update() {
            // Movimiento base
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebote en bordes
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            
            // Interacción con mouse
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouseDistance) {
                    const force = (mouseDistance - distance) / mouseDistance;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                    this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
                } else {
                    this.opacity = this.baseOpacity;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Dibujar conexiones
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            
            // Conectar con mouse si está cerca
            if (mouse.x && mouse.y) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouseDistance) {
                    const opacity = (1 - distance / mouseDistance) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Loop de animación
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pausar cuando no es visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ------------------------------------------
// 2. NAVEGACIÓN ACTIVA
// ------------------------------------------
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.padding = '10px 50px';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.padding = '15px 50px';
        }
    });
}

// ------------------------------------------
// 3. CONTADORES ANIMADOS
// ------------------------------------------
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (target - start) + start);
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// ------------------------------------------
// 4. EFECTOS DE SCROLL
// ------------------------------------------
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animar elementos
    const animateElements = document.querySelectorAll('.game-card, .about-content, .social-card, .stat-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ------------------------------------------
// 5. BOTÓN VOLVER ARRIBA
// ------------------------------------------
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ------------------------------------------
// 6. SCROLL SUAVE PARA ENLACES
// ------------------------------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Altura del navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ------------------------------------------
// 7. FUNCIONES DE JUEGOS
// ------------------------------------------
function openGame(url) {
    window.open(url, '_blank');
}

function showGameInfo(gameId) {
    const modal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');
    
    const gameInfo = {
        'obby': {
            title: 'OBBY IMPOSIBLE',
            content: `
                <h2>OBBY IMPOSIBLE</h2>
                <p>El desafío definitivo de parkour en Roblox. Con más de 50 niveles diseñados para poner a prueba tus habilidades.</p>
                <h3>Características:</h3>
                <ul>
                    <li>50+ niveles de dificultad progresiva</li>
                    <li>Sistema de checkpoints</li>
                    <li>Tabla de clasificación global</li>
                    <li>Recompensas diarias</li>
                    <li>Actualizaciones mensuales con nuevos niveles</li>
                </ul>
                <h3>Próximas actualizaciones:</h3>
                <p>Modo competitivo 1v1, nuevos obstáculos, y sistema de clanes.</p>
            `
        },
        'speed': {
            title: 'SPEED RUN SIMULATOR',
            content: `
                <h2>SPEED RUN SIMULATOR</h2>
                <p>Compite contra tus amigos para ver quién es el más rápido de Roblox.</p>
                <h3>Características:</h3>
                <ul>
                    <li>Carreras multijugador en tiempo real</li>
                    <li>Mejoras de velocidad permanentes</li>
                    <li>Mascotas que boostean tu velocidad</li>
                    <li>Eventos semanales con premios</li>
                </ul>
            `
        }
    };
    
    const info = gameInfo[gameId];
    if (info) {
        modalBody.innerHTML = info.content;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
}

function shareGame(gameName) {
    if (navigator.share) {
        navigator.share({
            title: gameName,
            text: `¡Juega ${gameName} de Aquino Studios!`,
            url: window.location.href
        }).catch(err => console.log('Error compartiendo:', err));
    } else {
        // Fallback: copiar al portapapeles
        const text = `¡Juega ${gameName} de Aquino Studios! ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('¡Enlace copiado al portapapeles!');
        });
    }
}

function notifyMe() {
    const email = prompt('Introduce tu correo para recibir notificaciones cuando salga el nuevo juego:');
    if (email && email.includes('@')) {
        alert('¡Gracias! Te notificaremos cuando esté disponible.');
    } else if (email) {
        alert('Por favor introduce un correo válido.');
    }
}

// ------------------------------------------
// 8. NEWSLETTER
// ------------------------------------------
function subscribeNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const email = input.value;
    
    if (email && email.includes('@')) {
        alert(`¡Gracias por suscribirte! Te enviaremos novedades a ${email}`);
        input.value = '';
    } else {
        alert('Por favor introduce un correo válido.');
    }
}

// ------------------------------------------
// 9. PARALLAX SUAVE
// ------------------------------------------
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.header-content');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
