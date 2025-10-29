async function loadComponent(id, url, callback) {
    const container = document.getElementById(id);
    if (!container) {
        console.warn(`⚠️ Elemento com ID "${id}" não encontrado.`);
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);

        const html = await response.text();
        container.innerHTML = html;

        if (typeof callback === "function") callback(); // garante que é uma função
    } catch (error) {
        console.error(`❌ Falha ao carregar componente "${id}":`, error);
    }
}

// Carrega componentes ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("footer", "/components/footer.html", updateYear);
});

// Atualiza o ano automaticamente
function updateYear() {
    const ano = document.getElementById("year");
    if (ano) {
        ano.textContent = new Date().getFullYear();
    } else {
        console.warn("⚠️ Elemento com ID 'year' não encontrado no footer.");
    }
}

$(document).ready(function() {
    let timeout;
    $('.has-submenu').on('mouseenter', function() {
        clearTimeout(timeout);
        $(this).find('ul').addClass('block').removeClass('hidden').css('opacity', 1);
    }).on('mouseleave', function() {
        timeout = setTimeout(() => {
            $(this).find('ul').addClass('hidden').removeClass('block').css('opacity', 0);
        }, 300);  // Delay de 300ms antes de fechar
    });
});