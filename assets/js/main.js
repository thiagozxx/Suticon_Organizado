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
        if (typeof callback === 'function') callback();
    } catch (err) {
        console.error(`❌ Falha ao carregar ${url}: ${err.message}`);
    }
}

function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !closeMenu || !mobileMenu) return;

    const openMenu = () => mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
    const closeMenuFn = () => mobileMenu.classList.replace('translate-x-0', 'translate-x-full');

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFn);

    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenuFn));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenuFn(); });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header', '/components/header.html', initMenu);
    await loadComponent('footer', '/components/footer.html');
});
