// ==========================================
// AQUINO STUDIOS - SCRIPT PRINCIPAL
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initLogoEffect();
    initButtonEffects();
    initScrollAnimations();
});

// ------------------------------------------
// 1. SISTEMA DE PARTÍCULAS DE FONDO
// ------------------------------------------
function initParticles() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    const particleCount = 25; // Pocas partículas para no saturar
    const connectionDistance = 100;
    
    // Redimensionar canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Clase Partícula
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocidad lenta
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebote en bordes
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
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
    
    // Dibujar líneas entre partículas cercanas
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Loop de animación
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ------------------------------------------
// 2. EFECTO DE BRILLO EN EL LOGO
// ------------------------------------------
function initLogoEffect() {
    const logo = document.getElementById('studioLogo');
    if (!logo) return;
    
    logo.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
    });
}

// ------------------------------------------
// 3. EFECTOS DE BOTONES
// ------------------------------------------
function initButtonEffects() {
    const btn = document.getElementById('playButton');
    if (!btn) return;
    
    // Efecto de onda al hacer clic
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Agregar keyframes dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ------------------------------------------
// 4. ANIMACIONES AL HACER SCROLL
// ------------------------------------------
function initScrollAnimations() {
    const sections = document.querySelectorAll('.studio-section, .game-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ------------------------------------------
// 5. EFECTO PARALLAX SUAVE EN EL MOUSE
// ------------------------------------------
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const header = document.querySelector('.header');
    if (header) {
        const moveX = (x - 0.5) * 10;
        const moveY = (y - 0.5) * 10;
        header.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});
