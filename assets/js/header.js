async function loadComponent(id, url, callback) {
    const container = document.getElementById(id);
    if (!container) {
        console.warn(`⚠️ Container #${id} não encontrado`);
        return;
    }

    try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Erro ao carregar ${url}: ${response.status}`);
        container.innerHTML = await response.text();
        console.log(`✅ Componente ${url} carregado com sucesso`);
        if (typeof callback === 'function') {
            setTimeout(callback, 0); // Next event loop tick
        }
    } catch (err) {
        console.error(`❌ Falha ao carregar ${url}: ${err.message}`);
    }
}

function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !closeMenu || !mobileMenu) {
        console.warn('⚠️ Elementos do menu mobile não encontrados:', {
            menuToggle: !!menuToggle,
            closeMenu: !!closeMenu,
            mobileMenu: !!mobileMenu,
        });
        return;

    const overlay = document.querySelector('.off-canvas-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMenuFn);
    }
    }

    console.log('✅ Elementos do menu mobile encontrados, inicializando...');
    console.log('📍 Estado inicial do menu:', {
        classes: mobileMenu.classList.toString(),
        transform: window.getComputedStyle(mobileMenu).transform,
        ariaHidden: mobileMenu.getAttribute('aria-hidden'),
    });

    // Function to open the menu
    const openMenu = () => {
        console.log('🖱️ Abrindo menu mobile...');
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenu.style.display = 'block'; // Fallback to ensure visibility
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        overlay.classList.remove('hidden');
        overlay.style.opacity = '1';
    };

    // Function to close the menu
    const closeMenuFn = () => {
        console.log('🖱️ Fechando menu mobile...');
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.style.display = 'none'; // Fallback to hide
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        overlay.classList.add('hidden');
        overlay.style.opacity = '0';
    };

    // Add click event listeners
    menuToggle.addEventListener('click', (e) => {
        console.log('🖱️ Clique no menu-toggle detectado!', e);
        openMenu();
    });

    closeMenu.addEventListener('click', (e) => {
        console.log('🖱️ Clique no close-menu detectado!', e);
        closeMenuFn();
    });

    // Close menu on item click
    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            console.log('🖱️ Clique em item do menu:', item.href);
            closeMenuFn();
        });
    });

    const servicesToggle = document.getElementById('services-toggle');
    const servicesMenu = document.getElementById('services-menu');

    servicesToggle.addEventListener('click', () => {
        const expanded = servicesToggle.getAttribute('aria-expanded') === 'true';
        servicesToggle.setAttribute('aria-expanded', !expanded);
        servicesMenu.style.maxHeight = expanded ? '0' : servicesMenu.scrollHeight + 'px';
        servicesMenu.style.opacity = expanded ? '0' : '1';
    });

    
    const moreToggle = document.getElementById('more-toggle');
    const moreMenu = document.getElementById('more-menu');

    if (moreToggle && moreMenu) {
        moreToggle.addEventListener('click', () => {
            const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
            moreToggle.setAttribute('aria-expanded', !expanded);
            moreMenu.style.maxHeight = expanded ? '0' : moreMenu.scrollHeight + 'px';
            moreMenu.style.opacity = expanded ? '0' : '1';
            const icon = moreToggle.querySelector('svg');
            icon.classList.toggle('rotate-180', !expanded);
        });
    }
// Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
            console.log('⌨️ Tecla ESC pressionada, fechando menu...');
            closeMenuFn();
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header', '/components/header.html', () => {
        console.log('🔍 Header carregado, iniciando menu...');
        initMenu(); // Initialize directly, as MutationObserver may not be necessary
    });
});