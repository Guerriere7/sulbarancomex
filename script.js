// Animación de sombra en el header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll para el logo
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        history.pushState(null, null, targetId);
    }
});

// Ajustar el padding del hero para el header fijo
document.addEventListener('DOMContentLoaded', function() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('.hero').style.paddingTop = `calc(40vh + ${headerHeight}px)`;
});


// Animación de aparición de elementos al hacer scroll
function checkScroll() {
    const elements = document.querySelectorAll('.service-card, .process-step, .feature');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            
            // Animación adicional para las imágenes dentro de las cards
            const images = element.querySelectorAll('.service-image');
            images.forEach(img => {
                img.style.opacity = 1;
                img.style.transform = 'translateY(0)';
            });
        }
    });
}

// Inicializar estilos para animación
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .feature');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(25px)';
        element.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Comprobar posición al cargar la página
    setTimeout(checkScroll, 100);
});

// Event listener para el scroll con throttling para mejor performance
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScroll, 50);
});

// Event listener para el scroll
window.addEventListener('scroll', checkScroll);

// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Actualizar URL
            history.pushState(null, null, targetId);
        }
    });
});


// Track de conversiones para Google Analytics
document.addEventListener('DOMContentLoaded', function() {
    // Track de clicks en botones principales
    const trackConversion = (action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'Conversion',
                'event_label': label
            });
        }
    };

    // Botón de WhatsApp
    document.querySelector('.cta-button').addEventListener('click', function() {
        trackConversion('whatsapp_click', 'Hero Section');
    });

    // Email de contacto
    document.querySelector('a[href^="mailto"]').addEventListener('click', function() {
        trackConversion('email_click', 'Contact Section');
    });

    // Smooth scroll mejorado para métricas de engagement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Track internal link clicks
                trackConversion('internal_link', targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});