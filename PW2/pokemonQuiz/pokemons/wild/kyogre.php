<?php

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kyogre</title>
    <link rel="icon" href="../../img/pokeIcon.png">
    <link rel="stylesheet" href="../../css/pokemons.css">
</head>
<body style="--button-color: #6390F0; --button-color-hover: #4D70BB;" class="backMar">
<div class="box">

<img src="../../img/titulo.png" class="titulo">
<h1>Um lendário apareceu!!!</h1>
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/kyogre.png" alt="Kyogre">

<form class="form" method="post" action="../../index.php">
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Verde</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Amarelo</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="certo" required><label>Rosa</label></div>
    
         <input   style="background-color: #6390F0" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>