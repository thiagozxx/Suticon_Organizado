function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.querySelector('.off-canvas-overlay');
    const desktopDropdowns = document.querySelectorAll('.group.has-submenu');
    // Definir no escopo de initMenu para acesso em closeMobileMenu
    const servicesToggle = document.getElementById('services-toggle');
    const servicesMenu = document.getElementById('services-menu');
    const moreToggle = document.getElementById('more-toggle');
    const moreMenu = document.getElementById('more-menu');

    // Verificação de depuração
    if (window.DEBUG) {
        if (!menuToggle || !mobileMenu || !closeMenu || !overlay || !servicesToggle || !servicesMenu || !moreToggle || !moreMenu) {
            console.warn('⚠️ initMenu: Um ou mais elementos não foram encontrados.', {
                menuToggle: !!menuToggle,
                mobileMenu: !!mobileMenu,
                closeMenu: !!closeMenu,
                overlay: !!overlay,
                servicesToggle: !!servicesToggle,
                servicesMenu: !!servicesMenu,
                moreToggle: !!moreToggle,
                moreMenu: !!moreMenu
            });
        } else {
            console.log('✅ Todos os elementos do menu encontrados.');
        }

        const mobileMenuItems = mobileMenu?.querySelectorAll('ul > li') || [];
        console.log(`✅ Itens do menu mobile encontrados: ${mobileMenuItems.length}`, Array.from(mobileMenuItems).map(item => item.textContent.trim()));
        if (mobileMenuItems.length < 8) {
            console.warn('⚠️ Menu mobile incompleto. Esperado: 8 itens, Encontrado:', mobileMenuItems.length);
            console.log('DEBUG: Conteúdo de #mobile-menu ul:', mobileMenu?.querySelector('ul')?.outerHTML || 'Não encontrado');
        }
    }

    // Função de debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Abrir menu mobile
    const openMobileMenu = () => {
        if (!mobileMenu || !overlay) return;
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        overlay.classList.remove('hidden', 'opacity-0');
        overlay.classList.add('block', 'opacity-60');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        menuToggle.innerHTML = `<svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>`;
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
        if (window.DEBUG) console.log('✅ Menu mobile aberto');
    };

    // Fechar menu mobile
    const closeMobileMenu = () => {
        if (!mobileMenu || !overlay) return;
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        overlay.classList.add('opacity-0');
        overlay.classList.remove('opacity-60');
        setTimeout(() => overlay.classList.add('hidden'), 400);
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.innerHTML = `<svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>`;
        // Fechar submenus com verificação
        [servicesMenu, moreMenu].forEach(menu => {
            if (menu) {
                menu.classList.remove('open');
                menu.style.maxHeight = '0px';
                menu.style.opacity = '0';
            }
        });
        [servicesToggle, moreToggle].forEach(button => {
            if (button) {
                button.setAttribute('aria-expanded', 'false');
                button.querySelector('svg')?.classList.remove('rotate-180');
            }
        });
        if (window.DEBUG) console.log('✅ Menu mobile fechado');
    };

    // Eventos para abrir/fechar menu
    if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    // Fechar menu ao clicar em links
    if (mobileMenu) {
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMobileMenu();
            });
        });
    }

    // Suporte a tecla Esc
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            closeMobileMenu();
        }
    });

    // Toggle de submenus
    const toggleSubMenu = (button, submenu) => {
        if (!button || !submenu) {
            if (window.DEBUG) console.warn('⚠️ toggleSubMenu: Botão ou submenu não encontrado', { button, submenu });
            return;
        }
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.DEBUG) console.log(`✅ Clique detectado em ${button.id}`);
            const isOpen = submenu.classList.contains('open');
            if (isOpen) {
                submenu.style.maxHeight = '0px';
                submenu.style.opacity = '0';
                submenu.classList.remove('open');
            } else {
                submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                submenu.style.opacity = '1';
                submenu.classList.add('open');
            }
            button.setAttribute('aria-expanded', String(!isOpen));
            const svg = button.querySelector('svg');
            svg?.classList.toggle('rotate-180', !isOpen);
            if (window.DEBUG) console.log(`✅ Submenu ${button.id} ${isOpen ? 'fechado' : 'aberto'}`);
        });
    };

    // Inicializar submenus
    const initializeSubMenus = () => {
        if (servicesToggle && servicesMenu) {
            servicesToggle.setAttribute('aria-controls', 'services-menu');
            toggleSubMenu(servicesToggle, servicesMenu);
            if (window.DEBUG) console.log('✅ Submenu Serviços inicializado');
        } else {
            if (window.DEBUG) console.warn('⚠️ Submenu Serviços não inicializado', {
                servicesToggle: !!servicesToggle,
                servicesMenu: !!servicesMenu
            });
        }

        if (moreToggle && moreMenu) {
            moreToggle.setAttribute('aria-controls', 'more-menu');
            toggleSubMenu(moreToggle, moreMenu);
            if (window.DEBUG) console.log('✅ Submenu Mais inicializado');
        } else {
            if (window.DEBUG) console.warn('⚠️ Submenu Mais não inicializado', {
                moreToggle: !!moreToggle,
                moreMenu: !!moreMenu
            });
        }

        if (!servicesToggle || !servicesMenu || !moreToggle || !moreMenu) {
            if (window.DEBUG) console.warn('⚠️ Alguns submenus não encontrados. Observer continuará monitorando.');
        } else {
            observer.disconnect();
            if (window.DEBUG) console.log('✅ Todos os submenus inicializados. Observer desativado.');
        }
    };

    // MutationObserver para detectar mudanças no #mobile-menu
    const observer = new MutationObserver((mutations, obs) => {
        if (window.DEBUG) console.log('DEBUG: MutationObserver detectou mudanças no #mobile-menu');
        initializeSubMenus();
    });
    if (mobileMenu) {
        observer.observe(mobileMenu, { childList: true, subtree: true });
        initializeSubMenus(); // Tente imediatamente
    } else {
        console.error('❌ #mobile-menu não encontrado no DOM inicial');
    }

    // Dropdowns Desktop
    desktopDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('ul');
        const arrow = dropdown.querySelector('svg:not(:has(script))');
        if (!link || !menu) {
            if (window.DEBUG) console.warn('⚠️ Desktop dropdown: Link ou menu não encontrado', { link, menu });
            return;
        }
        let hideTimeout;

        const showMenu = () => {
            clearTimeout(hideTimeout);
            menu.classList.replace('hidden', 'block');
            menu.classList.replace('opacity-0', 'opacity-100');
            arrow?.classList.add('rotate-180');
            link.setAttribute('aria-expanded', 'true');
        };

        const hideMenu = () => {
            hideTimeout = setTimeout(() => {
                menu.classList.replace('block', 'hidden');
                menu.classList.replace('opacity-100', 'opacity-0');
                arrow?.classList.remove('rotate-180');
                link.setAttribute('aria-expanded', 'false');
            }, 400);
        };

        dropdown.addEventListener('mouseenter', showMenu);
        dropdown.addEventListener('mouseleave', hideMenu);
        menu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
        menu.addEventListener('mouseleave', hideMenu);

        document.addEventListener('click', e => {
            if (!dropdown.contains(e.target)) hideMenu();
        });
    });

    console.log('✅ initMenu carregado com sucesso!');
}