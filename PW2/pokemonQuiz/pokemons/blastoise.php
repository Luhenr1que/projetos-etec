
<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["ditto"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["ditto"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blastoise</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #6390F0; --button-color: #6390F0; --button-color-hover: #4D70BB;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/blastoise.png" alt="Blastoise">

    <form class="form" method="post" action="../pokemons/charizard.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Roxo e verde</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required><label>Dourado e azul</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Verde e preto</label></div>
    
         <input  style="background-color: #6390F0" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>