<?php

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Groudon</title>
    <link rel="icon" href="../../img/pokeIcon.png">
    <link rel="stylesheet" href="../../css/pokemons.css">
</head>
<body style="background-image:url('../../img/vulBack.png');  --button-color: #EE8130; --button-color-hover: #B96425;" id="back">
<div class="box">

<img src="../../img/titulo.png" class="titulo">
<h1>Um lendário apareceu!!!</h1>
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/groudon.png" alt="Groudon">

    <form class="form" method="post" action="../../index.php">
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Verde</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="certo" required><label>Amarelo</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="selectW" value="false" required><label>Roxo</label></div>
    
         <input   style="background-color: #EE8130" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>