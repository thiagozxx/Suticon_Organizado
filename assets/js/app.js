document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // === DADOS DAS SEÇÕES ===
    const solucoes = [
        { icon: "linux", title: "Windows & Linux" },
        { icon: "bkp-oracle", title: "Oracle, SQL, MySQL, PostgreSQL" },
        { icon: "bkp-virtual", title: "Hyper-V & VMware" },
        { icon: "polit-avanc", title: "Retenção & Versionamento" },
        { icon: "portal-gerenc", title: "Portal Centralizado" },
        { icon: "relator-consolidado", title: "Relatórios de Auditoria" },
        { icon: "supr-monitoram", title: "Suporte 24/7" },
        { icon: "supr-monitoram", title: "Bloco a Bloco" }
    ];

    const vantagens = [
        { icon: "speed", title: "Performance", desc: "Recuperação instantânea em qualquer dispositivo" },
        { icon: "storage", title: "Armazenamento Sem Limites", desc: "Escalabilidade automática conforme demanda" },
        { icon: "anywhere", title: "Acesso de Qualquer Lugar", desc: "Portal web e app mobile com sincronização em tempo real" },
        { icon: "automation", title: "Automatização Total", desc: "Backups agendados sem intervenção manual" },
        { icon: "cost", title: "Redução de Custos", desc: "Elimine servidores físicos e manutenção" },
        { icon: "encryption", title: "Criptografia Militar", desc: "AES-256 + SSL em trânsito e repouso" }
    ];

    const planos = [100, 250, 500, 1000, 2000, 4000];
    const precos = { 100: 70, 250: 160, 500: 295, 1000: 550, 2000: 1120, 4000: 2115 };

    // === RENDER ===
    renderCards(solucoes, document.querySelector('.grid-cols-2'), 'card-template');
    renderVantagens(vantagens, '#vantagens-container');
    renderPlanos(planos, '#planos-container');

    // === FUNÇÕES AUXILIARES ===
    function renderCards(items, container, templateId) {
        const template = document.getElementById(templateId);
        items.forEach((item, i) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('img').src = `/assets/images/icons/${item.icon}.webp`;
            clone.querySelector('img').alt = item.title;
            clone.querySelector('h3').textContent = item.title;
            clone.querySelector('article').setAttribute('data-aos', 'fade-up');
            clone.querySelector('article').setAttribute('data-aos-delay', (i * 100));
            container.appendChild(clone);
        });
    }

    function renderVantagens(items, containerSel) {
        const container = document.querySelector(containerSel);
        items.forEach((v, i) => {
            const el = document.createElement('article');
            el.className = `group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg ring-1 ring-slate-200/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center`;
            el.setAttribute('data-aos', i % 2 === 0 ? 'fade-right' : 'fade-left');
            el.innerHTML = `
          <div class="flex justify-center mb-6">
            <div class="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
              ${getSVG(v.icon)}
            </div>
          </div>
          <h3 class="text-xl font-bold text-slate-900">${v.title}</h3>
          <p class="mt-3 text-slate-600">${v.desc}</p>
        `;
            container.appendChild(el);
        });
    }

    function renderPlanos(gbs, containerSel) {
        const container = document.querySelector(containerSel);
        gbs.forEach(gb => {
            const btn = document.createElement('button');
            btn.className = 'plan-card';
            btn.innerHTML = `
          <span class="block text-3xl font-black text-cyan-400">${gb}<small class="text-lg">GB</small></span>
          <span class="block mt-2 text-sm text-cyan-300">Ver Preço</span>
        `;
            btn.onclick = () => mostrarPreco(`${gb}GB`, precos[gb]);
            container.appendChild(btn);
        });
    }

    function getSVG(icon) {
        const svgs = {
            speed: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
            storage: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>`,
            anywhere: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
            automation: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
            cost: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93V18zm2-15.93c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93V4z"/></svg>`,
            encryption: `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
        };
        return svgs[icon] || '';
    }

    // === ORÇAMENTO ===
    let precoBase = 0;
    window.mostrarPreco = (plano, preco) => {
        precoBase = preco;
        document.getElementById('precoPlano').innerHTML = `<strong>${plano}:</strong> R$ ${preco.toLocaleString('pt-BR')}/mês`;
        document.getElementById('modalCheckbox').checked = false;
        document.getElementById('precoInstalacao').classList.add('hidden');
        document.getElementById('divisor').classList.add('hidden');
        atualizarValorTotal();
        document.getElementById('modal').classList.remove('hidden');
    };
    window.atualizarPreco = (cb) => {
        const inst = document.getElementById('precoInstalacao'), div = document.getElementById('divisor');
        if (cb.checked) { inst.classList.remove('hidden'); div.classList.remove('hidden'); }
        else { inst.classList.add('hidden'); div.classList.add('hidden'); }
        atualizarValorTotal();
    };
    function atualizarValorTotal() {
        const total = precoBase + (document.getElementById('modalCheckbox').checked ? 140 : 0);
        document.getElementById('totalPreco').textContent = `Total: R$ ${total.toLocaleString('pt-BR')}`;
    }
    window.fecharModal = () => document.getElementById('modal').classList.add('hidden');

    // === FORMULÁRIO ===
    const form = document.getElementById('contato-form');
    const telefone = document.getElementById('telefone');
    telefone.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        if (v.length >= 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
        e.target.value = v;
    });

    async function carregarCaptcha() {
        try {
            const res = await fetch('/php/gerar-captcha.php');
            const data = await res.json();
            document.getElementById('captcha-pergunta').innerHTML = `Quanto é <strong>${data.num1} + ${data.num2}</strong>?`;
            document.getElementById('captcha_resultado').value = data.resultado;
        } catch {
            document.getElementById('captcha-pergunta').textContent = 'Erro ao carregar CAPTCHA.';
        }
    }

    function verificarErroURL() {
        const erro = new URLSearchParams(location.search).get('erro');
        if (!erro) return;
        const msgs = { pais: 'País bloqueado', captcha: 'CAPTCHA incorreto', email: 'E-mail inválido', bot: 'Acesso negado', tamanho: 'Dados muito longos', falha: 'Erro ao enviar' };
        mostrarErro(msgs[erro] || 'Erro desconhecido');
        history.replaceState({}, '', location.pathname);
    }

    function mostrarErro(msg) {
        document.getElementById('erro-texto').textContent = msg;
        document.getElementById('erro-popup').classList.remove('hidden');
        setTimeout(() => document.getElementById('erro-popup').classList.add('hidden'), 6000);
    }

    function mostrarSucesso() {
        const popup = document.getElementById('sucesso-popup');
        popup.classList.remove('hidden');
        setTimeout(() => popup.classList.add('hidden'), 5000);
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = 'Enviando...';
        const fd = new FormData(form);
        fd.append('pagina_origem', location.pathname);
        try {
            const res = await fetch('/php/enviar.php', { method: 'POST', body: fd });
            if (res.ok && (await res.text()).includes('sucesso')) {
                mostrarSucesso(); form.reset(); carregarCaptcha();
            } else {
                const err = new URLSearchParams(await res.text()).get('erro') || 'falha';
                location.href = `?erro=${err}`;
            }
        } catch { mostrarErro('Erro de conexão'); }
        finally { btn.disabled = false; btn.innerHTML = 'Enviar Mensagem'; }
    });

    // === WHATSAPP & CHAT ===
    window.abrirWhatsApp = (msg) => window.open(`https://wa.me/5519999981338?text=${encodeURIComponent(msg)}`, '_blank');
    document.getElementById('whatsappBtn').onclick = () => document.getElementById('chatContainer').classList.toggle('hidden');
    window.closeChat = () => document.getElementById('chatContainer').classList.add('hidden');
    window.sendUserMessage = () => {
        const input = document.getElementById('userMessage');
        if (!input.value.trim()) return;
        addMessage(input.value, 'user');
        setTimeout(() => addMessage("Em breve um especialista entrará em contato!", 'bot'), 1000);
        input.value = '';
    };

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = type === 'user' ? 'text-right' : 'text-left';
        div.innerHTML = `<p class="inline-block px-4 py-2 rounded-lg ${type === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-800'}">${text}</p>`;
        document.getElementById('chatMessages').appendChild(div);
        div.scrollIntoView({ behavior: 'smooth' });
    }

    // Init
    carregarCaptcha();
    verificarErroURL();
});