<?php
session_start();
$nome = trim((string) ($_POST['nome'] ?? ''));
$opcao = $_POST['opcao'] ?? '';
if ($nome === '' || !in_array($opcao, ['male', 'female'], true)) {
    header('Location: ../index.php');
    exit;
}
$_SESSION = ['nome' => mb_substr($nome, 0, 20), 'opcao' => $opcao,
    'acertos' => 0, 'erros' => 0, 'ramdom' => 0, 'mew' => 1, 'lugia' => 1, 'rayquaza' => 1];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arbok</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
<link rel="stylesheet" href="../css/quiz.css?v=2">
</head>
<body style="--button-color: #A33EA1; --button-color-hover: #7F307D;">
<div class="box">

<img src="../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<p class="eyebrow">PERGUNTA 01 / 10</p><progress value="0" max="10" aria-label="Perguntas concluídas"></progress><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/arbok.png" alt="Arbok">

    <form class="form" method="post" action="../pokemons/diito.php">
         <div class="text secret"><input type="radio" class="radio" name="select" value="certo" required id="answer-1"><label for="answer-1">Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-2"><label for="answer-2">Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-3"><label for="answer-3">Verde</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-4"><label for="answer-4">Azul</label></div>
    
         <input style="background-color: #A33EA1" type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../index.php">← Recomeçar jornada</a><script src="../js/quiz.js" defer></script></body>
</html>