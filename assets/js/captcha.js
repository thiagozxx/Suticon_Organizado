
(() => {
    /**
     * Loads CAPTCHA from the server.
     */
    async function loadCaptcha() {
        try {
            const response = await fetch('/php/gerar-captcha.php', { cache: 'no-store' });
            if (!response.ok) throw new Error('Erro ao carregar CAPTCHA');
            const data = await response.json();
            const captchaContainer = document.getElementById('captcha-container');
            const captchaInput = document.getElementById('captcha_resultado');
            if (captchaContainer && captchaInput) {
                captchaContainer.textContent = `Quanto é ${data.num1} + ${data.num2}?`;
                captchaContainer.setAttribute('aria-live', 'polite');
                captchaInput.value = data.resultado;
            }
        } catch (err) {
            console.error('Erro ao carregar CAPTCHA:', err);
            const captchaContainer = document.getElementById('captcha-container');
            if (captchaContainer) {
                captchaContainer.textContent = 'Erro ao carregar CAPTCHA. Tente novamente.';
            }
        }
    }

    /**
     * Displays error messages from URL parameters.
     */
    function displayError() {
        const params = new URLSearchParams(window.location.search);
        const erro = params.get('erro');
        const erroPopup = document.getElementById('erro-popup');
        const erroTexto = document.getElementById('erro-texto');

        if (!erro || !erroPopup || !erroTexto) return;

        const messages = {
            pais: 'País bloqueado para envio de e-mail',
            captcha: 'CAPTCHA incorreto. Tente novamente.',
            email: 'E-mail inválido.',
            bot: 'Acesso negado.',
            tamanho: 'Dados muito longos.',
            falha: 'Erro ao enviar mensagem.',
            default: 'Ocorreu um erro.'
        };

        erroTexto.textContent = messages[erro] || messages.default;
        erroPopup.classList.remove('hidden');
        erroPopup.setAttribute('aria-live', 'assertive');
        setTimeout(() => {
            erroPopup.classList.add('hidden');
        }, 5000);
    }

    /**
     * Formats phone input and validates numeric input.
     */
    function initPhoneInput() {
        const telefone = document.getElementById('telefone');
        const mensagemErro = document.getElementById('mensagem-erro');
        if (!telefone || !mensagemErro) return;

        telefone.addEventListener('input', () => {
            let value = telefone.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            const isValid = /^[0-9]*$/.test(value);
            mensagemErro.classList.toggle('hidden', isValid);

            // Format phone number (e.g., (12) 34567-8901)
            if (value.length <= 2) {
                telefone.value = value;
            } else if (value.length <= 7) {
                telefone.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else {
                telefone.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        });
    }

    /**
     * Main initialization function.
     */
    function init() {
        loadCaptcha();
        displayError();
        initPhoneInput();
    }

    document.addEventListener('DOMContentLoaded', init);
})();