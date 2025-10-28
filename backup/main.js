(() => {
    // Função para carregar componentes HTML dinamicamente
    async function loadComponent(id, url, callback) {
        const container = document.getElementById(id);
        if (!container) {
            console.warn(`⚠️ Container #${id} não encontrado`);
            return false;
        }

        try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (!response.ok) {
                console.error(`❌ Falha ao carregar ${url}: Status ${response.status} ${response.statusText}`);
                throw new Error(`HTTP ${response.status} - ${url}`);
            }

            const text = await response.text();
            if (window.DEBUG) console.log(`DEBUG: Conteúdo carregado de ${url}:`, text.substring(0, 500) + (text.length > 500 ? '...' : ''));
            container.innerHTML = text;

            // Aumentar espera para DOM atualizar
            await new Promise(resolve => setTimeout(resolve, 500));

            // Verificar elementos pós-carregamento
            if (window.DEBUG) {
                console.log('DEBUG: #services-toggle existe?', !!document.getElementById('services-toggle'));
                console.log('DEBUG: #services-menu existe?', !!document.getElementById('services-menu'));
            }

            const mobileMenu = document.getElementById('mobile-menu');
            const menuItems = mobileMenu?.querySelectorAll('ul > li') || [];
            if (window.DEBUG) console.log(`DEBUG: Itens do menu mobile após carregamento: ${menuItems.length}`, Array.from(menuItems).map(item => item.textContent.trim()));

            callback?.();
            return true;
        } catch (err) {
            console.error(`❌ Falha ao carregar ${id} (${url}):`, err);
            return false;
        }
    }

    // Função para animar contadores
    function animateCounter(id, end, duration = 2000) {
        const el = document.getElementById(id);
        if (!el) return;
        let startTime;

        const easeOutQuad = t => t * (2 - t);
        const step = now => {
            startTime ??= now;
            const progress = Math.min((now - startTime) / duration, 1);
            el.textContent = Math.floor(easeOutQuad(progress) * end).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    // Inicializa o footer
    function initFooter() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    // Inicializa botão back-to-top
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('hidden', window.scrollY <= 300);
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        // Carrega header e inicializa menu
        await loadComponent('header', '/components/header.html', initMenu);
        // Carrega footer
        await loadComponent('footer', '/components/footer.html', initFooter);
        // Inicializa back-to-top
        initBackToTop();
    });
})();


// Scroll to top on page load (replacing useEffect)
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});