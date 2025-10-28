<?php
session_start();

$pagina_origem = $_POST['pagina_origem'] ?? $_SERVER['HTTP_REFERER'] ?? 'index.html';


if (strpos($pagina_origem, 'http') === 0) {
    $host_permitido = parse_url($pagina_origem, PHP_URL_HOST);
    if ($host_permitido && !in_array($host_permitido, ['suticon.com.br', 'www.suticon.com.br'])) {
        $pagina_origem = 'index.html';
    }
}


if (!empty($_POST['website'])) {
    header("Location: {$pagina_origem}?erro=bot");
    exit();
}


if (!isset($_POST['captcha'], $_POST['captcha_resultado'])) {
    header("Location: {$pagina_origem}?erro=captcha_faltando");
    exit();
}

$resposta_usuario = (int) $_POST['captcha'];
$valor_correto = (int) $_POST['captcha_resultado'];

if ($resposta_usuario !== $valor_correto) {
    header("Location: {$pagina_origem}?erro=captcha");
    exit();
}


$nome     = htmlspecialchars(trim($_POST['nome']), ENT_QUOTES, 'UTF-8');
$empresa  = htmlspecialchars(trim($_POST['company']), ENT_QUOTES, 'UTF-8');
$telefone = htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8');
$email    = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$mensagem = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: {$pagina_origem}?erro=email");
    exit();
}
if (preg_match("/[\r\n]/", $email)) {
    header("Location: {$pagina_origem}?erro=injection");
    exit();
}
if (strlen($nome) > 100 || strlen($email) > 100 || strlen($mensagem) > 1000) {
    header("Location: {$pagina_origem}?erro=tamanho");
    exit();
}


$ip = $_SERVER['REMOTE_ADDR'];
$detalhes_local = "Localização não disponível.";
$geo = @file_get_contents("http://ip-api.com/json/{$ip}?fields=status,country,regionName,city,query");

if ($geo) {
    $info = json_decode($geo, true);
    if ($info['status'] === 'success') {
        $pais_remetente = $info['country'];
        $detalhes_local = "IP: {$info['query']}<br>País: {$info['country']}<br>Estado: {$info['regionName']}<br>Cidade: {$info['city']}";
        $paises_bloqueados = ['Russia', 'India', 'China', 'Turkey', 'Iran', 'Pakistan'];
        if (in_array($pais_remetente, $paises_bloqueados)) {
            header("Location: {$pagina_origem}?erro=pais_bloqueado");
            exit();
        }
    }
}

// E-mail
$destino = "contato@suticon.com.br";
$assunto = "Formulário enviado do site";

$corpo = <<<EOD
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; }
    .email-container { max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ccc; }
    .header { background-color: #004b8d; color: white; padding: 15px; font-size: 20px; text-align: center; border-radius: 6px 6px 0 0; }
    .content { padding: 20px; color: #333; }
    .footer { font-size: 12px; color: #777; text-align: center; padding-top: 20px; }
    p { margin: 10px 0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">SUTICON - Formulário de Contato</div>
    <div class="content">
      <p><strong>Nome:</strong> {$nome}</p>
      <p><strong>Empresa:</strong> {$empresa}</p>
      <p><strong>Telefone:</strong> {$telefone}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>{$mensagem}</p>
    </div>
    <div class="footer">
      <p><strong>Localização aproximada do visitante:</strong></p>
      <p>{$detalhes_local}</p>
    </div>
  </div>
</body>
</html>
EOD;

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$email}\r\n";
$headers .= "Reply-To: {$email}\r\n";

// Envia e redireciona
if (mail($destino, $assunto, $corpo, $headers)) {
    header("Location: sucesso.php?voltar=" . urlencode($pagina_origem));
    exit();
} else {
    header("Location: {$pagina_origem}?erro=falha");
    exit();
}
?>
