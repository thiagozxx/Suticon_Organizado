<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

$num1 = rand(1, 10);
$num2 = rand(1, 10);

$_SESSION['captcha_result'] = $num1 + $num2;

echo json_encode([
    'num1' => $num1,
    'num2' => $num2,
]);
?>
