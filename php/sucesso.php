<?php
// sucesso.php
$voltar = $_GET['voltar'] ?? '/index.html';
$voltar = htmlspecialchars(urldecode($voltar), ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="noindex, nofollow"/>
  <title>Mensagem Enviada com Sucesso | SUTICON</title>
  <meta name="description" content="Sua mensagem foi enviada com sucesso. A equipe SUTICON entrará em contato em breve."/>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          animation: {
            'fade-in': 'fadeIn 0.6s ease-out forwards',
            'bounce-in': 'bounceIn 0.8s ease-out forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            bounceIn: {
              '0%': { opacity: '0', transform: 'scale(0.3)' },
              '50%': { opacity: '1', transform: 'scale(1.05)' },
              '70%': { transform: 'scale(0.9)' },
              '100%': { transform: 'scale(1)' },
            }
          }
        }
      }
    }
  </script>

  <!-- Font Awesome (ícone opcional) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
</head>

<body class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">

  <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center animate-fade-in">

    <!-- Ícone de Sucesso com Animação -->
    <div class="mx-auto w-20 h-20 mb-6 animate-bounce-in">
      <svg class="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Título -->
    <h1 class="text-3xl font-bold text-green-700 mb-3">
      Mensagem Enviada!
    </h1>

    <!-- Mensagem -->
    <p class="text-gray-600 text-lg leading-relaxed mb-8">
      Obrigado por entrar em contato com a <strong class="text-cyan-600">SUTICON</strong>.<br>
      Retornaremos em até <strong>24 horas úteis</strong>.
    </p>

    <!-- Botão Voltar -->
    <a 
      href="<?= $voltar ?>" 
      class="inline-flex items-center gap-2 bg-cyan-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      aria-label="Voltar para a página anterior"
    >
      <i class="fas fa-arrow-left"></i>
      Voltar
    </a>

    <!-- Link secundário (opcional) -->
    <p class="mt-6 text-sm text-gray-500">
      Ou acesse nosso 
      <a href="/index.html" class="text-cyan-600 hover:underline font-medium">site principal</a>.
    </p>

  </div>

</body>
</html>