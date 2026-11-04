
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($a)){
    
            if ($a == "certo") {
                $_SESSION["mew"]=2;
            } else{
                $_SESSION["mew"]=3;
            }
        }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lugia</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="--button-color: #A98FF3; --button-color-hover: #836FBD;" class="backMar">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>*BÔNUS 2*</h1>
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/lugia.png" alt="Lugia">

    <form class="form" method="post" action="../pokemons/rayquaza.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Vermelho e Branco</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Azul e Dourado</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Branco e Preto</label></div>
    
         <input  style="background-color: #A98FF3"  type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>