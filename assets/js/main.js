async function loadComponent(id, url, callback) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ao carregar ${url}`);
        const html = await response.text();
        container.innerHTML = html;

        if (callback) callback(); // roda a função depois do HTML ser injetado
    } catch (error) {
        console.error(error);
    }
}

// Carrega header e footer
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("footer", "/components/footer.html");
});