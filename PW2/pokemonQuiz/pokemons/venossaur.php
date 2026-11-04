

<?php
    $a = $_POST["select"];

    session_start();
    $_SESSION["select"] = $a;
    if(isset($_POST["select"])){
    
            if ($_SESSION["select"] == "certo") {
                $_SESSION["acertos"] += 1;
                $_SESSION["charizard"]=true;
            } else{
                $_SESSION["erros"] += 1; 
                $_SESSION["charizard"]=false;
            }
        }
    gettype("select")
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Venusaur</title>
    <link rel="icon" href="../img/pokeIcon.png">
    <link rel="stylesheet" href="../css/pokemons.css">
</head>
<body style="background-color: #7AC74C; --button-color: #7AC74C; --button-color-hover: #5F9B3B;">
<div class="box">

<img src="../img/titulo.png" class="titulo">
<h1>Como é a versão shine?</h1>
<img class="imgPokemon" src="https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png" alt="Venusaur">

    <form class="form" method="post" action="../pokemons/gengar.php">
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Branco e Rosa</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="false" required><label>Vermelho</label></div>
         <div class="text secret"><input type="radio" class="radio" name="select" value="false" required><label>Dourado e Roxo</label></div>
         <div class="text colorido"><input type="radio" class="radio" name="select" value="certo" required><label>Verde e Amarelo</label></div>
    
         <input   style="background-color: #7AC74C" type="submit" value="Proximo" class="botao">
    </form>

</div>
</body>
</html>