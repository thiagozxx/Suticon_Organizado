document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('master-loader');

    if (document.readyState === 'complete') {
        loader.remove();
        return;
    }

    window.addEventListener('load', () => {
        loader.classList.add('opacity-0');
        setTimeout(() => loader.remove(), 500);
    });
});