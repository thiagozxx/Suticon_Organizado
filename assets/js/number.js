document.addEventListener("DOMContentLoaded", () => {
    // Configurações globais
    const config = {
      speed: 80, // Duração da animação (menor = mais rápido)
      easingFactor: 0.1, // Fator de suavização (0 a 1)
      threshold: 0.3, // Percentual de visibilidade para disparar
      formatOptions: { // Opções de formatação de números
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        locale: 'pt-BR'
      }
    };
  
    // Definição dos contadores com metadados
    const counters = [
      { id: "sla", target: 98},
      { id: "horas", target: 10000},
      { id: "clientes", target: 700},
    ];
  
    /**
     * Anima um contador até o valor alvo com efeito de easing
     * @param {HTMLElement} element - Elemento DOM do contador
     * @param {number} target - Valor alvo
     * @param {string} [prefix=''] - Prefixo opcional
     * @param {string} [suffix=''] - Sufixo opcional
     */
    const animateCounter = (element, target, prefix = '', suffix = '') => {
      try {
        let current = 0;
        const increment = target / config.speed;
  
        const easeOutQuad = t => t * (2 - t); // Função de easing
  
        const updateCounter = () => {
          const progress = current / target;
          const easedProgress = easeOutQuad(progress);
          current += increment * (1 - easedProgress * config.easingFactor);
  
          if (current < target) {
            element.textContent = `${prefix}${Math.floor(current).toLocaleString(config.formatOptions.locale, config.formatOptions)}${suffix}`;
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = `${prefix}${target.toLocaleString(config.formatOptions.locale, config.formatOptions)}${suffix}`;
          }
        };
  
        updateCounter();
      } catch (error) {
        console.error(`Erro ao animar contador ${element.id}:`, error);
        element.textContent = `${prefix}${target.toLocaleString(config.formatOptions.locale, config.formatOptions)}${suffix}`;
      }
    };
  
    // Configuração do IntersectionObserver
    const section = document.querySelector("section");
    if (!section) {
      console.warn("Seção não encontrada para observação");
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(({ id, target, prefix = '', suffix = '' }) => {
              const element = document.getElementById(id);
              if (element) {
                animateCounter(element, target, prefix, suffix);
              } else {
                console.warn(`Elemento com ID ${id} não encontrado`);
              }
            });
            // Mantém observer ativo para permitir reanimação
            // observer.disconnect(); 
          }
        });
      },
      { 
        threshold: config.threshold,
        rootMargin: '0px' 
      }
    );
  
    observer.observe(section);
  });