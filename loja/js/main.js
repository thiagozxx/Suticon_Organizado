// Dados de produtos (ajuste conforme necessário)
const products = [
    // Exemplos existentes
    {
        id: 1,
        name: 'Computador Dell',
        brand: 'Dell',
        category: 'Computadores',
        price: 'R$ 2999,90',
        image: '../../assets/produtos/computador-dell.jpg', // Caminho ajustado para raiz
        description: 'Computador de alta performance com processador Intel i7, 16GB RAM e SSD 512GB.'
    },
    {
        id: 2,
        name: 'Notebook HP',
        brand: 'HP',
        category: 'Notebooks',
        price: 'R$ 1999,90',
        image: '../../assets/produtos/notebook-hp.jpg',
        description: 'Notebook leve e portátil com tela Full HD, processador AMD Ryzen 5 e bateria de longa duração.'
    },
    // Mais exemplos de produtos de TI populares em 2025, baseados em tendências como IA, dispositivos conectados, segurança e gadgets sustentáveis
    {
        id: 3,
        name: 'Antivírus Kaspersky Premium',
        brand: 'Kaspersky',
        category: 'Segurança',
        price: 'R$ 149,90',
        image: '../../assets/produtos/antivirus-kaspersky.jpg',
        description: 'Proteção avançada contra malware, ransomware e ameaças online para até 5 dispositivos.'
    },
    {
        id: 4,
        name: 'Firewall Cisco Meraki',
        brand: 'Cisco',
        category: 'Segurança',
        price: 'R$ 3499,90',
        image: '../../assets/produtos/firewall-cisco.jpg',
        description: 'Solução de segurança de rede com gerenciamento na nuvem e proteção contra intrusões.'
    },
    {
        id: 5,
        name: 'Servidor Lenovo ThinkSystem',
        brand: 'Lenovo',
        category: 'Servidores',
        price: 'R$ 4999,90',
        image: '../../assets/produtos/servidor-lenovo.jpg',
        description: 'Servidor escalável para empresas, com suporte a virtualização e alta capacidade de armazenamento.'
    },
    {
        id: 6,
        name: 'Backup em Nuvem Acronis',
        brand: 'Acronis',
        category: 'Backup',
        price: 'R$ 299,90/ano',
        image: '../../assets/produtos/backup-acronis.jpg',
        description: 'Solução de backup automático e recuperação de dados com criptografia end-to-end.'
    },
    {
        id: 7,
        name: 'Mouse Logitech MX Master',
        brand: 'Logitech',
        category: 'Periféricos',
        price: 'R$ 399,90',
        image: '../../assets/produtos/mouse-logitech.jpg',
        description: 'Mouse ergonômico sem fio com scroll hiper-rápido e suporte a múltiplos dispositivos.'
    },
    {
        id: 8,
        name: 'Teclado Mecânico Razer BlackWidow',
        brand: 'Razer',
        category: 'Periféricos',
        price: 'R$ 599,90',
        image: '../../assets/produtos/teclado-razer.jpg',
        description: 'Teclado gamer com switches mecânicos, iluminação RGB e teclas programáveis.'
    },
    {
        id: 9,
        name: 'Monitor Samsung Curvo 4K',
        brand: 'Samsung',
        category: 'Monitores',
        price: 'R$ 1299,90',
        image: '../../assets/produtos/monitor-samsung.jpg',
        description: 'Monitor curvo de 32 polegadas com resolução 4K e taxa de atualização de 144Hz.'
    },
    {
        id: 10,
        name: 'Headset Gamer HyperX Cloud',
        brand: 'HyperX',
        category: 'Acessórios',
        price: 'R$ 349,90',
        image: '../../assets/produtos/headset-hyperx.jpg',
        description: 'Headset com áudio surround 7.1, microfone destacável e almofadas confortáveis.'
    },
    {
        id: 11,
        name: 'Software CRM Zoho',
        brand: 'Zoho',
        category: 'Software',
        price: 'R$ 99,90/mês',
        image: '../../assets/produtos/crm-zoho.jpg',
        description: 'Plataforma de gerenciamento de clientes com automação e análises integradas.'
    },
    {
        id: 12,
        name: 'Gadget de Realidade Aumentada Oculus Quest',
        brand: 'Oculus',
        category: 'Gadgets',
        price: 'R$ 2499,90',
        image: '../../assets/produtos/oculus-quest.jpg',
        description: 'Óculos VR autônomo com suporte a jogos e experiências imersivas.'
    },
    // Adicione mais conforme necessário
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input'); // Assuma que há um input de busca no header
    const productGrid = document.getElementById('product-grid');
    const noProducts = document.getElementById('no-products');
    const productCount = document.getElementById('product-count');
    const categoryCheckboxes = document.querySelectorAll('[data-category]');
    const brandCheckboxes = document.querySelectorAll('[data-brand]');
    const clearFilters = document.getElementById('clear-filters');

    let searchTerm = '';
    let selectedCategories = [];
    let selectedBrands = [];

    function filterProducts() {
        const filtered = products.filter(product => {
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

            return matchesSearch && matchesCategory && matchesBrand;
        });

        renderProducts(filtered);
    }

    function renderProducts(filtered) {
        productGrid.innerHTML = '';
        if (filtered.length === 0) {
            noProducts.classList.remove('hidden');
        } else {
            noProducts.classList.add('hidden');
            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded-md">
                    <h2 class="text-xl font-bold">${product.name}</h2>
                    <p class="text-gray-600">${product.brand} - ${product.category}</p>
                    <p class="text-gray-500 text-sm mt-2">${product.description}</p>
                    <p class="text-cyan-600 font-semibold mt-2">${product.price}</p>
                    <a href="../../pages/contato.html?produto=${encodeURIComponent(product.name)}" class="mt-4 block bg-cyan-600 text-white py-2 px-4 rounded-full hover:bg-cyan-700 text-center">Solicitar Orçamento</a>
                `;
                productGrid.appendChild(card);
            });
        }
        productCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
    }

    // Eventos para filtros
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            if (e.target.checked) {
                selectedCategories.push(category);
            } else {
                selectedCategories = selectedCategories.filter(c => c !== category);
            }
            filterProducts();
        });
    });

    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const brand = e.target.dataset.brand;
            if (e.target.checked) {
                selectedBrands.push(brand);
            } else {
                selectedBrands = selectedBrands.filter(b => b !== brand);
            }
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

    // Evento para busca (assuma um input id="search-input" no header)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            filterProducts();
        });
    }

    // Inicializa
    filterProducts();
});