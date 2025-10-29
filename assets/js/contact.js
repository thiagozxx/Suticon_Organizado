document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const telefoneInput = document.getElementById('telefone');
    const erroMsg = document.getElementById('mensagem-erro');
    const captchaContainer = document.getElementById('captcha-container');
    const captchaResultado = document.getElementById('captcha_resultado');
    const paginaOrigem = document.getElementById('pagina_origem');
    const erroPopup = document.getElementById('erro-popup');
    const erroTexto = document.getElementById('erro-texto');
  
    // Definir página de origem
    paginaOrigem.value = window.location.pathname;
  
    // Máscara de telefone
    $(telefoneInput).mask('(00) 00000-0000');
  
    // Validação em tempo real
    telefoneInput.addEventListener('input', function () {
      const apenasNumeros = this.value.replace(/\D/g, '');
      erroMsg.classList.toggle('hidden', /^[0-9]*$/.test(apenasNumeros));
    });
  
    // Carregar CAPTCHA
    function carregarCaptcha() {
      fetch('/php/gerar-captcha.php')
        .then(response => response.json())
        .then(data => {
          captchaContainer.textContent = `Quanto é ${data.num1} + ${data.num2}?`;
          captchaResultado.value = data.resultado;
        })
        .catch(() => {
          captchaContainer.textContent = 'Erro ao carregar CAPTCHA.';
        });
    }
  
    // Verificar erro na URL
    function verificarErro() {
      const params = new URLSearchParams(window.location.search);
      const erro = params.get('erro');
      if (!erro) return;
  
      const mensagens = {
        pais: 'País bloqueado para envio de e-mail.',
        captcha: 'CAPTCHA incorreto. Tente novamente.',
        email: 'E-mail inválido.',
        bot: 'Acesso negado.',
        tamanho: 'Dados muito longos.',
        falha: 'Erro ao enviar mensagem.'
      };
  
      erroTexto.textContent = mensagens[erro] || 'Ocorreu um erro.';
      erroPopup.classList.remove('hidden', 'translate-y-10');
      setTimeout(() => erroPopup.classList.add('translate-y-10'), 100);
      setTimeout(() => erroPopup.classList.add('hidden'), 5000);
    }
  
    // Inicializar
    carregarCaptcha();
    verificarErro();
  
    // Recarregar CAPTCHA ao enviar (opcional)
    form.addEventListener('submit', function () {
      setTimeout(carregarCaptcha, 1000);
    });
  });