// Dados de produtos (ajuste conforme necessário)
const products = [
    // Exemplos existentes
    {
        id: 1,
        name: 'Computador Dell',
        brand: 'Dell',
        category: 'Computadores',
        image: 'assets/produtos/computador-dell.avif',
        description: 'Computador de alta performance com processador Intel i7, 16GB RAM e SSD 512GB.'
    },
    {
        id: 2,
        name: 'Notebook HP',
        brand: 'HP',
        category: 'Notebooks',
        image: '../../assets/produtos/notebook-hp.jpg',
        description: 'Notebook leve e portátil com tela Full HD, processador AMD Ryzen 5 e bateria de longa duração.'
    },
    // Mais exemplos de produtos de TI populares em 2025, baseados em tendências como IA, dispositivos conectados, segurança e gadgets sustentáveis
    {
        id: 3,
        name: 'Antivírus Kaspersky Premium',
        brand: 'Kaspersky',
        category: 'Segurança',
        image: '../../assets/produtos/antivirus-kaspersky.jpg',
        description: 'Proteção avançada contra malware, ransomware e ameaças online para até 5 dispositivos.'
    },
    {
        id: 4,
        name: 'Firewall Cisco Meraki',
        brand: 'Cisco',
        category: 'Segurança',
        image: '../../assets/produtos/firewall-cisco.jpg',
        description: 'Solução de segurança de rede com gerenciamento na nuvem e proteção contra intrusões.'
    },
    {
        id: 5,
        name: 'Servidor Lenovo ThinkSystem',
        brand: 'Lenovo',
        category: 'Servidores',
        image: '../../assets/produtos/servidor-lenovo.jpg',
        description: 'Servidor escalável para empresas, com suporte a virtualização e alta capacidade de armazenamento.'
    },
    {
        id: 6,
        name: 'Backup em Nuvem Acronis',
        brand: 'Acronis',
        category: 'Backup',
        image: '../../assets/produtos/backup-acronis.jpg',
        description: 'Solução de backup automático e recuperação de dados com criptografia end-to-end.'
    },
    {
        id: 7,
        name: 'Mouse Logitech MX Master',
        brand: 'Logitech',
        category: 'Periféricos',
        image: '../../assets/produtos/mouse-logitech.jpg',
        description: 'Mouse ergonômico sem fio com scroll hiper-rápido e suporte a múltiplos dispositivos.'
    },
    {
        id: 8,
        name: 'Teclado Mecânico Razer BlackWidow',
        brand: 'Razer',
        category: 'Periféricos',
        image: '../../assets/produtos/teclado-razer.jpg',
        description: 'Teclado gamer com switches mecânicos, iluminação RGB e teclas programáveis.'
    },
    {
        id: 9,
        name: 'Monitor Samsung Curvo 4K',
        brand: 'Samsung',
        category: 'Monitores',
        image: '../../assets/produtos/monitor-samsung.jpg',
        description: 'Monitor curvo de 32 polegadas com resolução 4K e taxa de atualização de 144Hz.'
    },
    {
        id: 10,
        name: 'Headset Gamer HyperX Cloud',
        brand: 'HyperX',
        category: 'Acessórios',
        image: '../../assets/produtos/headset-hyperx.jpg',
        description: 'Headset com áudio surround 7.1, microfone destacável e almofadas confortáveis.'
    },
    {
        id: 11,
        name: 'Software CRM Zoho',
        brand: 'Zoho',
        category: 'Software',
        image: '../../assets/produtos/crm-zoho.jpg',
        description: 'Plataforma de gerenciamento de clientes com automação e análises integradas.'
    },
    {
        id: 12,
        name: 'Gadget de Realidade Aumentada Oculus Quest',
        brand: 'Oculus',
        category: 'Gadgets',
        image: '../../assets/produtos/oculus-quest.jpg',
        description: 'Óculos VR autônomo com suporte a jogos e experiências imersivas.'
    },
    // Adicione mais conforme necessário
];

function createModal() {
    const modalHTML = `
        <div id="orcamento-modal" class="fixed inset-0 bg-black bg-opacity-60 hidden flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
                <button id="close-modal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
                    ×
                </button>
                <h3 class="text-2xl font-bold text-cyan-600 mb-4">Solicitar Orçamento</h3>
                <form id="orcamento-form">
                    <input type="hidden" id="produto-selecionado" value="">
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Seu Nome *</label>
                        <input type="text" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" placeholder="Ex: João Silva">
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">E-mail *</label>
                        <input type="email" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" placeholder="joao@email.com">
                    </div>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1">Telefone (WhatsApp)</label>
                        <input type="tel" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" placeholder="(11) 99999-9999">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium mb-1">Mensagem (opcional)</label>
                        <textarea rows="3" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" placeholder="Fale sobre sua necessidade..."></textarea>
                    </div>
                    
                    <div class="flex gap-3">
                        <button type="submit" class="flex-1 bg-cyan-600 text-white py-3 rounded-full font-semibold hover:bg-cyan-600 transition">
                            Enviar Solicitação
                        </button>
                        <button type="button" id="cancel-modal" class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-400 transition">
                            Cancelar
                        </button>
                    </div>
                </form>
                <div id="form-message" class="mt-4 text-center font-medium"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    createModal();

    const productGrid = document.getElementById('product-grid');
    const noProducts = document.getElementById('no-products');
    const productCount = document.getElementById('product-count');
    const categoryCheckboxes = document.querySelectorAll('[data-category]');
    const brandCheckboxes = document.querySelectorAll('[data-brand]');
    const clearFilters = document.getElementById('clear-filters');

    let selectedCategories = [];
    let selectedBrands = [];

    // Função de filtro
    function filterProducts() {
        const filtered = products.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            return matchesCategory && matchesBrand;
        });
        renderProducts(filtered);
    }

    // Renderizar produtos
    function renderProducts(filtered) {
        productGrid.innerHTML = '';
        if (filtered.length === 0) {
            noProducts.classList.remove('hidden');
        } else {
            noProducts.classList.add('hidden');
            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'border p-6 rounded-xl shadow-md hover:shadow-2xl transition-all bg-white';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                    <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                    <p class="text-gray-600 text-sm">${product.brand} • ${product.category}</p>
                    <p class="text-gray-700 text-sm mt-3 leading-relaxed">${product.description}</p>
                    
                    <button 
                        data-product="${product.name}"
                        class="solicitar-btn mt-6 w-full bg-cyan-600 text-white py-3 rounded-full font-bold hover:bg-cyan-600 transition transform hover:scale-105">
                        Solicitar Orçamento
                    </button>
                `;
                productGrid.appendChild(card);
            });

            // Adicionar evento aos botões
            document.querySelectorAll('.solicitar-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const produto = e.target.getAttribute('data-product');
                    openModal(produto);
                });
            });
        }
        productCount.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    }

    // Abrir modal
    function openModal(produtoNome) {
        document.getElementById('orcamento-modal').classList.remove('hidden');
        document.getElementById('produto-selecionado').value = produtoNome;
        document.body.style.overflow = 'hidden'; // Bloqueia scroll
    }

    // Fechar modal
    function closeModal() {
        document.getElementById('orcamento-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        document.getElementById('orcamento-form').reset();
        document.getElementById('form-message').innerHTML = '';
    }

    // Eventos do modal
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-modal').addEventListener('click', closeModal);
    document.getElementById('orcamento-modal').addEventListener('click', (e) => {
        if (e.target.id === 'orcamento-modal') closeModal();
    });

    // Envio do formulário
    document.getElementById('orcamento-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('form-message');
        message.innerHTML = `<p class="text-green-600">Orçamento solicitado com sucesso! Entraremos em contato em breve.</p>`;
        setTimeout(() => {
            closeModal();
        }, 2000);
    });

    // Filtros
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            if (e.target.checked) selectedCategories.push(category);
            else selectedCategories = selectedCategories.filter(c => c !== category);
            filterProducts();
        });
    });

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const brand = e.target.dataset.brand;
            if (e.target.checked) selectedBrands.push(brand);
            else selectedBrands = selectedBrands.filter(b => b !== brand);
            filterProducts();
        });
    });

    clearFilters.addEventListener('click', () => {
        selectedCategories = [];
        selectedBrands = [];
        categoryCheckboxes.forEach(ch => ch.checked = false);
        brandCheckboxes.forEach(ch => ch.checked = false);
        filterProducts();
    });

    // Inicializa
    filterProducts();
});