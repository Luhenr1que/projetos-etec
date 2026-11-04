<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();
if (!isset($_SESSION['nome'])) { header('Location: ../../index.php'); exit; }
?>
<?php

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giratina</title>
    <link rel="icon" href="../../img/pokeIcon.png">
    <link rel="stylesheet" href="../../css/pokemons.css">
<link rel="stylesheet" href="../../css/quiz.css?v=2">
</head>
<body style="background-image:url('../../img/vulBack.png');  --button-color: #735797; --button-color-hover: #594375;" id="back">
<div class="box">

<img src="../../img/titulo.png" class="titulo" alt="Pokémon Quiz">
<h1>Um lendário apareceu!!!</h1>
<p class="eyebrow">ENCONTRO ESPECIAL</p><h1>Qual é a cor da versão shiny?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/giratina-altered.png" alt="Giratina">

<form class="form" method="post" action="../../index.php">
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="certo" required id="answer-1"><label for="answer-1">Azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required id="answer-2"><label for="answer-2">Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required id="answer-3"><label for="answer-3">Roxo</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required id="answer-4"><label for="answer-4">Verde</label></div>
    
         <input   style="background-color: #735797;" type="submit" value="Confirmar resposta →" class="botao">
    </form>

</div>
<a class="exit-link" href="../../index.php">← Recomeçar jornada</a><script src="../../js/quiz.js" defer></script></body>
</html>