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

function adjustContentPadding() {
    const navbar = document.getElementById('main-nav');
    const body = document.getElementById('page-body');

    if (!navbar || !body) return;

    const navbarHeight = navbar.getBoundingClientRect().height;
    
    body.style.setProperty('--navbar-height', `${navbarHeight}px`);
  }

  document.addEventListener('DOMContentLoaded', adjustContentPadding);


  window.addEventListener('resize', adjustContentPadding);

  const observer = new MutationObserver(adjustContentPadding);
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    observer.observe(navbar, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        adjustContentPadding();
        ticking = false;
      });
      ticking = true;
    }
  });