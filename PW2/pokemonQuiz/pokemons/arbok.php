<?php

        $nome = $_POST["nome"];
        $opcao = $_POST["opcao"];
        $select = ["select"];
        
        session_start();
        $_SESSION["nome"] = $nome;
        $_SESSION["opcao"] = $opcao;
        $_SESSION["acertos"] = 0;
        $_SESSION["erros"] = 0;
        gettype("select")
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arbok</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="--button-color: #A33EA1; --button-color-hover: #7F307D;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/arbok.png" alt="Arbok">

    <form class="form" method="post" action="../pokemons/diito.php">
         <div class="text secret"><input type="radio" class="radio" name="select" value="certo" required><label>Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Verde</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Azul</label></div>
    
         <input style="background-color: #A33EA1" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>