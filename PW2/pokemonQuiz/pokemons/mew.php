<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['nome'])) { header('Location: ../index.php'); exit; }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mew</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
<link rel="stylesheet" href="../css/quiz.css?v=2">
</head>
<body style="--button-color: #F95587; --button-color-hover: #C24269;" id="backLab">
<div class="box">

<img src="../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<h1>*BÔNUS 1*</h1>
<p class="eyebrow">RODADA BÔNUS</p><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/mew.png" alt="Mew">

    <form class="form" method="post" action="../pokemons/lugia.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-1"><label for="answer-1">Branco</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-2"><label for="answer-2">Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required id="answer-3"><label for="answer-3">Azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required id="answer-4"><label for="answer-4">Verde</label></div>
    
         <input   style="background-color: #F95587" type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../index.php">← Recomeçar jornada</a><script src="../js/quiz.js" defer></script></body>
</html>