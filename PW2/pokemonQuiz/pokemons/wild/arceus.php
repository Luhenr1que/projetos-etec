<?php

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arceus</title>
    <link rel="icon" href="../../img/pokeIcon.png">
    <link rel="stylesheet" href="../../css/pokemons.css">
</head>
<body style="background-image:url('../../img/backCeu.png');  --button-color: #A8A77A; --button-color-hover: #83825F;">
<div class="box">

<img src="../../img/titulo.png" class="titulo">
<h1>Um lendário apareceu!!!</h1>
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/arceus-normal.png" alt="Arceus">

<form class="form" method="post" action="../../index.php">
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Vermelho</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Azul</label></div>
         <div class="text secret"><input type="radio" class="radio" name="selectW" value="certo" required><label>Dourado</label></div>
    
         <input   style="background-color: #A8A77A" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>