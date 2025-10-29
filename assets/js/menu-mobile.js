// --- MENU MOBILE (abrir e fechar) ---
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const openMenuBtn = document.getElementById("open-menu");
    const closeMenuBtn = document.getElementById("close-menu");

    

    // Abre o menu
    if (openMenuBtn) {
        openMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-full");
            mobileMenu.setAttribute("aria-hidden", "false");
            document.body.classList.add("overflow-hidden"); // impede rolagem no fundo
        });
    }

    // Fecha o menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("translate-x-full");
            mobileMenu.setAttribute("aria-hidden", "true");
            document.body.classList.remove("overflow-hidden");
        });
    }

    // Fecha ao clicar fora
    document.addEventListener("click", (e) => {
        if (
            !mobileMenu.contains(e.target) &&
            !e.target.closest("#open-menu") &&
            !mobileMenu.classList.contains("translate-x-full")
        ) {
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        }
    });

    // --- SUBMENUS (Serviços e Mais) ---
    function setupSubmenu(toggleId, menuId) {
        const toggle = document.getElementById(toggleId);
        const menu = document.getElementById(menuId);
        if (!toggle || !menu) return;

        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !isOpen);
            menu.style.maxHeight = isOpen ? "0" : menu.scrollHeight + "px";
            menu.style.opacity = isOpen ? "0" : "1";

            // Rotaciona a setinha ↓↑
            const svg = toggle.querySelector("svg");
            if (svg) svg.classList.toggle("rotate-180", !isOpen);
        });
    }

    setupSubmenu("services-toggle", "services-menu");
    setupSubmenu("more-toggle", "more-menu");
});
