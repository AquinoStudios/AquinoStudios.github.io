const CONFIG = {
  TELEGRAM_URL: 'https://t.me/tugrupo',
  EMAIL: 'contacto@codigorojo.io',
};

const elements = {
  modal: document.getElementById('contactModal'),
  modalClose: document.getElementById('modalClose'),
  floatingBtn: document.getElementById('floatingBtn'),
  navbar: document.querySelector('.navbar'),
  faqItems: document.querySelectorAll('.faq-item'),
  faqQuestions: document.querySelectorAll('.faq-question'),
  contactForm: document.getElementById('contactForm'),
  btnSolicitar: document.getElementById('btnSolicitar'),
  btnTelegram: document.getElementById('btnTelegram'),
  btnSolicitarFinal: document.getElementById('btnSolicitarFinal'),
  btnTelegramFinal: document.getElementById('btnTelegramFinal'),
};

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initCounters();
  initFAQ();
  initModal();
  initButtons();
  initNavbar();
  initFormValidation();
});

function initAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });
  revealElements.forEach((element) => observer.observe(element));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  const updateCounter = () => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(target);
    } else {
      element.textContent = formatNumber(Math.floor(current));
      requestAnimationFrame(updateCounter);
    }
  };
  updateCounter();
}

function formatNumber(num) {
  return num.toLocaleString('es-ES');
}

function initFAQ() {
  elements.faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      elements.faqItems.forEach((item) => {
        if (item !== faqItem) item.classList.remove('active');
      });
      faqItem.classList.toggle('active');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.faq-item')) {
      elements.faqItems.forEach((item) => item.classList.remove('active'));
    }
  });
}

function initModal() {
  elements.floatingBtn.addEventListener('click', openModal);
  elements.btnSolicitar.addEventListener('click', openModal);
  elements.btnSolicitarFinal.addEventListener('click', openModal);
  elements.modalClose.addEventListener('click', closeModal);
  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal() {
  elements.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  elements.modal.querySelector('input').focus();
}

function closeModal() {
  elements.modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  elements.contactForm.reset();
}

function initButtons() {
  elements.btnTelegram.addEventListener('click', () => {
    window.open(CONFIG.TELEGRAM_URL, '_blank');
  });
  elements.btnTelegramFinal.addEventListener('click', () => {
    window.open(CONFIG.TELEGRAM_URL, '_blank');
  });
}

function initFormValidation() {
  elements.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = elements.contactForm.querySelectorAll('input, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;
    if (!name || !email || !message) {
      showNotification('Por favor completa todos los campos', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showNotification('Por favor usa un email válido', 'error');
      return;
    }
    showNotification('Procesando solicitud...', 'info');
    setTimeout(() => {
      closeModal();
      showNotification('¡Solicitud enviada! Te contactaremos pronto.', 'success');
      elements.contactForm.reset();
    }, 1500);
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `position: fixed; top: 100px; right: 20px; padding: 16px 24px; background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'}; color: white; border-radius: 8px; z-index: 300; animation: slideInRight 0.3s ease; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function initNavbar() {
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      elements.navbar.classList.add('hidden');
    } else {
      elements.navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
    if (scrollTop > 10) {
      elements.navbar.style.borderBottomColor = 'rgba(45, 45, 45, 0.5)';
    } else {
      elements.navbar.style.borderBottomColor = 'rgb(45, 45, 45)';
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

const style = document.createElement('style');
style.textContent = `@keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }`;
document.head.appendChild(style);

console.log('%c🔴 Código Rojo v1.0', 'color: #dc2626; font-size: 14px; font-weight: bold;');
console.log('%cBienvenido a la élite digital', 'color: #b0b0b0; font-style: italic;');