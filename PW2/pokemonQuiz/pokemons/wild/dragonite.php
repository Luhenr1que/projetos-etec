<?php

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragonite</title>
    ]    <link rel="icon" href="../../img/pokeIcon.png">
    <link rel="stylesheet" href="../../css/pokemons.css">
</head>
<body style="background-image:url('../../img/backCeu.png');  --button-color: #6F35FC; --button-color-hover: #5629C4;">
<div class="box">

<img src="../../img/titulo.png" class="titulo">
<h1>Um lendário apareceu!!!</h1>
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/dragonite.png" alt="Dragonite">

<form class="form" method="post" action="../../index.php">
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Roxo</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="cero" required><label>Verde</label></div>
    
         <input   style="background-color: #6F35FC;" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>