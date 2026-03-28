/**
 * NG Links Menu - JavaScript
 * Efeito de iluminação interativo que segue o mouse e toque
 */

// Obter o elemento do efeito de iluminação
const glowEffect = document.querySelector('.glow-effect');

// Variáveis para rastrear posição
let mouseX = 0;
let mouseY = 0;
let isActive = false;

/**
 * Atualizar posição do efeito de iluminação
 */
function updateGlowPosition(x, y) {
    mouseX = x;
    mouseY = y;
    
    if (glowEffect) {
        glowEffect.style.left = x + 'px';
        glowEffect.style.top = y + 'px';
    }
}

/**
 * Mostrar o efeito de iluminação
 */
function showGlow() {
    isActive = true;
    if (glowEffect) {
        glowEffect.style.opacity = '1';
    }
}

/**
 * Ocultar o efeito de iluminação
 */
function hideGlow() {
    isActive = false;
    if (glowEffect) {
        glowEffect.style.opacity = '0';
    }
}

/**
 * Event Listeners para Mouse
 */
document.addEventListener('mousemove', (e) => {
    updateGlowPosition(e.clientX, e.clientY);
    if (!isActive) {
        showGlow();
    }
});

document.addEventListener('mouseleave', () => {
    hideGlow();
});

/**
 * Event Listeners para Touch (Mobile)
 */
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateGlowPosition(touch.clientX, touch.clientY);
        if (!isActive) {
            showGlow();
        }
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    hideGlow();
});

/**
 * Event Listeners para Interatividade dos Links
 */
const socialLinks = document.querySelectorAll('.ng-social-link');

socialLinks.forEach((link) => {
    // Efeito ao passar o mouse
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(4px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });

    // Efeito ao clicar
    link.addEventListener('click', function(e) {
        // Criar efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        this.appendChild(ripple);
        
        // Animar o ripple
        ripple.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        // Remover o ripple após a animação
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/**
 * Animação de entrada suave
 */
window.addEventListener('load', () => {
    const card = document.querySelector('.ng-links-card');
    if (card) {
        card.style.opacity = '1';
    }
});

/**
 * Efeito parallax suave no banner (opcional)
 */
const banner = document.querySelector('.ng-banner');

if (banner) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const moveX = (e.clientX / window.innerWidth) * 10;
            const moveY = (e.clientY / window.innerHeight) * 10;
            
            banner.style.transform = `perspective(1000px) rotateX(${moveY * 0.5}deg) rotateY(${moveX * 0.5}deg)`;
        }
    });

    document.addEventListener('mouseleave', () => {
        banner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

/**
 * Adicionar suporte a teclado para acessibilidade
 */
socialLinks.forEach((link) => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

/**
 * Detectar preferência de movimento reduzido
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

/**
 * Log de inicialização
 */
console.log('NG Links Menu - Script carregado com sucesso!');
console.log('Efeito de iluminação ativado para mouse e touch');
