

<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["blastoise"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["blastoise"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Charizard</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #EE8130; --button-color: #EE8130; --button-color-hover: #B96425;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/charizard.png" alt="Charizard">

    <form class="form" method="post" action="../pokemons/venossaur.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Preto e Vermelho</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required><label>Dourado e Preto</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Azul e Vermelho</label></div>
    
         <input  style="background-color: #EE8130" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>